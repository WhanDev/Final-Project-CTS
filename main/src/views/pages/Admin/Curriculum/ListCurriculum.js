import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  TableContainer,
} from '@mui/material';
import { IconTrash, IconEdit, IconListSearch } from '@tabler/icons';
import { list as listCurriculum, remove as removeCurriculum } from '../../../../function/curriculum';
import Swal from 'sweetalert2';

const ListCurriculum = () => {
  const [curriculum, setCurriculum] = useState([]);

  const loadDataCurriculum = async () => {
    listCurriculum()
      .then((res) => setCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataCurriculum();
  }, []);

  const handleRemove = async (_id) => {
    Swal.fire({
      title: 'ต้องการลบข้อมูลนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        removeCurriculum(_id)
          .then((res) => {
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            console.log(res);
            loadDataCurriculum();
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'ลบข้อมูลไม่สำเร็จ',
              text: error.response.data.message,
            });
          });
      }
    });
  };

  return (
    <Box mt={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>
                <Typography variant="h5" align='center'>รหัสหลักสูตร</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align='left'>ชื่อหลักสูตร</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align='center'>ระดับการศึกษา</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align='center'>หลักสูตรปี พ.ศ</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align='center'>ระยะเวลาการศึกษา</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" align='center'>จัดการข้อมูล</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curriculum.length > 0 ? (
              curriculum.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell align='center'>{item._id}</TableCell>
                  <TableCell align='left'>{item.name}</TableCell>
                  <TableCell align='center'>{item.level}</TableCell>
                  <TableCell align='center'>{item.year}</TableCell>
                  <TableCell align='center'>{item.time} ปี</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={'/admin/manage/curriculum/' + item._id + '/structure/CS-' + item._id}
                      color="info"
                    >
                      <IconListSearch size="18" />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={'/admin/manage/curriculum/' + item._id + '/structure/edit/CS-' + item._id}
                      color="warning"
                    >
                      <IconEdit size="18" />
                    </IconButton>
                    <IconButton onClick={() => handleRemove(item._id)} color="error">
                      <IconTrash size="18" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box>
                    <Typography align="center">ไม่มีข้อมูลหลักสูตร</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCurriculum;
