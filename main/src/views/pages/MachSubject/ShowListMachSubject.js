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
  TableContainer,
  Container
} from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import { read as ReadCurriculum } from '../../../function/curriculum';
import { listByCurriculum as AllMachsubject } from '../../../function/machsubject';
import { list as AllMachsubjectList } from '../../../function/machsubjectlist';
import { listByStructure as AllSubject } from '../../../function/subject';
import { list as AllExtraSubject } from '../../../function/extar-subject';

const ShowListMachSubject = () => {
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

  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <Container maxWidth="lg">
      <Breadcrumb
        title={
          <>
            คู่เทียบโอน หลักสูตร {Curriculum.name} ({Curriculum.year}) {Curriculum.level}{' '}
            {Curriculum.time} ปี
          </>
        }
      />
      <ChildCard>
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
                        <TableCell
                          width={'50%'}
                          sx={{ px: 0, mx: 0, border: '1px solid #ddd', verticalAlign: 'top' }}
                        >
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
                                    </TableRow>
                                  </>
                                );
                              }
                              return (
                                <TableRow>
                                  <TableCell colSpan={3}>
                                    <Typography align="center">
                                      ไม่มีข้อมูลรายวิชาที่นำมาเทียบ 2
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3}>
                                <Typography align="center">
                                  ไม่มีข้อมูลรายวิชาที่นำมาเทียบ 1
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )}
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
      </Container>
    </PageContainer>
  );
};

export default ShowListMachSubject;
