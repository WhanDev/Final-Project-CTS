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
  Button,
} from '@mui/material';
import { IconCircleCheck, IconAlertCircle, IconFile, IconSearch } from '@tabler/icons';
import Swal from 'sweetalert2';

import PageContainer from '../../../../components/container/PageContainer';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../../components/shared/ParentCard';

import { TransferRead, TransferRevert } from '../../../../function/transfer';
import { read as readStudent } from '../../../../function/student';
import { list as ListCurriculum } from '../../../../function/curriculum';
import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';
import { list as AllAdmin } from '../../../../function/admin';
import { CutStructure } from '../../../../function/transfer';

import axios from 'axios';

const ConfirmOrderTransfer = () => {
  const params = useParams();

  const [transferList, setTransferList] = useState([]);
  const [transferOrder, setTransferOrder] = useState([]);
  const [checkByid, setCheckBy] = useState({});
  const [approveByid, setApproveBy] = useState({});
  const [checkMan, setCheckMan] = useState([]);
  const [cutStructure, setCutStructure] = useState([]);

  const loadCutStructure = async (id) => {
    CutStructure(id)
      .then((res) => {
        setCutStructure(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadAllAdmin = async () => {
    AllAdmin()
      .then((res) => setCheckMan(res.data))
      .catch((err) => console.log(err));
  };

  const loadTransferRead = async (id) => {
    TransferRead(id)
      .then((res) => {
        setTransferList(res.data.transferList);
        setTransferOrder(res.data.readTransferOrder);
        setCheckBy(res.data.readTransfer.checkBy);
        setApproveBy(res.data.readTransfer.approveBy);
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

  useEffect(() => {
    loadTransferRead(params._id);
    loadReadStudent(params._id);
    loadListCurriculum();
    loadAllExtraSubject();
    loadAllAdmin();
  }, [params._id]);

  useEffect(() => {
    if (student.curriculum) {
      loadAllSubject(structure_id);
    }
    loadCutStructure(student.curriculum)
  }, [student.curriculum]);

  const pdfURL = 'http://localhost:5000/api/pdf/' + transferOrder.file; // URL ของไฟล์ PDF

  const handleViewPDF = () => {
    window.open(pdfURL, '_blank'); // เปิด URL ในแท็บใหม่
  };

  const handleGeneratePdfPath1 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reportPath1/' + params._id, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      const fileName = student._id + ' ส่วนที่ 1 ใบคำร้องขอเทียบโอนผลการเรียน.pdf';

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.window.open = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  const handleGeneratePdfPath2 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reportPath2/' + params._id, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      const fileName = student._id +' ส่วนที่ 2 ใบคำร้องขอเทียบโอนผลการเรียน.pdf';

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.window.open = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRevert = () => {
    Swal.fire({
      title: 'ยกเลิกยืนยันการเทียบโอน รายการจะอยู่ในสถานะรอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร?',
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
          await TransferRevert(params._id);
          Swal.fire({
            icon: 'success',
            title: 'ยกเลิกยืนยันการเทียบโอนสำเร็จ',
          });
          navigate(-1);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'ยกเลิกยืนยันการเทียบโอนไม่สำเร็จ',
            text: error.response ? error.response.data : 'An error occurred',
          });
          console.error('เกิดข้อผิดพลาดในการลบรายการข้อมูล:', error);
        }
      }
    });
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
            <Typography color={'green'}>{student.status || ''}</Typography>
          </Grid>
        </Grid>
      </ParentCard>
      <Box marginY={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">ข้อมูลผู้ยืนยันการเทียบโอน</Typography>
          </Stack>
        }
      >
        <Grid container>
          {checkMan.map((checkMan) =>
            checkMan._id === checkByid ? (
              <React.Fragment key={checkMan._id}>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
                  <Typography>{checkMan.fullname || ''}</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel>สังกัดหลักสูตร</CustomFormLabel>
                  {allCurriculum.some((curriculum) => checkMan.curriculum === curriculum._id) ? (
                    allCurriculum.map((curriculum) =>
                      checkMan.curriculum === curriculum._id ? (
                        <Typography key={curriculum._id}>
                          {curriculum.name || ''} ปี พ.ศ {curriculum.year || ''} (
                          {curriculum.level || ''} {curriculum.time || ''} ปี)
                        </Typography>
                      ) : null,
                    )
                  ) : (
                    <Typography>
                      ไม่สังกัดหลักสูตร ({checkMan.role === 'แอดมิน' ? 'ผู้ดูแลระบบ' : ''})
                    </Typography>
                  )}
                </Grid>
              </React.Fragment>
            ) : null,
          )}
        </Grid>
      </ParentCard>

      <Box marginY={3} />

      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">ข้อมูลผู้ตรวจสอบเบื้องต้น</Typography>
          </Stack>
        }
      >
        <Grid container>
          {checkMan.map((checkMan) =>
            checkMan._id === approveByid ? (
              <React.Fragment key={checkMan._id}>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
                  <Typography>{checkMan.fullname || ''}</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel>สังกัดหลักสูตร</CustomFormLabel>
                  {allCurriculum.some((curriculum) => checkMan.curriculum === curriculum._id) ? (
                    allCurriculum.map((curriculum) =>
                      checkMan.curriculum === curriculum._id ? (
                        <Typography key={curriculum._id}>
                          {curriculum.name || ''} ปี พ.ศ {curriculum.year || ''} (
                          {curriculum.level || ''} {curriculum.time || ''} ปี)
                        </Typography>
                      ) : null,
                    )
                  ) : (
                    <Typography>
                      ไม่สังกัดหลักสูตร ({checkMan.role === 'แอดมิน' ? 'ผู้ดูแลระบบ' : ''})
                    </Typography>
                  )}
                </Grid>
              </React.Fragment>
            ) : null,
          )}
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
              <Button
                variant="outlined"
                color="primary"
                endIcon={<IconSearch width={18} />}
                onClick={handleViewPDF}
              >
                ดูไฟล์ที่แนบมา
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
            <Button variant="contained" color="primary" onClick={handleGeneratePdfPath1}>
              ใบคำร้องขอเทียบโอนผลการเรียน ส่วนที่ 1
            </Button>
            <Button variant="contained" color="success" onClick={handleGeneratePdfPath2}>
              ใบคำร้องขอเทียบโอนผลการเรียน ส่วนที่ 2
            </Button>
            <Button variant="outlined" color="error" onClick={handleRevert}>
              ยกเลิกยืนยันการเทียบโอน
            </Button>
            <Button variant="outlined" color="warning" onClick={handleBack}>
              ย้อนกลับ
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </PageContainer>
  );
};

export default ConfirmOrderTransfer;
