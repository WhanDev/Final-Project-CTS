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
import { currentUser } from '../../../../function/auth';

const ListAdmin = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);
  const [admin, setDataAdmin] = useState([]);
  const [curriculum, setDataCurriculum] = useState({});

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDataAdmin = async () => {
    try {
      const res = await listAdmin();
      setDataAdmin(res.data);

      // Load curriculum data for each admin
      res.data.forEach(async (item) => {
        try {
          const curriculumRes = await readCurriculum(item.curriculum);
          setDataCurriculum((prevData) => ({
            ...prevData,
            [item.curriculum]: curriculumRes.data,
          }));
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        removeAdmin(_id)
          .then((res) => {
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            loadDataAdmin();
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

  useEffect(() => {
    loadDataAdmin();
    CheckUser();
  }, []);

  return (
    <Box mt={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">รหัสประจำตัว</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ชื่อ-นามสกุล</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">สิทธิ์ผู้ดูแล</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">หลักสูตร</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">จัดการข้อมูล</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin.length > 1 || (admin.length === 1 && user._id !== admin[0]._id) ? (
              admin.map(
                (item, index) =>
                  user._id !== item._id && (
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
                          to={'/admin/manage/user/' + item._id}
                          color="warning"
                        >
                          <IconEdit size="25" />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(item._id)} color="error">
                          <IconTrash size="25" />
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
