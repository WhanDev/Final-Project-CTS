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
  TextField,
  Stack,
} from '@mui/material';
import { IconEditCircle, IconCircleMinus } from '@tabler/icons';
import {
  list as listExtraSubject,
  remove as removeExtraSubject,
} from '../../../../function/extar-subject';
import DialogExtraSubject from './DialogExtraSubject';
import Swal from 'sweetalert2';

const ListExtraSubject = () => {
  const [extraSubjects, setExtraSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDataExtraSubjects();
  }, []);

  const loadDataExtraSubjects = async () => {
    try {
      const response = await listExtraSubject();
      setExtraSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (_id) => {
    try {
      const result = await Swal.fire({
        title: 'ต้องการลบข้อมูลนี้ใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      });

      if (result.isConfirmed) {
        await removeExtraSubject(_id);
        Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
        loadDataExtraSubjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExtraSubjects = extraSubjects.filter(
    (item) =>
      item.extraSubject_id.includes(searchTerm) ||
      item.extraSubject_nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.extraSubject_nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box mt={3}>
      <Stack
        spacing={1}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" width={'10%'} align="center">
          ค้นหารายวิชา
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          onChange={handleSearch}
          value={searchTerm}
          placeholder="กรอกรหัสวิชา/ชื่อวิชา"
        />
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={'15%'} align="center">
                <Typography variant="h6">รหัสวิชา</Typography>
              </TableCell>
              <TableCell width={'30%'} align="left">
                <Typography variant="h6">ชื่อวิชา</Typography>
              </TableCell>
              <TableCell width={'5%'} align="center">
                <Typography variant="h6">ทฤษฎี</Typography>
              </TableCell>
              <TableCell width={'5%'} align="center">
                <Typography variant="h6">ปฏิบัติ</Typography>
              </TableCell>
              <TableCell width={'10%'} align="center">
                <Typography variant="h6">หน่วยกิตรวม</Typography>
              </TableCell>
              <TableCell width={'15%'} align="center">
                <Typography variant="h6">จัดการข้อมูล</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExtraSubjects.length > 0 ? (
              filteredExtraSubjects.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell width={'15%'} align="center">
                    {item.extraSubject_id}
                  </TableCell>
                  <TableCell width={'30%'} align="left">
                    {item.extraSubject_nameTh}
                    <br />
                    <Typography color="primary">({item.extraSubject_nameEn})</Typography>
                  </TableCell>
                  <TableCell width={'5%'} align="center">
                    {item.theory_credits}
                  </TableCell>
                  <TableCell width={'5%'} align="center">
                    {item.practical_credits}
                  </TableCell>
                  <TableCell width={'10%'} align="center">
                    {item.total_credits}
                  </TableCell>
                  <TableCell width={'15%'} align="center">
                    <DialogExtraSubject _id={item._id} />
                    <IconButton
                      component={Link}
                      to={`/admin/manage/extrasubject/edit/${item._id}`}
                      color="warning"
                    >
                      <IconEditCircle size="18" />
                    </IconButton>
                    <IconButton onClick={() => handleRemove(item._id)} color="error">
                      <IconCircleMinus size="18" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box>
                    <Typography align="center">ไม่มีข้อมูลรายวิชานอกหลักสูตร</Typography>
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

export default ListExtraSubject;
