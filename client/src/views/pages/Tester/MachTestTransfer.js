import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
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

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';

import { useSelector } from 'react-redux';

import { listByStructure } from '../../../function/subject';
import { list } from '../../../function/extar-subject';
import { CutStructure } from '../../../function/transfer';

import { IconCircleX, IconCircleCheck } from '@tabler/icons';

const MachTestTransfer = () => {
  const curriculumRedux = useSelector((state) => state.tester.testTransfer.curriculum);
  const success = useSelector((state) => state.tester.testResultTransfer.success);
  const unsuccess = useSelector((state) => state.tester.testResultTransfer.unsuccess);
  const ungrade = useSelector((state) => state.tester.testResultTransfer.ungrade);

  const combinedData = [...unsuccess, ...ungrade];

  const [allSubject, setAllSubject] = useState([]);
  const [total_credits, setTotalCredits] = useState(0);
  const [allExtra, setAllExtra] = useState([]);
  const [cutStructure, setCutStructure] = useState([]);

  const fetchData = async () => {
    try {
      const DataTransfer = {
        structure_id: 'CS-' + curriculumRedux,
      };

      const responseSubject = await listByStructure(DataTransfer.structure_id);
      setAllSubject(responseSubject.data);

      const responseExtra = await list();
      setAllExtra(responseExtra.data);

      const responseCut = await CutStructure(curriculumRedux);
      setCutStructure(responseCut.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [curriculumRedux]);

  console.log(cutStructure);

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

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
      description="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
    >
      <Container maxWidth="lg">
        <Breadcrumb title={<>ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน</>} />
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cutStructure.map((item) => (
                      <React.Fragment key={item.structure._id}>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography fontWeight={500}>
                              {item.structure.sort} ( {item.structure.group_name} ){' '}
                              {item.structure.credit} หน่วยกิต
                            </Typography>
                          </TableCell>
                        </TableRow>
                        {item.subject.length > 0 ? (
                          item.subject.some((subject) =>
                            success.some((item) => item.subject_id === subject.subject_id),
                          ) ? (
                            <>
                              {item.subject.map((subject) => {
                                const matchedItems = success.filter(
                                  (item) => item.subject_id === subject.subject_id,
                                );

                                return (
                                  <React.Fragment key={subject._id}>
                                    {matchedItems.length > 0
                                      ? matchedItems.map((item, index) => (
                                          <TableRow
                                            key={index}
                                            sx={{ borderBottom: '0.5px solid #e6e6e6' }}
                                            hover
                                          >
                                            <TableCell
                                              align="center"
                                              width={'50%'}
                                              sx={{
                                                paddingX: 0,
                                                borderRight: '0.5px solid #e6e6e6',
                                              }}
                                            >
                                              {item.extra_id.map((extra_id) => {
                                                const extra = allExtra.find(
                                                  (option) =>
                                                    option.extraSubject_id === extra_id.id,
                                                );
                                                if (extra) {
                                                  return (
                                                    <TableRow
                                                      key={extra_id.id}
                                                      sx={{ borderBottom: 'none' }}
                                                    >
                                                      <TableCell align="center" width="15%">
                                                        <Typography>
                                                          {extra.extraSubject_id}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell width="25%">
                                                        <Typography>
                                                          {extra.extraSubject_nameTh}
                                                        </Typography>
                                                        <Typography>
                                                          ({extra.extraSubject_nameEn})
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell align="center" width="10%">
                                                        <Typography>
                                                          {extra.total_credits}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell align="center" width="10%">
                                                        <Typography>{extra_id.grade}</Typography>
                                                      </TableCell>
                                                    </TableRow>
                                                  );
                                                }
                                                return null;
                                              })}
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              width={'50%'}
                                              sx={{ paddingX: 0 }}
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
                                                  <Typography>{subject.subject_id}</Typography>
                                                </TableCell>
                                                {allSubject
                                                  .filter(
                                                    (subjectItem) =>
                                                      subjectItem.subject_id === item.subject_id,
                                                  )
                                                  .map((subjectItem) => (
                                                    <React.Fragment key={subjectItem.subject_id}>
                                                      <TableCell
                                                        width={'50%'}
                                                        sx={{ borderBottom: 0 }}
                                                      >
                                                        <Typography>
                                                          {subjectItem.subject_nameTh}
                                                        </Typography>
                                                        <Typography color="green">
                                                          ({subjectItem.subject_nameEn})
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell
                                                        align="center"
                                                        width={'20%'}
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
                                        ))
                                      : null}
                                  </React.Fragment>
                                );
                              })}
                              <TableRow>
                                <TableCell colSpan={4}>
                                  <Typography
                                    fontWeight={500}
                                    align="right"
                                    color={
                                      item.subject.reduce((total, subject) => {
                                        const matchedItem = success.find(
                                          (item) => item.subject_id === subject.subject_id,
                                        );
                                        if (matchedItem) {
                                          const subjectItem = allSubject.find(
                                            (sub) => sub.subject_id === matchedItem.subject_id,
                                          );
                                          return (
                                            total + (subjectItem ? subjectItem.total_credits : 0)
                                          );
                                        }
                                        return total;
                                      }, 0) > item.structure.credit
                                        ? 'red'
                                        : 'initial'
                                    }
                                  >
                                    หน่วยกิตทั้งหมดในหมวดนี้{' '}
                                    {item.subject.reduce((total, subject) => {
                                      const matchedItem = success.find(
                                        (item) => item.subject_id === subject.subject_id,
                                      );
                                      if (matchedItem) {
                                        const subjectItem = allSubject.find(
                                          (sub) => sub.subject_id === matchedItem.subject_id,
                                        );
                                        return (
                                          total + (subjectItem ? subjectItem.total_credits : 0)
                                        );
                                      }
                                      return total;
                                    }, 0)}{' '}
                                    หน่วยกิต
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </>
                          ) : (
                            <TableRow>
                              <TableCell align="center" colSpan={4}>
                                <Typography align="center">
                                  ไม่มีรายวิชาที่สามารถเทียบโอนได้ในหมวดนี้
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )
                        ) : (
                          <TableRow>
                            <TableCell align="center" colSpan={4}>
                              <Typography align="center">
                                ไม่มีรายวิชาที่สามารถเทียบโอนได้
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
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
              <Typography variant="h5">รายวิชาจากใบ รบ. ของนักศึกษาที่เหลือ</Typography>
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
                        <TableCell colSpan={5} align="center">
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
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default MachTestTransfer;
