import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { IconCircleCheck, IconAlertCircle, IconFile, IconSearch } from '@tabler/icons';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import Swal from 'sweetalert2';

import { currentUser } from '../../../../function/auth';
import { read as readCurriculum } from '../../../../function/curriculum';
import { TransferRead, CutStructure, TransferDelete } from '../../../../function/transfer';
import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';

const Mached = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllExtraSubject();
    checkUser();
  }, []);

  const student_id = user._id;
  const curriculum_id = user.curriculum;
  const structure_id = 'CS-' + user.curriculum;

  const [dataCurriculum, setDataCurriculum] = useState({});

  const loadDataCurriculum = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  const [transferList, setTransferList] = useState([]);
  const [transferOrder, setTransferOrder] = useState([]);

  const loadTransferRead = async (id) => {
    try {
      const res = await TransferRead(id);
      setTransferList(res.data.transferList);
      setTransferOrder(res.data.readTransferOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const [cutStructure, setCutStructure] = useState([]);

  const loadCutStructure = async (id) => {
    CutStructure(id)
      .then((res) => {
        setCutStructure(res.data);
      })
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

  useEffect(() => {
    if (curriculum_id) {
      loadDataCurriculum(curriculum_id);
    }
    loadCutStructure(curriculum_id);
  }, [curriculum_id]);

  useEffect(() => {
    if (structure_id) {
      loadAllSubject(structure_id);
    }
  }, [structure_id]);

  useEffect(() => {
    if (student_id) {
      loadTransferRead(student_id);
    }
  }, [student_id]);

  const pdfURL = 'http://localhost:5000/api/pdf/' + transferOrder.file; // URL ของไฟล์ PDF

  const handleViewPDF = () => {
    window.open(pdfURL, '_blank');
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: 'ข้อมูลจะหายถาวร! ต้องการยกเลิกรายการเทียบโอนของนักศึกษา?',
      icon: 'warning',
      width: 'auto',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log('ยกเลิกรายการเทียบโอนของนักศึกษา ข้อมูลจะหายถาวร!');
          await TransferDelete(student_id);
          Swal.fire({
            icon: 'success',
            title: 'ยกเลิกรายการเทียบโอนของนักศึกษาสำเร็จ',
          });
          navigate('/Student/Index');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'ยกเลิกรายการเทียบโอนของนักศึกษาไม่สำเร็จ',
            text: error.response ? error.response.data : 'An error occurred',
          });
          console.error('เกิดข้อผิดพลาดในการลบรายการข้อมูล:', error);
        }
      }
    });
  };

  return (
    <PageContainer title="ข้อมูลการเทียบโอน" description="ข้อมูลการเทียบโอน">
      <Breadcrumb title="ข้อมูลการเทียบโอน" />
      <ParentCard title="ข้อมูลนักศึกษา">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
            <Typography>{user._id}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
            <Typography>{user.fullname}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>หลักสูตร</CustomFormLabel>
            <Typography>
              {dataCurriculum
                ? `${dataCurriculum.name} (${dataCurriculum.level} ${dataCurriculum.time} ปี) พ.ศ ${dataCurriculum.year}`
                : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รุ่นปี</CustomFormLabel>
            <Typography>{user.year}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
            <Typography>{user.institution}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
            <Typography>{user.branch}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>การเทียบโอน</CustomFormLabel>
            <Typography
              sx={{
                color:
                  user.status === 'รอการยืนยันการเทียบโอนเบื้องต้น'
                    ? 'red'
                    : user.status === 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร'
                    ? 'orange'
                    : user.status === 'ยืนยันการเทียบโอนถูกต้อง'
                    ? 'green'
                    : 'initial',
              }}
            >
              {user.status}
            </Typography>
          </Grid>
        </Grid>
      </ParentCard>
      <Box marginY={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">ใบรับรองผลการเรียน</Typography>
            <IconButton>
              <IconFile width={20} color={'blue'} />
            </IconButton>
          </Stack>
        }
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="start">
              <Button
                variant="outlined"
                color="primary"
                endIcon={<IconSearch width={18} />}
                onClick={handleViewPDF}
              >
                ดูใบรับรองผลการเรียน
              </Button>
            </Stack>
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
                    <TableCell align="center" width={'50%'} sx={{ paddingX: 0 }}>
                      <Typography variant="h5">รายวิชาในหลักสูตร</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <TableCell align="center" width={'30%'} sx={{ border: 0 }}>
                          <Typography variant="h6">รหัสวิชา</Typography>
                        </TableCell>
                        <TableCell width={'45%'} sx={{ border: 0 }}>
                          <Typography variant="h6">ชื่อวิชา</Typography>
                        </TableCell>
                        <TableCell align="center" width={'15%'} sx={{ border: 0 }}>
                          <Typography variant="h6">หน่วยกิต</Typography>
                        </TableCell>
                        <TableCell align="center" width={'15%'} sx={{ border: 0 }}>
                          <Typography variant="h6">ลบ</Typography>
                        </TableCell>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {cutStructure.map((item) => {
                  const hasSubjects = item.subject.some((subject) =>
                    transferList.some((list) =>
                      list.success.some(
                        (successItem) => successItem.subject_id === subject.subject_id,
                      ),
                    ),
                  );

                  const totalCredits = item.subject.reduce((total, subject) => {
                    const matchedItem = transferList
                      .flatMap((list) => list.success)
                      .find((successItem) => successItem.subject_id === subject.subject_id);
                    if (matchedItem) {
                      const subjectItem = allSubject.find(
                        (sub) => sub.subject_id === matchedItem.subject_id,
                      );
                      return total + (subjectItem ? subjectItem.total_credits : 0);
                    }
                    return total;
                  }, 0);

                  return (
                    <React.Fragment key={item.structure._id}>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Typography fontWeight={500}>
                            {item.structure.sort} ({item.structure.group_name}){' '}
                            {item.structure.credit} หน่วยกิต
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {item.subject.map((subject) => (
                        <React.Fragment key={subject._id}>
                          {Array.isArray(transferList) &&
                            transferList.map((list, listIndex) => {
                              const filteredSuccess = list.success.filter(
                                (successItem) => successItem.subject_id === subject.subject_id,
                              );
                              return (
                                filteredSuccess.length > 0 && (
                                  <React.Fragment key={list._id}>
                                    {filteredSuccess.map((successItem, successIndex) => (
                                      <TableRow
                                        key={`${listIndex}-${successIndex}`}
                                        sx={{
                                          borderBottom: '0.5px solid #e6e6e6',
                                          '&:hover': { backgroundColor: '#f0f0f0' },
                                        }}
                                      >
                                        <TableCell
                                          align="center"
                                          width={'50%'}
                                          sx={{ paddingX: 0 }}
                                        >
                                          {successItem.extraSubject.map((extra) => (
                                            <Stack
                                              key={extra.id}
                                              direction="row"
                                              justifyContent="space-between"
                                              alignItems="center"
                                            >
                                              <TableCell
                                                align="center"
                                                width={'30%'}
                                                sx={{ borderBottom: 0 }}
                                              >
                                                <Typography>{extra.id}</Typography>
                                              </TableCell>
                                              {allExtraSubject
                                                .filter(
                                                  (extraItem) =>
                                                    extraItem.extraSubject_id === extra.id,
                                                )
                                                .map((extraItem) => (
                                                  <React.Fragment key={extraItem.extraSubject_id}>
                                                    <TableCell
                                                      width={'40%'}
                                                      sx={{ borderBottom: 0 }}
                                                    >
                                                      <Typography>
                                                        {extraItem.extraSubject_nameTh}
                                                      </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      width={'20%'}
                                                      sx={{ borderBottom: 0 }}
                                                    >
                                                      <Typography>
                                                        {extraItem.total_credits}
                                                      </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      width={'10%'}
                                                      sx={{ borderBottom: 0 }}
                                                    >
                                                      <Typography>{extra.grade}</Typography>
                                                    </TableCell>
                                                  </React.Fragment>
                                                ))}
                                            </Stack>
                                          ))}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          width={'50%'}
                                          sx={{ paddingX: 0, borderLeft: '0.5px solid #e6e6e6' }}
                                        >
                                          <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                          >
                                            <TableCell
                                              align="center"
                                              width={'30%'}
                                              sx={{ borderBottom: 0 }}
                                            >
                                              <Typography>{successItem.subject_id}</Typography>
                                            </TableCell>
                                            {allSubject
                                              .filter(
                                                (subjectItem) =>
                                                  subjectItem.subject_id === successItem.subject_id,
                                              )
                                              .map((subjectItem) => (
                                                <React.Fragment key={subjectItem.subject_id}>
                                                  <TableCell width={'45%'} sx={{ borderBottom: 0 }}>
                                                    <Typography>
                                                      {subjectItem.subject_nameTh}
                                                    </Typography>
                                                    <Typography color={'green'}>
                                                      ({subjectItem.subject_nameEn})
                                                    </Typography>
                                                  </TableCell>
                                                  <TableCell
                                                    align="center"
                                                    width={'15%'}
                                                    sx={{ borderBottom: 0 }}
                                                  >
                                                    <Typography>
                                                      {subjectItem.total_credits}
                                                    </Typography>
                                                  </TableCell>
                                                </React.Fragment>
                                              ))}
                                          </Stack>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </React.Fragment>
                                )
                              );
                            })}
                        </React.Fragment>
                      ))}
                      {!hasSubjects && (
                        <TableRow>
                          <TableCell align="center" colSpan={4}>
                            <Typography align="center">
                              ไม่มีรายวิชาที่สามารถเทียบโอนได้ในหมวดนี้
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {hasSubjects && (
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Typography
                              fontWeight={500}
                              align="right"
                              color={totalCredits > item.structure.credit ? 'red' : 'initial'}
                            >
                              หน่วยกิตทั้งหมดในหมวดนี้ {totalCredits} หน่วยกิต
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
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
            <Typography variant="h5">รายวิชาที่เหลือ</Typography>
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
                      {list.unsuccess.length > 0 ? (
                        list.unsuccess.map((unsuccessItem) => (
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
                                <React.Fragment key={subjectItem.extraSubject_id}>
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
                                </React.Fragment>
                              ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Typography align="center">
                              ไม่มีรายวิชาที่ไม่สามารถนำมาเทียบโอนได้
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ParentCard>
      <Box marginY={3} />

      <Grid item xs={12} sm={12} lg={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
          <Stack spacing={1} direction="row">
            <Button variant="outlined" color="error" onClick={handleDelete}>
              ยกเลิกการเทียบโอน
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </PageContainer>
  );
};

export default Mached;
