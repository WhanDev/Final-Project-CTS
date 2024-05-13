import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Stack,
  IconButton,
  Button,
} from '@mui/material';

import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../../components/shared/ParentCard';

import { useSelector } from 'react-redux';

import { listByStructure } from '../../../../function/subject';
import { list } from '../../../../function/extar-subject';
import { currentUser } from '../../../../function/auth';
import { SaveTransfer, UploadFile } from '../../../../function/transfer';

import { IconCircleX, IconCircleCheck, IconFile } from '@tabler/icons';
import Swal from 'sweetalert2';

const Mach = () => {
  const curriculumRedux = useSelector((state) => state.tester.testTransfer.curriculum);

  const success = useSelector((state) => state.tester.testResultTransfer.success);
  const unsuccess = useSelector((state) => state.tester.testResultTransfer.unsuccess);
  const ungrade = useSelector((state) => state.tester.testResultTransfer.ungrade);

  const combinedData = [...unsuccess, ...ungrade];

  const [allSubject, setAllSubject] = React.useState([]);
  const [total_credits, setTotalCredits] = React.useState(0);
  const [allExtra, setAllExtra] = React.useState([]);

  const fetchData = async () => {
    try {
      const DataTransfer = {
        structure_id: 'CS-' + curriculumRedux,
      };

      const responseSubject = await listByStructure(DataTransfer.structure_id);
      setAllSubject(responseSubject.data);

      const responseExtra = await list();
      setAllExtra(responseExtra.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [curriculumRedux]);

  useEffect(() => {
    let totalCredits = 0;

    success.forEach((item) => {
      const subject = allSubject.find((option) => option.subject_id === item.subject_id);
      if (subject) {
        totalCredits += subject.total_credits;
      }
    });

    setTotalCredits(totalCredits);
  }, [success, allSubject]);

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
    checkUser();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileCancel = (event) => {
    setSelectedFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const SaveData = {
      student_id: user._id,
      success: success,
      unsuccess: unsuccess,
    };

    const formData = new FormData();
    formData.append('student_id', user._id);
    formData.append('file', selectedFile);

    Swal.fire({
      title: 'ต้องการบันทึกข้อมูลนี้ใช่หรือไม่?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await SaveTransfer(SaveData);
          await UploadFile(formData); // แก้ให้รับ FormData เป็นอาร์กิวเมนต์
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          });
          navigate('/student/transfer');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: error.response.data,
          });
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
        }
      }
    });
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="ผลการเทียบโอนหน่วยกิตผลการเรียนเบี้องต้น"
      description="ผลการเทียบโอนหน่วยกิตผลการเรียนเบี้องต้น"
    >
      <Breadcrumb title={<>ผลการเทียบโอนหน่วยกิตผลการเรียนเบื้องต้น</>} />
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
                        <TableCell align="center" width={'25%'} sx={{ border: 0 }}>
                          <Typography variant="h6">รหัสวิชา</Typography>
                        </TableCell>
                        <TableCell width={'40%'} sx={{ border: 0 }}>
                          <Typography variant="h6">ชื่อวิชา</Typography>
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ border: 0 }}>
                          <Typography variant="h6">หน่วยกิต</Typography>
                        </TableCell>
                        <TableCell align="center" width={'15%'} sx={{ border: 0 }}>
                          <Typography variant="h6">เกรด</Typography>
                        </TableCell>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {success.length > 0 ? (
                    success.map((item, index) => {
                      const subject = allSubject.find(
                        (option) => option.subject_id === item.subject_id,
                      );
                      if (subject) {
                        return (
                          <TableRow key={index} sx={{ borderBottom: '0.5px solid #e6e6e6' }} hover>
                            <TableCell align="center" width={'50%'} sx={{ paddingX: 0 }}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <TableCell align="center" width={'30%'} sx={{ borderBottom: 0 }}>
                                  <Typography>{subject.subject_id}</Typography>
                                </TableCell>
                                {allSubject
                                  .filter(
                                    (subjectItem) => subjectItem.subject_id === item.subject_id,
                                  )
                                  .map((subjectItem) => (
                                    <React.Fragment key={subjectItem.subject_id}>
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
                                    </React.Fragment>
                                  ))}
                              </Stack>
                            </TableCell>
                            <TableCell
                              align="center"
                              width={'50%'}
                              sx={{ paddingX: 0, borderLeft: '0.5px solid #e6e6e6' }}
                            >
                              {item.extra_id.map((extra_id) => {
                                const extra = allExtra.find(
                                  (option) => option.extraSubject_id === extra_id.id,
                                );
                                if (extra) {
                                  return (
                                    <TableRow key={extra_id} sx={{ borderBottom: 'none' }}>
                                      <TableCell align="center" width="15%">
                                        <Typography>{extra.extraSubject_id}</Typography>
                                      </TableCell>
                                      <TableCell width="25%">
                                        <Typography>{extra.extraSubject_nameTh}</Typography>
                                        <Typography color="green">
                                          ({extra.extraSubject_nameEn})
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center" width="10%">
                                        <Typography>{extra.total_credits}</Typography>
                                      </TableCell>
                                      <TableCell align="center" width="10%">
                                        <Typography>{extra_id.grade}</Typography>
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
                      <TableCell align="center" colSpan={7}>
                        <Typography align="center">ไม่มีรายวิชาที่สามารถเทียบโอนได้</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
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
      <Box m={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">รายวิชาที่ไม่สามารถนำมาเทียบโอนได้</Typography>
            <IconButton>
              <IconCircleX width={20} color={'red'} />
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
                    <TableCell align="center" width={'40%'}>
                      <Typography variant="h5">หมายเหตุ</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedData.length > 0 ? (
                    combinedData.map((item, index) => {
                      const subject = allExtra.find(
                        (option) => option.extraSubject_id === item.extra_id,
                      );
                      if (subject) {
                        return (
                          <TableRow key={item.id} hover>
                            <TableCell align="center" width="10%">
                              <Typography>{subject.extraSubject_id}</Typography>
                            </TableCell>
                            <TableCell width="30%">
                              <Typography>{subject.extraSubject_nameTh}</Typography>
                            </TableCell>
                            <TableCell align="center" width="10%">
                              <Typography>{subject.total_credits}</Typography>
                            </TableCell>
                            <TableCell align="center" width="10%">
                              <Typography>{item.grade}</Typography>
                            </TableCell>
                            <TableCell align="center" width="40%">
                              <Typography color={'red'}>{item.note}</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography align="center">
                          ไม่มีรายวิชาที่ไม่สามารถนำมาเทียบโอนได้
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ParentCard>
      <Box m={3} />
      <ParentCard
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">แนบใบรับ</Typography>
            <IconButton>
              <IconFile width={20} color={'blue'} />
            </IconButton>
          </Stack>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={12}>
            <form onSubmit={handleSave} encType="multipart/form-data">
              <Stack direction="row" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  component="label"
                  disabled={selectedFile}
                >
                  {selectedFile ? selectedFile.name : 'เลือกไฟล์ PDF เท่านั้น'}
                  <input
                    hidden
                    accept="image/*,.pdf"
                    type="file"
                    onChange={handleFileChange}
                    name="file"
                    disabled={selectedFile}
                  />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginX: 1 }}
                  onClick={handleFileCancel}
                  disabled={!selectedFile}
                >
                  <Typography>ยกเลิก</Typography>
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </ParentCard>
      <Grid item xs={12} sm={12} lg={12}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="end"
          mt={2}
          mb={2}
        >
          <Stack spacing={1} direction="row">
            <Button variant="outlined" color="warning" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button variant="contained" color="success" onClick={handleSave}>
              บันทึก
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </PageContainer>
  );
};

export default Mach;
