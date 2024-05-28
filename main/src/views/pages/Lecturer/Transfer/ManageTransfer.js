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
  Grid,
  TextField,
  Autocomplete,
  Stack,
} from '@mui/material';
import { IconFileDescription } from '@tabler/icons';

import PageContainer from '../../../../components/container/PageContainer';
import ParentCard from '../../../../components/shared/ParentCard';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import { list as AllStudent } from '../../../../function/student';
import { currentUser } from '../../../../function/auth';

const ManageTransfer = () => {
  const [allStudent, setAllStudent] = useState([]);
  const [allYear, setAllYear] = useState([]);

  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const token = localStorage.getItem('token');

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setSelectedCurriculum(res.data.curriculum);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAllStudent = async () => {
    try {
      const res = await AllStudent();
      setAllStudent(res.data);

      const years = Array.from(new Set(res.data.map(student => student.year)));
      setAllYear(years.map(year => ({ label: year, value: year })));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAllStudent();
    checkUser()
  }, []);

  const handleYearChange = (event, value) => {
    setSelectedYear(value);
    setSelectedStatus(null); // Reset status when year changes
  };

  const handleStatusChange = (event, value) => {
    setSelectedStatus(value);
  };

  const Status = [
    { label: 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร', value: 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร' },
    { label: 'ยืนยันการเทียบโอนถูกต้อง', value: 'ยืนยันการเทียบโอนถูกต้อง' },
  ];

  const filteredTransfer = allStudent.filter(item => 
    item.curriculum === selectedCurriculum &&
    item.year === selectedYear?.value &&
    item.status === selectedStatus?.value
  );


  return (
    <PageContainer title="จัดการข้อมูลเทียบโอน" description="จัดการข้อมูลเทียบโอน">
      <Breadcrumb title="จัดการข้อมูลเทียบโอน" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <ParentCard title="รุ่นปี">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Autocomplete
                fullWidth
                id="year_id"
                name="year_id"
                disableClearable
                options={allYear}
                renderInput={(params) => (
                  <TextField {...params} placeholder="เลือกรุ่นปี" variant="outlined" fullWidth />
                )}
                onChange={handleYearChange}
                value={selectedYear}
                sx={{ mr: 1 }}
                disabled={!selectedCurriculum} // Disable if no curriculum selected
              />
            </Stack>
          </ParentCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ParentCard title="สถานะเทียบโอน">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Autocomplete
                fullWidth
                id="status_id"
                name="status_id"
                disableClearable
                options={Status}
                renderInput={(params) => (
                  <TextField {...params} placeholder="เลือกสถานะเทียบโอน" variant="outlined" fullWidth />
                )}
                onChange={handleStatusChange}
                value={selectedStatus}
                sx={{ mr: 1 }}
                disabled={!selectedYear}
              />
            </Stack>
          </ParentCard>
        </Grid>
      </Grid>

      <Box mt={3}/>

      <ParentCard title="ข้อมูลนักศึกษาที่ทำการเทียบโอนเบื้องต้นแล้ว">
        <ChildCard>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6">รหัสนักศึกษา</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">ชื่อนักศึกษา</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">สถาบันเดิม</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">สาขาวิชา</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">เพิ่มเติม</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransfer.length > 0 ? (
                    filteredTransfer.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell align="center">{item._id}</TableCell>
                        <TableCell align="center">{item.fullname}</TableCell>
                        <TableCell align="center">{item.institution}</TableCell>
                        <TableCell align="center">{item.branch}</TableCell>
                        <TableCell align="center">
                          {selectedStatus.value === 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร' && (
                            <IconButton component={Link} to={`/lecturer/manage/transfer/approve/${item._id}`} color="primary">
                              <IconFileDescription size="18" />
                            </IconButton>
                          )}
                          {selectedStatus.value === 'ยืนยันการเทียบโอนถูกต้อง' && (
                            <IconButton component={Link} to={`/lecturer/manage/transfer/confirm/${item._id}`} color="success">
                              <IconFileDescription size="18" />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Typography>ไม่มีข้อมูลนักศึกษาที่ทำการเทียบโอน</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </ChildCard>
      </ParentCard>
    </PageContainer>
  );
};

export default ManageTransfer;
