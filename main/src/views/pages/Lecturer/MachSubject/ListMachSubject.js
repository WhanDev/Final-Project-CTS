import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Grid,
  Button,
  TableRow,
  Collapse,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  IconCirclePlus,
  IconEditCircle,
  IconCircleMinus,
  IconArrowBackUp,
  IconArrowRightCircle,
} from '@tabler/icons';
import Swal from 'sweetalert2';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../../components/shared/ParentCard';
import ChildCard from '../../../../components/shared/ChildCard';
import DialogSubject from '../Subject/DialogSubject';
import { listByCurriculm } from '../../../../function/structure';
import { listByStructure } from '../../../../function/subject';
import { listByCurriculum as AllMachsubject } from '../../../../function/machsubject';
import {
  list as AllMachsubjectList,
  remove as RemoveMachSubjectList,
} from '../../../../function/machsubjectlist';
import { list as AllExtraSubject } from '../../../../function/extar-subject';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { currentUser } from '../../../../function/auth';

const ListMachSubject = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  const curriculum_id = user.curriculum;
  const structure_id = 'CS-' + curriculum_id;

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

  const [curriculum, setDataCurriculum] = useState([]);

  const loadByCurriculum = async (curriculum) => {
    try {
      const res = await listByCurriculm(curriculum);
      setDataCurriculum(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [subject, setDataSubject] = useState([]);

  const loadByStructure = async (structure_id) => {
    try {
      const res = await listByStructure(structure_id);
      const data = res.data;
      setDataSubject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sort = ['1. หมวดวิชาศึกษาทั่วไป', '2. หมวดวิชาเฉพาะ', '3. หมวดวิชาเลือกเสรี'];

  const [open, setOpen] = useState({});

  const [machSubject, setMachSubject] = useState([]);

  const loadDataMachsubject = async (_id) => {
    AllMachsubject(_id)
      .then((res) => setMachSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [machSubjectList, setMachSubjectList] = useState([]);

  const loadDataAllMachsubjectList = async () => {
    AllMachsubjectList()
      .then((res) => setMachSubjectList(res.data))
      .catch((err) => console.log(err));
  };

  const [extraSubject, setExtraSubject] = useState([]);

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
          loadDataAllMachsubjectList();
          loadDataAllExtraSubject();
        });
      }
    });
  };

  useEffect(
    () => {
      loadByCurriculum(curriculum_id);
      loadByStructure(structure_id);
      loadDataMachsubject(curriculum_id);
      loadDataAllMachsubjectList();
      loadDataAllExtraSubject();
    },
    [curriculum_id],
    [structure_id],
    [curriculum_id],
    [],
  );

  return (
    <>
      <Breadcrumb title="จัดการคู่เทียบโอนรายวิชา" />
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ParentCard>
            {sort.map((category) => (
              <React.Fragment key={category}>
                {/* ชื่อหมวด */}
                <Typography variant="h5" marginBottom={1} marginTop={3}>
                  {category}
                </Typography>
                {curriculum.length > 0 ? (
                  // กลุ่ม
                  curriculum
                    .filter((item) => item.sort === category)
                    .map((item, index) => (
                      <Grid container spacing={3} marginBottom={2} key={index}>
                        <Grid item sm={12}>
                          <ChildCard>
                            <Stack
                              spacing={1}
                              direction={{ xs: 'column', sm: 'row' }}
                              justifyContent="space-between"
                            >
                              <Box>
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                  fontSize={18}
                                  marginTop={1}
                                >
                                  {item.group_id} {item.group_name} {item.credit} หน่วยกิต
                                </Typography>
                              </Box>
                            </Stack>

                            <Table>
                              <TableHead>
                                <TableCell style={{ width: '5%' }} />
                                <TableCell style={{ width: '15%' }} align="center">
                                  <Typography variant="h6">รหัสวิชา</Typography>
                                </TableCell>
                                <TableCell style={{ width: '40%' }}>
                                  <Typography variant="h6">ชื่อวิชา</Typography>
                                </TableCell>
                                <TableCell style={{ width: '5%' }} align="center">
                                  <Typography variant="h6">ทฤษฎี</Typography>
                                </TableCell>
                                <TableCell style={{ width: '5%' }} align="center">
                                  <Typography variant="h6">ปฏิบัติ</Typography>
                                </TableCell>
                                <TableCell style={{ width: '15%' }} align="center">
                                  <Typography variant="h6">หน่วยกิตรวม</Typography>
                                </TableCell>
                                <TableCell style={{ width: '10%' }} align="center">
                                  <Typography variant="h6">เพิ่มเติม</Typography>
                                </TableCell>
                              </TableHead>

                              {subject.map((subjectItem) => {
                                if (subjectItem.group_id === item.group_id) {
                                  return (
                                    <TableBody key={subjectItem._id}>
                                      <TableRow>
                                        <TableCell width={'5%'} align="center">
                                          <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                              setOpen({
                                                ...open,
                                                [subjectItem._id]: !open[subjectItem._id],
                                              })
                                            }
                                          >
                                            {open[subjectItem._id] ? (
                                              <KeyboardArrowUpIcon />
                                            ) : (
                                              <KeyboardArrowDownIcon />
                                            )}
                                          </IconButton>
                                        </TableCell>
                                        <TableCell width={'15%'} align="center">
                                          {subjectItem.subject_id}
                                        </TableCell>
                                        <TableCell width={'40%'}>
                                          {subjectItem.subject_nameTh}
                                          <br />
                                          <Typography color="primary">
                                            ({subjectItem.subject_nameEn})
                                          </Typography>
                                        </TableCell>
                                        <TableCell width={'5%'} align="center">
                                          {subjectItem.theory_credits}
                                        </TableCell>
                                        <TableCell width={'5%'} align="center">
                                          {subjectItem.practical_credits}
                                        </TableCell>
                                        <TableCell width={'15%'} align="center">
                                          {subjectItem.total_credits}
                                        </TableCell>
                                        <TableCell width={'10%'} align="center">
                                          <DialogSubject _id={subjectItem._id} />
                                        </TableCell>
                                      </TableRow>

                                      <TableRow>
                                        <TableCell colSpan={7} sx={{ paddingX: 0 }}>
                                          <Collapse
                                            in={open[subjectItem._id]}
                                            timeout="auto"
                                            unmountOnExit
                                          >
                                            <Typography
                                              gutterBottom
                                              variant="h6"
                                              sx={{
                                                backgroundColor: (theme) => '#bdbdbd',
                                                p: '5px 15px',
                                                color: (theme) =>
                                                  `${
                                                    theme.palette.mode === 'dark'
                                                      ? theme.palette.grey.A200
                                                      : 'rgba(0, 0, 0, 0.87)'
                                                  }`,
                                              }}
                                            >
                                              รายวิชาที่นำมาเทียบได้
                                            </Typography>

                                            {machSubject
                                              .filter(
                                                (machSub) =>
                                                  machSub.subject_id === subjectItem.subject_id,
                                              )
                                              .map((matchedMachSubject) => (
                                                <Table
                                                  style={{ backgroundColor: '#eeeeee' }}
                                                  key={matchedMachSubject._id}
                                                >
                                                  {machSubjectList
                                                    .filter(
                                                      (machSubList) =>
                                                        machSubList.machSubject_id ===
                                                        matchedMachSubject._id,
                                                    )
                                                    .map((matchedMachSubjectList, index) => (
                                                      <TableRow
                                                        key={matchedMachSubjectList._id}
                                                        style={{
                                                          backgroundColor:
                                                            index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                                                        }}
                                                      >
                                                        <Stack
                                                          direction="row"
                                                          justifyContent="space-between"
                                                          alignItems="center"
                                                        >
                                                          <TableCell align="center" width={'5%'}>
                                                            <IconButton color="info">
                                                              <IconArrowRightCircle size="23" />
                                                            </IconButton>
                                                          </TableCell>
                                                          <TableCell align="center" width={'85%'}>
                                                            {matchedMachSubjectList.extraSubject_id.map(
                                                              (extraSub) => (
                                                                <React.Fragment key={extraSub}>
                                                                  {extraSubject.map((extra) =>
                                                                    extra.extraSubject_id ===
                                                                    extraSub ? (
                                                                      <Stack
                                                                        direction="row"
                                                                        justifyContent="space-between"
                                                                        alignItems="center"
                                                                        key={extra.extraSubject_id}
                                                                        sx={{
                                                                          marginX: 0,
                                                                          paddingX: 0,
                                                                        }}
                                                                      >
                                                                        <TableCell
                                                                          style={{ width: '15%' }}
                                                                          align="center"
                                                                        >
                                                                          {extra.extraSubject_id}
                                                                        </TableCell>
                                                                        <TableCell
                                                                          style={{ width: '50%' }}
                                                                        >
                                                                          {
                                                                            extra.extraSubject_nameTh
                                                                          }
                                                                          <br />
                                                                          <Typography color="primary">
                                                                            (
                                                                            {
                                                                              extra.extraSubject_nameEn
                                                                            }
                                                                            )
                                                                          </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                          style={{ width: '5%' }}
                                                                          align="center"
                                                                        >
                                                                          {extra.theory_credits}
                                                                        </TableCell>
                                                                        <TableCell
                                                                          style={{ width: '5%' }}
                                                                          align="center"
                                                                        >
                                                                          {extra.practical_credits}
                                                                        </TableCell>
                                                                        <TableCell
                                                                          style={{ width: '15%' }}
                                                                          align="center"
                                                                        >
                                                                          {extra.total_credits}
                                                                        </TableCell>
                                                                      </Stack>
                                                                    ) : null,
                                                                  )}
                                                                </React.Fragment>
                                                              ),
                                                            )}
                                                          </TableCell>
                                                          <TableCell width={'10%'} align="center">
                                                            <IconButton
                                                              color="info"
                                                              component={Link}
                                                              to={
                                                                '/lecturer/manage/machsubject/curriculum/' +
                                                                curriculum_id +
                                                                '/structure/' +
                                                                structure_id +
                                                                '/' +
                                                                subjectItem.subject_id +
                                                                '/' +
                                                                matchedMachSubjectList._id +
                                                                '/edit'
                                                              }
                                                            >
                                                              <IconEditCircle size="23" />
                                                            </IconButton>
                                                            <IconButton
                                                              color="error"
                                                              onClick={() =>
                                                                handleRemoveMachSubjectList(
                                                                  matchedMachSubjectList._id,
                                                                )
                                                              }
                                                            >
                                                              <IconCircleMinus size="23" />
                                                            </IconButton>
                                                          </TableCell>
                                                        </Stack>
                                                      </TableRow>
                                                    ))}
                                                  <TableRow style={{ backgroundColor: '#bdbdbd' }}>
                                                    <TableCell
                                                      width={'100%'}
                                                      align="center"
                                                      colSpan={6}
                                                    >
                                                      <Typography
                                                        variant="normal"
                                                        fontWeight={600}
                                                        fontSize={20}
                                                      >
                                                        เพิ่มรายการคู่เทียบโอน
                                                      </Typography>
                                                      <IconButton
                                                        color="info"
                                                        component={Link}
                                                        to={
                                                          '/lecturer/manage/machsubject/curriculum/' +
                                                          curriculum_id +
                                                          '/structure/' +
                                                          structure_id +
                                                          '/' +
                                                          subjectItem.subject_id +
                                                          '/add'
                                                        }
                                                      >
                                                        <IconCirclePlus size="23" />
                                                      </IconButton>
                                                    </TableCell>
                                                  </TableRow>
                                                </Table>
                                              ))}

                                            {machSubject.every(
                                              (machSub) =>
                                                machSub.subject_id !== subjectItem.subject_id,
                                            ) && (
                                              <Table>
                                                <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                                  <TableCell
                                                    width={'100%'}
                                                    align="center"
                                                    colSpan={6}
                                                  >
                                                    <Typography
                                                      variant="normal"
                                                      fontWeight={600}
                                                      fontSize={20}
                                                    >
                                                      เพิ่มรายการคู่เทียบโอน
                                                    </Typography>
                                                    <IconButton
                                                      color="info"
                                                      component={Link}
                                                      to={
                                                        '/lecturer/manage/machsubject/curriculum/' +
                                                        curriculum_id +
                                                        '/structure/' +
                                                        structure_id +
                                                        '/' +
                                                        subjectItem.subject_id +
                                                        '/add'
                                                      }
                                                    >
                                                      <IconCirclePlus size="23" />
                                                    </IconButton>
                                                  </TableCell>
                                                </TableRow>
                                              </Table>
                                            )}
                                          </Collapse>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  );
                                }
                                return null;
                              })}
                            </Table>
                            {subject.every(
                              (subjectItem) => subjectItem.group_id !== item.group_id,
                            ) && (
                              <Typography align="center" marginTop={3}>
                                ไม่มีรายวิชาในโครงสร้างหลักสูตร
                              </Typography>
                            )}
                          </ChildCard>
                        </Grid>
                      </Grid>
                    ))
                ) : (
                  <>
                    <ChildCard>
                      <Stack
                        spacing={1}
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography align="center">ไม่มีกลุ่มวิชาในโครงสร้างหลักสูตร</Typography>
                        </Box>
                      </Stack>
                    </ChildCard>
                  </>
                )}
              </React.Fragment>
            ))}
          </ParentCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ListMachSubject;
