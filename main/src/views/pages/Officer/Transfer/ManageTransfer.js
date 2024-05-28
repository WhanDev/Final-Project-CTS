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
import { list as AllCurriculum } from '../../../../function/curriculum';

const ManageTransfer = () => {
  const [allStudent, setAllStudent] = useState([]);
  const [allYear, setAllYear] = useState([]);
  const [allCurriculum, setAllCurriculum] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

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

  const loadAllCurriculum = async () => {
    try {
      const res = await AllCurriculum();
      setAllCurriculum(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAllStudent();
    loadAllCurriculum();
  }, []);

  const handleCurriculumChange = (event, value) => {
    setSelectedCurriculum(value);
    setSelectedYear(null); // Reset year when curriculum changes
    setSelectedStatus(null); // Reset status when curriculum changes
  };

  const handleYearChange = (event, value) => {
    setSelectedYear(value);
    setSelectedStatus(null); // Reset status when year changes
  };

  const handleStatusChange = (event, value) => {
    setSelectedStatus(value);
  };

  const Status = [
    { label: 'รอการยืนยันการเทียบโอนเบื้องต้น', value: 'รอการยืนยันการเทียบโอนเบื้องต้น' },
    { label: 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร', value: 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร' },
  ];

  const filteredTransfer = allStudent.filter(item => 
    item.curriculum === selectedCurriculum?.value &&
    item.year === selectedYear?.value &&
    item.status === selectedStatus?.value
  );


  return (
    <PageContainer title="จัดการข้อมูลเทียบโอน" description="จัดการข้อมูลเทียบโอน">
      <Breadcrumb title="จัดการข้อมูลเทียบโอน" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <ParentCard title="หลักสูตร">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Autocomplete
                fullWidth
                id="curriculum_id"
                name="curriculum_id"
                disableClearable
                options={allCurriculum.map((option) => ({
                  label: `หลักสูตร ${option.name} ปี พ.ศ ${option.year} (${option.level} ${option.time} ปี)`,
                  value: option._id,
                }))}
                renderInput={(params) => (
                  <TextField {...params} placeholder="เลือกหลักสูตร" variant="outlined" fullWidth />
                )}
                onChange={handleCurriculumChange}
                value={selectedCurriculum}
                sx={{ mr: 1 }}
              />
            </Stack>
          </ParentCard>
        </Grid>
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
        <Grid item xs={12} sm={12} lg={12}>
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
                disabled={!selectedYear} // Disable if no year selected
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
                          {selectedStatus.value === 'รอการยืนยันการเทียบโอนเบื้องต้น' && (
                            <IconButton component={Link} to={`/officer/manage/transfer/check/${item._id}`} color="warning">
                              <IconFileDescription size="18" />
                            </IconButton>
                          )}
                          {selectedStatus.value === 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร' && (
                            <IconButton component={Link} to={`/officer/manage/transfer/approve/${item._id}`} color="primary">
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
