import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import { list as AllExtraSubject } from '../../../function/extar-subject';
import { useSelector } from 'react-redux';

const ExtarSubjectCheck = () => {
  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const getSelected = useSelector((state) => state.extraSubject.extraSubjects);
  const getCurriculum = useSelector((state) => state.curriculum.curriculums);

  console.log(getSelected);
  console.log(getCurriculum);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate('/test/mach');
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    loadDataExtraSubject();
  }, []);

  return (
    <PageContainer title="ตรวจสอบรายวิชาที่นำมาเทียบ" description="ตรวจสอบรายวิชาที่นำมาเทียบ">
      <Container maxWidth="lg">
        <Breadcrumb title={<>รายวิชาที่นำมาเทียบ</>} />
        <ParentCard title="รายวิชาที่สามารถนำมาเทียบ">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <Stack>
                <Box mt={2}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={'5%'}>
                            <Typography variant="h5">ลำดับ</Typography>
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            <Typography variant="h5">รหัสวิชา</Typography>
                          </TableCell>
                          <TableCell width={'70%'}>
                            <Typography variant="h5">ชื่อวิชา</Typography>
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            <Typography variant="h5">เกรด</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getSelected.length > 0 ? (
                          getSelected.map((item, index) => {
                            const subject = ExtraSubject.find(
                              (option) => option.extraSubject_id === item.extraSubject_id,
                            );
                            if (subject) {
                              return (
                                <TableRow key={index} hover>
                                  <TableCell align="center" width="5%">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="center" width="15%">
                                    {subject.extraSubject_id}
                                  </TableCell>
                                  <TableCell width="70%">
                                    {subject.extraSubject_nameTh}
                                    <Typography color="primary">
                                      {subject.extraSubject_nameEn}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center" width="10%">
                                    {item.grade}
                                  </TableCell>
                                </TableRow>
                              );
                            } else {
                              return null; // Handle case when the selected subject is not found
                            }
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              <Box>
                                <Typography align="center">ไม่มีข้อมูลรายวิชาที่เรียนมา</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ParentCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
            <Stack spacing={1} direction="row">
              <Button type="submit" variant="contained" color="success" onClick={handleSubmit}>
                ถัดไป
              </Button>
              <Button variant="outlined" color="warning" onClick={handleBack}>
                ย้อนกลับ
              </Button>
            </Stack>
          </Stack>
        </Grid>
        ;
      </Container>
    </PageContainer>
  );
};

export default ExtarSubjectCheck;
