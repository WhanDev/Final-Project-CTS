import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TableContainer,
} from '@mui/material';
import { Stack } from '@mui/system';
import { IconEditCircle, IconCirclePlus, IconCircleMinus } from '@tabler/icons';
import Swal from 'sweetalert2';

import PageContainer from '../../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import { read as ReadCurriculum } from '../../../../function/curriculum';
import { listByCurriculum as AllMachsubject } from '../../../../function/machsubject';
import {
  list as AllMachsubjectList,
  remove as RemoveMachSubjectList,
} from '../../../../function/machsubjectlist';
import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';

const ListMachSubject = () => {
  const params = useParams();

  const [Curriculum, setCurriculum] = useState({
    _id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  useEffect(() => {
    loadCurriculum(params.curriculum);
  }, [params.curriculum]);

  const loadCurriculum = async (_id) => {
    ReadCurriculum(_id).then((res) => {
      setCurriculum(res.data);
    });
  };

  const [MachSubject, setMachSubject] = useState([]);

  useEffect(() => {
    loadDataAllMachsubject(params.curriculum);
  }, [params.curriculum]);

  const loadDataAllMachsubject = async (_id) => {
    AllMachsubject(_id)
      .then((res) => setMachSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [MachSubjectList, setMachSubjectList] = useState([]);

  useEffect(() => {
    loadDataAllMachsubjectList();
  }, []);

  const loadDataAllMachsubjectList = async () => {
    AllMachsubjectList()
      .then((res) => setMachSubjectList(res.data))
      .catch((err) => console.log(err));
  };

  const [Subject, setSubject] = useState([]);

  useEffect(() => {
    loadDataAllSubject(params.structure_id);
  }, [params.structure_id]);

  const loadDataAllSubject = async (structure_id) => {
    try {
      const res = await AllSubject(structure_id);
      const data = res.data;
      setSubject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [ExtraSubject, setExtraSubject] = useState([]);

  useEffect(() => {
    loadDataAllExtraSubject();
  }, []);

  const loadDataAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemoveMachSubjectList = async (_id) => {
    Swal.fire({
      title: 'ต้องการลบข้อมูลนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
        RemoveMachSubjectList(_id).then((res) => {
          console.log(res);
          loadCurriculum(params.curriculum);
          loadDataAllMachsubject(params.curriculum);
          loadDataAllMachsubjectList();
          loadDataAllExtraSubject();
        });
      }
    });
  };

  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <Breadcrumb
        title={
          <>
            คู่เทียบโอน หลักสูตร {Curriculum.name} ({Curriculum.year}) {Curriculum.level}{' '}
            {Curriculum.time} ปี
          </>
        }
      />
      <ChildCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="end">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<IconCirclePlus width={18} />}
              component={Link}
              to={
                '/manage/machsubject/curriculum/' +
                params.curriculum +
                '/structure/' +
                params.structure_id +
                '/add'
              }
            >
              เพิ่มคู่เทียบ
            </Button>
          </Stack>
        </Grid>
        <Box mt={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {/* คอลัม 1 รายวิชาในหลักสูตร */}
                  <TableCell width={'50%'} sx={{ px: 0, mx: 0 }} align="center">
                    <Typography variant="h5">รายวิชาในหลักสูตร</Typography>
                    <TableRow>
                      <TableCell width={'15%'} sx={{ px: 0, mx: 0 }} align="center">
                        <Typography variant="h6">รหัสวิชา</Typography>
                      </TableCell>
                      <TableCell width={'25%'} sx={{ px: 0, mx: 0 }} align="left">
                        <Typography variant="h6">ชื่อวิชา</Typography>
                      </TableCell>
                      <TableCell width={'10%'} sx={{ px: 0, mx: 0 }} align="center">
                        <Typography variant="h6">หน่วยกิต</Typography>
                      </TableCell>
                    </TableRow>
                  </TableCell>
                  {/* คอลัม 2 รายวิชาที่นำมาเทียบ*/}
                  <TableCell width={'50%'} sx={{ px: 0, mx: 0 }} align="center">
                    <Typography variant="h5">รายวิชาที่นำมาเทียบ</Typography>
                    <TableRow>
                      <TableCell width={'15%'} sx={{ px: 0, mx: 0 }} align="center">
                        <Typography variant="h6">รหัสวิชา</Typography>
                      </TableCell>
                      <TableCell width={'25%'} sx={{ px: 0, mx: 0 }} align="left">
                        <Typography variant="h6">ชื่อวิชา</Typography>
                      </TableCell>
                      <TableCell width={'10%'} sx={{ px: 0, mx: 0 }} align="center">
                        <Typography variant="h6">หน่วยกิต</Typography>
                      </TableCell>
                      <TableCell width={'10%'} sx={{ px: 0, mx: 0 }} align="center">
                        <Typography variant="h6" hidden>
                          จัดการข้อมูล
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {MachSubject.length > 0 ? (
                  MachSubject.map((item) => (
                    <>
                      <TableRow>
                        {/* คอลัม 1 */}
                        <TableCell width={'50%'} sx={{ px: 0, mx: 0, border: '1px solid #ddd' }}>
                          {Subject.map((subject) => {
                            if (subject.subject_id === item.subject_id) {
                              return (
                                <>
                                  <TableCell width={'15%'} sx={{ px: 0, mx: 0 }} align="center">
                                    <Typography>{subject.subject_id}</Typography>
                                  </TableCell>
                                  <TableCell width={'25%'} sx={{ px: 0, mx: 0 }} align="left">
                                    <Typography>
                                      {subject.subject_nameTh}
                                      <Typography color={'primary'}>
                                        ({subject.subject_nameEn})
                                      </Typography>
                                    </Typography>
                                  </TableCell>
                                  <TableCell width={'10%'} sx={{ px: 0, mx: 0 }} align="center">
                                    <Typography>{subject.total_credits}</Typography>
                                  </TableCell>
                                </>
                              );
                            }
                          })}
                        </TableCell>
                        {/* คอลัม 2 */}
                        <TableCell width={'50%'} sx={{ px: 0, mx: 0, border: '1px solid #ddd' }}>
                          {MachSubjectList.length > 0 ? (
                            MachSubjectList.map((MachSubjectListItem, index) => {
                              if (MachSubjectListItem.machSubject_id === item._id) {
                                return (
                                  <>
                                    <TableRow
                                      key={MachSubjectListItem._id}
                                      sx={{
                                        backgroundColor: index % 2 === 0 ? 'white' : '#f0f0f0',
                                      }}
                                    >
                                      {/* <TableCell>
                                        <IconArrowsSplit2 size="20" />
                                      </TableCell> */}
                                      <TableCell width={'45%'} sx={{ px: 0, mx: 0 }}>
                                        {MachSubjectListItem.extraSubject_id.map((extraSubject) => (
                                          <React.Fragment key={extraSubject}>
                                            {ExtraSubject.map((extra) => {
                                              if (extra.extraSubject_id === extraSubject) {
                                                return (
                                                  <TableRow>
                                                    {/* คอลัม 2 */}
                                                    <TableCell width={'45%'} sx={{ px: 0, mx: 0 }}>
                                                      <TableCell
                                                        width={'15%'}
                                                        sx={{ px: 0, mx: 0 }}
                                                        align="center"
                                                      >
                                                        <Typography>
                                                          {extra.extraSubject_id}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell
                                                        width={'25%'}
                                                        sx={{ px: 0, mx: 0 }}
                                                        align="left"
                                                      >
                                                        <Typography>
                                                          {extra.extraSubject_nameTh}
                                                          <Typography color={'primary'}>
                                                            ({extra.extraSubject_nameEn})
                                                          </Typography>
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell
                                                        width={'10%'}
                                                        sx={{ px: 0, mx: 0 }}
                                                        align="center"
                                                      >
                                                        <Typography>
                                                          {extra.total_credits}
                                                        </Typography>
                                                      </TableCell>
                                                    </TableCell>
                                                  </TableRow>
                                                );
                                              }
                                            })}
                                          </React.Fragment>
                                        ))}
                                      </TableCell>
                                      <TableCell width={'10%'} sx={{ px: 0, mx: 0 }} align="center">
                                        <IconButton
                                          color="warning"
                                          component={Link}
                                          to={
                                            '/manage/machsubject/curriculum/' +
                                            params.curriculum +
                                            '/structure/' +
                                            params.structure_id +
                                            '/' +
                                            item.subject_id +
                                            '/' +
                                            MachSubjectListItem._id +
                                            '/edit'
                                          }
                                        >
                                          <IconEditCircle size="20" />
                                        </IconButton>
                                        <IconButton
                                          onClick={() =>
                                            handleRemoveMachSubjectList(MachSubjectListItem._id)
                                          }
                                          color="error"
                                        >
                                          <IconCircleMinus size="20" />
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                );
                              }
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} width={'50%'}>
                                <Typography align="center">
                                  ไม่มีข้อมูลรายวิชาที่นำมาเทียบ
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )}
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              width={'50%'}
                              sx={{ px: 0, mx: 0 }}
                              align="center"
                            >
                              <IconButton
                                color="info"
                                component={Link}
                                to={
                                  '/manage/machsubject/curriculum/' +
                                  params.curriculum +
                                  '/structure/' +
                                  params.structure_id +
                                  '/' +
                                  item.subject_id +
                                  '/add'
                                }
                              >
                                <IconCirclePlus size="20" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography align="center">ไม่มีข้อมูลรายวิชาที่นำมาเทียบ</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default ListMachSubject;
