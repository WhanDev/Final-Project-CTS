import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Grid,
  Stack,
  TableContainer,
  IconButton,
} from '@mui/material';
import { IconCircleCheck } from '@tabler/icons';

import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../../components/shared/ParentCard';

import { TransferRead } from '../../../../function/transfer';
import { read as readStudent } from '../../../../function/student';
import { read as readCurriculum } from '../../../../function/curriculum';

const OrderTransfer = () => {
  const params = useParams();

  const [transfer, setTransfer] = useState([]);

  const loadTransferRead = async (id) => {
    TransferRead(id)
      .then((res) => setTransfer(res.data))
      .catch((err) => console.log(err));
  };

  const [student, setStudent] = useState({
    _id: '',
    fullname: '',
    year: '',
    institution: '',
    branch: '',
    status: '',
  });

  const loadReadStudent = async (id) => {
    readStudent(id)
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  };

  const curriculum_id = student.curriculum;
  const [dataCurriculum, setDataCurriculum] = useState({
    name: '',
    level: '',
    time: '',
    year: '',
  });

  const loadReadCurriculum = async (id) => {
    readCurriculum(id)
      .then((res) => setDataCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      loadTransferRead(params._id);
      loadReadStudent(params._id);
      loadReadCurriculum(curriculum_id);
    },
    [params._id],
    [params._id],
    // [curriculum_id],
  );

//   const curriculum =
//     dataCurriculum.name +
//     '(' +
//     dataCurriculum.level +
//     ' ' +
//     dataCurriculum.time +
//     'ปี) พ.ศ ' +
//     dataCurriculum.year;

//   console.log(curriculum_id);

  return (
    <PageContainer title="ข้อมูลเทียบโอนเบื้องต้น" description="ข้อมูลเทียบโอนเบื้องต้น">
      <Breadcrumb title="ข้อมูลเทียบโอนเบื้องต้น" />
      <ParentCard title="ข้อมูลนักศึกษา">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
            <CustomTextField value={student._id || ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
            <CustomTextField value={student.fullname || ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>หลักสูตร</CustomFormLabel>
            <CustomTextField value={student.curriculum|| ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รุ่นปี</CustomFormLabel>
            <CustomTextField value={student.year|| ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
            <CustomTextField value={student.institution|| ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
            <CustomTextField value={student.branch || ''} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>การเทียบโอน</CustomFormLabel>
            <CustomTextField value={student.status || ''} fullWidth />
          </Grid>
        </Grid>
      </ParentCard>
      <Box marginY={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">รายวิชาที่สามารถเทียบโอนได้</Typography>
            <IconButton>
              <IconCircleCheck width={20} color={'green'} />
            </IconButton>
          </Stack>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={'50%'}>
                      <Typography variant="h5">รายวิชาในหลักสูตร</Typography>
                    </TableCell>
                    <TableCell align="center" width={'50%'}>
                      <Typography variant="h5">รายวิชาที่นำมาเทียบ</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  <TableRow>
                    <TableCell align="center" width={'50%'} colSpan={1}>
                      <TableCell align="center" width={'30%'}>
                        <Typography fontWeight={500}>รหัสวิชา</Typography>
                      </TableCell>
                      <TableCell width={'60%'}>
                        <Typography fontWeight={500}>ชื่อวิชา</Typography>
                      </TableCell>
                      <TableCell align="center" width={'10%'}>
                        <Typography fontWeight={500}>หน่วยกิต</Typography>
                      </TableCell>
                    </TableCell>
                    <TableCell align="center" width={'50%'} colSpan={1}>
                      <TableCell align="center" width={'30%'}>
                        <Typography fontWeight={500}>รหัสวิชา</Typography>
                      </TableCell>
                      <TableCell width={'60%'}>
                        <Typography fontWeight={500}>ชื่อวิชา</Typography>
                      </TableCell>
                      <TableCell align="center" width={'10%'}>
                        <Typography fontWeight={500}>หน่วยกิต</Typography>
                      </TableCell>
                    </TableCell>
                  </TableRow>
                  {success.length > 0 ? (
                    success.map((item, index) => {
                      const subject = allSubject.find(
                        (option) => option.subject_id === item.subject_id,
                      );
                      if (subject) {
                        return (
                          <TableRow key={item.id} hover>
                            <TableCell align="center" width="50%" colSpan={1}>
                              <TableCell align="center" width="30%">
                                <Typography>{subject.subject_id}</Typography>
                              </TableCell>
                              <TableCell width="60%">
                                <Typography>
                                  {subject.subject_nameTh}
                                  <Typography color={'green'}>
                                    ({subject.subject_nameEn})
                                  </Typography>
                                </Typography>
                              </TableCell>
                              <TableCell align="center" width="10%">
                                <Typography>{subject.total_credits}</Typography>
                              </TableCell>
                            </TableCell>
                            <TableCell align="center" width="50%" colSpan={1}>
                              {item.extra_id.map((extra_id) => {
                                const extra = allExtra.find(
                                  (option) => option.extraSubject_id === extra_id,
                                );
                                if (extra) {
                                  return (
                                    <TableRow key={extra_id}>
                                      <TableCell align="center" width="30%">
                                        <Typography>{extra.extraSubject_id}</Typography>
                                      </TableCell>
                                      <TableCell width="60%">
                                        <Typography>
                                          {extra.extraSubject_nameTh}
                                          <Typography color={'green'}>
                                            ({extra.extraSubject_nameEn})
                                          </Typography>
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center" width="10%">
                                        <Typography>{extra.total_credits}</Typography>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography align="center">ไม่มีรายวิชาที่สามารถเทียบโอนได้</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody> */}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
            <Stack spacing={1} direction="row">
              <Typography variant="h6" fontWeight={400} color="green">
                จำนวนหน่วยกิตที่เทียบโอนได้ หน่วยกิต
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default OrderTransfer;
