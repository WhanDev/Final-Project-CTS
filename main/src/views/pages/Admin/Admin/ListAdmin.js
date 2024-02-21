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
import Swal from 'sweetalert2';
import { IconTrash, IconEdit } from '@tabler/icons';
import { list as listAdmin, remove as removeAdmin } from '../../../../function/admin';
import { read as readCurriculum } from '../../../../function/curriculum';
import { useSelector } from 'react-redux';

const ListAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [admin, setDataAdmin] = useState([]);

  const loadDataAdmin = async () => {
    listAdmin()
      .then((res) => setDataAdmin(res.data))
      .catch((err) => console.log(err));
  };

  const [curriculum, setDataCurriculum] = useState({});

  const loadDataCurriculum = async (_id) => {
    try {
      const res = await readCurriculum(_id);
      setDataCurriculum((prevData) => ({
        ...prevData,
        [_id]: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDataAdmin();
    admin.forEach((item) => {
      loadDataCurriculum(item.curriculum);
    });
  }, [admin]);

  const handleRemove = async (_id) => {
    Swal.fire({
      title: 'ต้องการลบข้อมูลผู้ใช้นี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
        removeAdmin(_id).then((res) => {
          console.log(res);
          loadDataAdmin();
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
              <TableCell align="center">
                <Typography variant="h6">รหัสประจำตัว</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">ชื่อ-นามสกุล</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">สิทธิ์ผู้ดูแล</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">หลักสูตร</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">จัดการข้อมูล</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin.length > 0 ? (
              admin.map(
                (item, index) =>
                  user.user._id !== item._id && (
                    <TableRow key={index} hover>
                      <TableCell align="center">{item._id}</TableCell>
                      <TableCell align="center">{item.fullname}</TableCell>
                      <TableCell align="center">{item.role}</TableCell>
                      <TableCell align="center">
                        {curriculum[item.curriculum]?.name || 'Loading...'}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          component={Link}
                          to={'/manage/admin/' + item._id}
                          color="warning"
                        >
                          <IconEdit size="18" />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(item._id)} color="error">
                          <IconTrash size="18" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ),
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box>
                    <Typography align="center">ไม่มีข้อมูลผู้ใช้ระบบ</Typography>
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

export default ListAdmin;
