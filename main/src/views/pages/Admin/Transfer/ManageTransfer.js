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

  const [selectedCurriculum, setSelectedCurriculum] = useState([]);
  const handleCurriculumChange = (event, value) => {
    setSelectedCurriculum(value);
  };

  useEffect(() => {
    loadAllTransfer();
    loadAllStudent();
    loadAllCurriculum();
  }, []);

  console.log('selectedCurriculum', selectedCurriculum.value);

  return (
    <PageContainer title="จัดการข้อมูลเทียบโอน" description="จัดการข้อมูลเทียบโอน">
      <Breadcrumb title="จัดการข้อมูลเทียบโอน" />
      <ParentCard title="เลือกหลักสูตร">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={12}>
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
          </Grid>
        </Grid>
      </ParentCard>
      <Box m={3} />
      <ParentCard title="ข้อมูลนักศึกษาที่ทำการเทียบโอนเบื้องต้น">
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
                  {selectedCurriculum.value !== undefined &&
                    selectedCurriculum.value !== null &&
                    (transfer.length > 0 ? (
                      transfer.map((item, index) => (
                        <TableRow key={index} hover>
                          {item.result === 'รอการอนุมัติเทียบโอนผลการเรียน' && ( // เพิ่มเงื่อนไขตรวจสอบ transfer.result
                            <React.Fragment>
                              {allStudent.filter(
                                (student) =>
                                  student._id === item._id &&
                                  student.curriculum === selectedCurriculum.value,
                              ).length > 0 ? (
                                allStudent.map((student) =>
                                  student._id === item._id &&
                                  student.curriculum === selectedCurriculum.value ? (
                                    <React.Fragment key={student._id}>
                                      <TableCell align="center">{student._id}</TableCell>
                                      <TableCell align="center">{student.fullname}</TableCell>
                                      <TableCell align="center">{student.institution}</TableCell>
                                      <TableCell align="center">{student.branch}</TableCell>
                                      <TableCell align="center">
                                        <IconButton
                                          component={Link}
                                          to={`/admin/manage/transfer/${item._id}`}
                                          color="warning"
                                        >
                                          <IconFileDescription size="18" />
                                        </IconButton>
                                      </TableCell>
                                    </React.Fragment>
                                  ) : null,
                                )
                              ) : (
                                <TableCell align="center" colSpan={5}>
                                  <Typography>
                                    ไม่มีข้อมูลนักศึกษาที่ทำการเทียบโอนในหลักสูตรนี้
                                  </Typography>
                                </TableCell>
                              )}
                            </React.Fragment>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableCell align="center" colSpan={5}>
                        <Typography>ไม่มีข้อมูลนักศึกษาที่ทำการเทียบโอน</Typography>
                      </TableCell>
                    ))}

                  {selectedCurriculum.value === undefined && (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Typography>กรุณาเลือกหลักสูตร</Typography>
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
