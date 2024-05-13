import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Button,
} from '@mui/material';
import { IconCircleCheck, IconAlertCircle, IconFile, IconSearch } from '@tabler/icons';

import PageContainer from '../../../../components/container/PageContainer';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../../components/shared/ParentCard';

import { TransferRead } from '../../../../function/transfer';
import { read as readStudent } from '../../../../function/student';
import { list as ListCurriculum } from '../../../../function/curriculum';
import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';

const OrderTransfer = () => {
  const params = useParams();

  const [transferList, setTransferList] = useState([]);
  const [transferOrder, setTransferOrder] = useState([]);

  const loadTransferRead = async (id) => {
    TransferRead(id)
      .then((res) => {
        setTransferList(res.data.transferList);
        setTransferOrder(res.data.readTransferOrder);
      })
      .catch((err) => console.log(err));
  };

  const [student, setStudent] = useState({});
  const structure_id = 'CS-' + student.curriculum;

  const loadReadStudent = async (id) => {
    readStudent(id)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [allCurriculum, setAllCurriculum] = useState([]);

  const loadListCurriculum = async () => {
    ListCurriculum()
      .then((res) => setAllCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  const [allSubject, setAllSubject] = useState([]);

  const loadAllSubject = async (id) => {
    AllSubject(id)
      .then((res) => setAllSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [allExtraSubject, setAllExtraSubject] = useState([]);

  const loadAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setAllExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [total_credits, setTotalCredits] = React.useState(0);

  useEffect(() => {
    let totalCredits = 0;

    if (Array.isArray(transferList)) {
      transferList.forEach((list) => {
        list.success.forEach((successItem) => {
          const subject = allSubject.find(
            (subjectItem) => subjectItem.subject_id === successItem.subject_id,
          );
          if (subject) {
            totalCredits += subject.total_credits;
          }
        });
      });
    }

    setTotalCredits(totalCredits);
  }, [transferList, allSubject]);

  useEffect(
    () => {
      loadTransferRead(params._id);
      loadReadStudent(params._id);
      loadListCurriculum();
      loadAllExtraSubject();
    },
    [params._id],
  );

  useEffect(
    () => {
      if (student.curriculum) {
        loadAllSubject(structure_id);
      }
    },
    [student.curriculum],
  );



  const pdfURL = 'http://localhost:5000/api/pdf/'+transferOrder.file; // URL ของไฟล์ PDF

  const handleViewPDF = () => {
    window.open(pdfURL, '_blank'); // เปิด URL ในแท็บใหม่
  };

  return (
    <PageContainer title="ข้อมูลเทียบโอนเบื้องต้น" description="ข้อมูลเทียบโอนเบื้องต้น">
      <Breadcrumb title="ข้อมูลเทียบโอนเบื้องต้น" />
      <ParentCard title="ข้อมูลนักศึกษา">
        <Grid container>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
            <Typography>{student._id || ''}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
            <Typography>{student.fullname || ''}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>หลักสูตร</CustomFormLabel>
            {allCurriculum.map((curriculum) =>
              student.curriculum === curriculum._id ? (
                <Typography key={curriculum.id}>
                  {curriculum.name || ''} ปี พ.ศ {curriculum.year || ''} ({curriculum.level || ''}{' '}
                  {curriculum.time || ''} ปี)
                </Typography>
              ) : null,
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รุ่นปี</CustomFormLabel>
            <Typography>{student.year || ''}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
            <Typography>{student.institution || ''}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
            <Typography>{student.branch || ''}</Typography>
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel>การเทียบโอน</CustomFormLabel>
            <Typography>{student.status || ''}</Typography>
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
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={'50%'} sx={{ paddingX: 0 }}>
                      <Typography variant="h5">รายวิชาในหลักสูตร</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <TableCell align="center" width={'30%'} sx={{ border: 0 }}>
                          <Typography variant="h6">รหัสวิชา</Typography>
                        </TableCell>
                        <TableCell width={'50%'} sx={{ border: 0 }}>
                          <Typography variant="h6">ชื่อวิชา</Typography>
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ border: 0 }}>
                          <Typography variant="h6">หน่วยกิต</Typography>
                        </TableCell>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" width={'50%'} sx={{ paddingX: 0 }}>
                      <Typography variant="h5">รายวิชาที่นำมาเทียบ</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <TableCell align="center" width={'30%'} sx={{ border: 0 }}>
                          <Typography variant="h6">รหัสวิชา</Typography>
                        </TableCell>
                        <TableCell width={'40%'} sx={{ border: 0 }}>
                          <Typography variant="h6">ชื่อวิชา</Typography>
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ border: 0 }}>
                          <Typography variant="h6">หน่วยกิต</Typography>
                        </TableCell>
                        <TableCell align="center" width={'10%'} sx={{ border: 0 }}>
                          <Typography variant="h6">เกรด</Typography>
                        </TableCell>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {Array.isArray(transferList) &&
                  transferList.map((list) => (
                    <TableBody key={list._id}>
                      {list.success.map((successItem) => (
                        <TableRow
                          sx={{
                            borderBottom: '0.5px solid #e6e6e6',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                          }}
                        >
                          <TableCell align="center" width={'50%'} sx={{ paddingX: 0 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <TableCell align="center" width={'30%'} sx={{ borderBottom: 0 }}>
                                <Typography>{successItem.subject_id}</Typography>
                              </TableCell>
                              {allSubject
                                .filter(
                                  (subjectItem) =>
                                    subjectItem.subject_id === successItem.subject_id,
                                )
                                .map((subjectItem) => (
                                  <>
                                    <TableCell width={'50%'} sx={{ borderBottom: 0 }}>
                                      <Typography>{subjectItem.subject_nameTh}</Typography>
                                      <Typography>({subjectItem.subject_nameEn})</Typography>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      width={'20%'}
                                      sx={{ borderBottom: 0 }}
                                    >
                                      <Typography>{subjectItem.total_credits}</Typography>
                                    </TableCell>
                                  </>
                                ))}
                            </Stack>
                          </TableCell>
                          <TableCell
                            align="center"
                            width={'50%'}
                            sx={{ paddingX: 0, borderLeft: '0.5px solid #e6e6e6' }}
                          >
                            {successItem.extraSubject.map((extra) => (
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <TableCell align="center" width={'30%'} sx={{ borderBottom: 0 }}>
                                  <Typography>{extra.id}</Typography>
                                </TableCell>
                                {allExtraSubject
                                  .filter((extraItem) => extraItem.extraSubject_id === extra.id)
                                  .map((extraItem) => (
                                    <>
                                      <TableCell width={'40%'} sx={{ borderBottom: 0 }}>
                                        <Typography>{extraItem.extraSubject_nameTh}</Typography>
                                        <Typography color="green">
                                          ({extraItem.extraSubject_nameEn})
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        width={'20%'}
                                        sx={{ borderBottom: 0 }}
                                      >
                                        <Typography>{extraItem.total_credits}</Typography>
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        width={'10%'}
                                        sx={{ borderBottom: 0 }}
                                      >
                                        <Typography>{extra.grade}</Typography>
                                      </TableCell>
                                    </>
                                  ))}
                              </Stack>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
            <Stack spacing={1} direction="row">
              <Typography variant="h6" fontWeight={400} color="green">
                จำนวนหน่วยกิตที่เทียบโอนได้ {total_credits} หน่วยกิต
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </ParentCard>
      <Box marginY={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">รายวิชาที่ขาดวิชาร่วม</Typography>
            <IconButton>
              <IconAlertCircle width={20} color={'red'} />
            </IconButton>
          </Stack>
        }
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={'20%'}>
                      <Typography variant="h5">รหัสวิชา</Typography>
                    </TableCell>
                    <TableCell width={'30%'}>
                      <Typography variant="h5">ชื่อวิชา</Typography>
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      <Typography variant="h5">หน่วยกิต</Typography>
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      <Typography variant="h5">เกรด</Typography>
                    </TableCell>
                    <TableCell align="center" width={'30%'}>
                      <Typography variant="h5">หมายเหตุ</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {Array.isArray(transferList) &&
                  transferList.map((list) => (
                    <TableBody key={list._id}>
                      {list.unsuccess.map((unsuccessItem) => (
                        <TableRow
                          sx={{
                            borderBottom: '0.5px solid #e6e6e6',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                          }}
                        >
                          <TableCell align="center" width={'20%'} sx={{ borderBottom: 0 }}>
                            <Typography>{unsuccessItem.extraSubject}</Typography>
                          </TableCell>
                          {allExtraSubject
                            .filter(
                              (subjectItem) =>
                                subjectItem.extraSubject_id === unsuccessItem.extraSubject,
                            )
                            .map((subjectItem) => (
                              <>
                                <TableCell width={'30%'} sx={{ borderBottom: 0 }}>
                                  <Typography>{subjectItem.extraSubject_nameTh}</Typography>
                                  <Typography>({subjectItem.extraSubject_nameEn})</Typography>
                                </TableCell>
                                <TableCell align="center" width={'10%'} sx={{ borderBottom: 0 }}>
                                  <Typography>{subjectItem.total_credits}</Typography>
                                </TableCell>
                                <TableCell align="center" width={'10%'} sx={{ borderBottom: 0 }}>
                                  <Typography>{unsuccessItem.grade}</Typography>
                                </TableCell>
                                <TableCell align="center" width={'30%'} sx={{ borderBottom: 0 }}>
                                  <Typography color={'red'}>{unsuccessItem.note}</Typography>
                                </TableCell>
                              </>
                            ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ParentCard>
      <Box marginY={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">ไฟล์ที่แนบมา</Typography>
            <IconButton>
              <IconFile width={20} color={'blue'} />
            </IconButton>
          </Stack>
        }
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="start">
              <Button variant="outlined" color="primary" endIcon={<IconSearch width={18} />}
              onClick={handleViewPDF}
              >
                ดูไฟล์ที่แนบมา
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default OrderTransfer;
