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
  IconButton,
  TextField,
} from '@mui/material';
import { IconCircleMinus } from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import { useSelector, useDispatch } from 'react-redux';
import { list as AllExtraSubject } from '../../../function/extar-subject';
import { read as AllCurriculum } from '../../../function/curriculum';
import { clearTestTransfer, setTestTransfer } from '../../../store/testTransfer';
import Swal from 'sweetalert2';

const ExtarSubjectCheck = () => {
  const curriculumRedux = useSelector((state) => state.tester.testTransfer.curriculum);
  const extraSubjectRedux = useSelector((state) => state.tester.testTransfer.extraSubject);

  const [extraSubjectList, setExtraSubjectList] = useState([]);

  useEffect(() => {
    const updatedExtraSubjectList = extraSubjectRedux.map((subjectId) => ({
      id: subjectId,
      grade: 0,
    }));
    setExtraSubjectList(updatedExtraSubjectList);
  }, [extraSubjectRedux]);


  const [curriculum, setCurriculum] = useState([]);
  const [extraSubject, setExtraSubject] = useState([]);

  const loadDataCurriculum = async (id) => {
    AllCurriculum(id)
      .then((res) => setCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  const loadDataAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataCurriculum(curriculumRedux);
    loadDataAllExtraSubject();
  }, [curriculumRedux]);

  const handleGradeChange = (value, subjectId) => {
    setExtraSubjectList((prevList) =>
      prevList.map((subject) =>
        subject.id === subjectId ? { ...subject, grade: value } : subject,
      ),
    );
  };

  const handleDelete = (index) => {
    setExtraSubjectList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    Swal.fire({
      title: 'ยืนยันการทดสอบเทียบโอน?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearTestTransfer());
        dispatch(
          setTestTransfer({
            curriculum: curriculumRedux,
            extraSubject: extraSubjectList,
          }),
        );
        navigate('/test/mach');
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="ตรวจสอบรายวิชาที่นำมาเทียบ" description="ตรวจสอบรายวิชาที่นำมาเทียบ">
      <Container maxWidth="lg">
        <Breadcrumb title={<>รายวิชาที่นำมาเทียบ</>} />
        <ParentCard title="เลือกหลักสูตร">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                  placeholder="กรอกรหัสหลักสูตร/ชื่อหลักสูตร"
                  variant="outlined"
                  value={
                    curriculum._id +
                    ' | ' +
                    curriculum.name +
                    ' ' +
                    curriculum.level +
                    ' (' +
                    curriculum.year +
                    ')'
                  }
                  fullWidth
                  disabled
                />
              </Stack>
            </Grid>
          </Grid>
        </ParentCard>
        <Box m={3} />
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
                          <TableCell width={'60%'}>
                            <Typography variant="h5">ชื่อวิชา</Typography>
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            <Typography variant="h5">เกรด</Typography>
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            <Typography variant="h5">แก้ไข</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {extraSubjectList.length > 0 ? (
                          extraSubjectList.map((item, index) => {
                            const subject = extraSubject.find(
                              (option) => option.extraSubject_id === item.id,
                            );
                            if (subject) {
                              return (
                                <TableRow key={item.id} hover>
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
                                    <TextField
                                      variant="outlined"
                                      placeholder="0"
                                      type="number"
                                      value={item.grade}
                                      onChange={(e) => handleGradeChange(e.target.value, item.id)}
                                      rows={1}
                                      maxRows={1}
                                      inputProps={{ max: 4, min: 0 }}
                                    />
                                  </TableCell>
                                  <TableCell align="center" width="10%">
                                    <IconButton
                                      variant="outlined"
                                      color="error"
                                      onClick={() => handleDelete(index)}
                                    >
                                      <IconCircleMinus width={18} />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            } else {
                              return null;
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
              <Button variant="outlined" color="warning" onClick={handleBack}>
                ย้อนกลับ
              </Button>
              <Button type="submit" variant="contained" color="success" onClick={handleSubmit}>
                ถัดไป
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
