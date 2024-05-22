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

import { TransferListAdmin } from '../../../../function/transfer';
import { list as AllStudent } from '../../../../function/student';
import { list as AllCurriculum } from '../../../../function/curriculum';

const ManageTransfer = () => {
  const [transfer, setTransfer] = useState([]);

  const loadAllTransfer = async () => {
    TransferListAdmin()
      .then((res) => setTransfer(res.data))
      .catch((err) => console.log(err));
  };

  const [allStudent, setAllStudent] = useState([]);

  const loadAllStudent = async () => {
    AllStudent()
      .then((res) => setAllStudent(res.data))
      .catch((err) => console.log(err));
  };

  const [allCurriculum, setAllCurriculum] = useState([]);

  const loadAllCurriculum = async () => {
    AllCurriculum()
      .then((res) => setAllCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const handleCurriculumChange = (event, value) => {
    setSelectedCurriculum(value);
  };

  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleStatus = (event, value) => {
    setSelectedStatus(value.value);
  };

  useEffect(() => {
    loadAllTransfer();
    loadAllStudent();
    loadAllCurriculum();
  }, []);

  const Status = [
    { label: 'รอการอนุมัติเทียบโอนผลการเรียน', value: 'รอการอนุมัติเทียบโอนผลการเรียน' },
    {
      label: 'รอการอนุมัติ โดยอาจารย์ประจำหลักสูตร',
      value: 'รอการอนุมัติ โดยอาจารย์ประจำหลักสูตร',
    },
    { label: 'อนุมัติการเทียบโอนเสร็จสิ้น', value: 'อนุมัติการเทียบโอนเสร็จสิ้น' },
  ];

  return (
    <PageContainer title="จัดการข้อมูลเทียบโอน" description="จัดการข้อมูลเทียบโอน">
      <Breadcrumb title="จัดการข้อมูลเทียบโอน" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <ParentCard title="เลือกหลักสูตร">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Autocomplete
                fullWidth
                id="subject_id"
                name="subject_id"
                disableClearable
                options={allCurriculum.map((option) => ({
                  label:
                    'หลักสูตร ' +
                    option.name +
                    ' ปี พ.ศ ' +
                    option.year +
                    ' (' +
                    option.level +
                    ' ' +
                    option.time +
                    ' ปี)',
                  value: option._id,
                }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="กรอกรหัสหลักสูตร/ชื่อหลักสูตร"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={handleCurriculumChange}
                value={selectedCurriculum}
                sx={{ mr: 1 }}
              />
            </Stack>
          </ParentCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ParentCard title="เลือกสถานะเทียบโอน">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Autocomplete
                fullWidth
                id="subject_id"
                name="subject_id"
                disableClearable
                options={Status.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="กรอกสถานะเทียบโอน"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={handleStatus}
                value={Status.find(status => status.value === selectedStatus) || null}
                sx={{ mr: 1 }}
              />
            </Stack>
          </ParentCard>
        </Grid>
      </Grid>

      <Box m={3} />
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
                  {selectedCurriculum && selectedStatus ? (
                    transfer.length > 0 ? (
                      transfer.map((item, index) => (
                        <TableRow key={index} hover>
                          {item.result === selectedStatus &&
                            allStudent
                              .filter(
                                (student) =>
                                  student._id === item._id &&
                                  student.curriculum === selectedCurriculum.value
                              )
                              .map((student) => (
                                <React.Fragment key={student._id}>
                                  <TableCell align="center">{student._id}</TableCell>
                                  <TableCell align="center">{student.fullname}</TableCell>
                                  <TableCell align="center">{student.institution}</TableCell>
                                  <TableCell align="center">{student.branch}</TableCell>
                                  <TableCell align="center">
                                    {selectedStatus === 'รอการอนุมัติเทียบโอนผลการเรียน' ? (
                                      <IconButton
                                        component={Link}
                                        to={`/admin/manage/transfer/${item._id}`}
                                        color="warning"
                                      >
                                        <IconFileDescription size="18" />
                                      </IconButton>
                                    ) : selectedStatus ===
                                      'รอการอนุมัติ โดยอาจารย์ประจำหลักสูตร' ? (
                                      <IconButton
                                        component={Link}
                                        to={`/admin/manage/transfer/approve/${item._id}`}
                                        color="primary"
                                      >
                                        <IconFileDescription size="18" />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        component={Link}
                                        to={`/admin/manage/transfer/confirm/${item._id}`}
                                        color="success"
                                      >
                                        <IconFileDescription size="18" />
                                      </IconButton>
                                    )}
                                  </TableCell>
                                </React.Fragment>
                              ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={5}>
                          <Typography>ไม่มีข้อมูลนักศึกษาที่ทำการเทียบโอน</Typography>
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Typography>
                          {selectedCurriculum
                            ? 'กรุณาเลือกสถานะเทียบโอน'
                            : selectedStatus
                            ? 'กรุณาเลือกหลักสูตร'
                            : 'กรุณาเลือกหลักสูตรและสถานะเทียบโอน'}
                        </Typography>
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
