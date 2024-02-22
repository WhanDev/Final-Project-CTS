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
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  IconTrash,
  IconEdit,
  IconCirclePlus,
  IconSquarePlus,
  IconEditCircle,
  IconCircleMinus,
  IconArrowBackUp
} from '@tabler/icons';
import Swal from 'sweetalert2';

import ParentCard from '../../../../components/shared/ParentCard';
import ChildCard from '../../../../components/shared/ChildCard';
import DialogSubject from '../Subject/DialogSubject';
import { listByCurriculm, remove as removeByCurriculm } from '../../../../function/structure';
import { listByStructure, remove as removeByStructure } from '../../../../function/subject';

const ListStructure = () => {
  const params = useParams();

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

  useEffect(
    () => {
      loadByCurriculum(params.curriculum);
      loadByStructure(params.structure_id);
    },
    [params.curriculum],
    [params.structure_id],
  );

  const sort = ['1. หมวดวิชาศึกษาทั่วไป', '2. หมวดวิชาเฉพาะ', '3. หมวดวิชาเลือกเสรี'];

  const handleRemoveByCurriculum = async (_id) => {
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
        removeByCurriculm(_id)
          .then((res) => {
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            console.log(res);
            loadByCurriculum(params.curriculum);
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'ลบข้อมูลไม่สำเร็จ',
              text: error.response.data.message,
            });
          });
      }
    });
  };

  const handleRemoveByStructure = async (_id) => {
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
        removeByStructure(_id).then(() => {
          loadByStructure(params.structure_id);
        });
      }
    });
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ParentCard
            title={
              <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconArrowBackUp width={18} />}
                  onClick={handleBack}
                >
                  ย้อนกลับ
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<IconSquarePlus width={18} />}
                  component={Link}
                  to={
                    '/admin/manage/curriculum/' +
                    params.curriculum +
                    '/structure/' +
                    params.structure_id +
                    '/add'
                  }
                >
                  เพิ่มกลุ่มวิชา
                </Button>
              </Stack>
            }
          >
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
                              <Box>
                                <IconButton
                                  component={Link}
                                  to={
                                    '/admin/manage/curriculum/' +
                                    item.curriculum +
                                    '/structure/' +
                                    item.structure_id +
                                    '/edit/' +
                                    item._id
                                  }
                                >
                                  <IconEdit size="18" />
                                </IconButton>
                                <IconButton onClick={() => handleRemoveByCurriculum(item._id)}>
                                  <IconTrash size="18" />
                                </IconButton>
                              </Box>
                            </Stack>

                            <Table>
                              <TableHead>
                                <TableCell width={'15%'} align="center">
                                  <Typography variant="h6">รหัสวิชา</Typography>
                                </TableCell>
                                <TableCell width={'30%'}>
                                  <Typography variant="h6">ชื่อวิชา</Typography>
                                </TableCell>
                                <TableCell width={'5%'} align="center">
                                  <Typography variant="h6">ทฤษฎี</Typography>
                                </TableCell>
                                <TableCell width={'5%'} align="center">
                                  <Typography variant="h6">ปฏิบัติ</Typography>
                                </TableCell>
                                <TableCell width={'10%'} align="center">
                                  <Typography variant="h6">หน่วยกิตรวม</Typography>
                                </TableCell>
                                <TableCell width={'15%'} align="center">
                                  <IconButton
                                    component={Link}
                                    to={
                                      '/admin/manage/curriculum/' +
                                      item.curriculum +
                                      '/structure/' +
                                      item.structure_id +
                                      '/group/' +
                                      item.group_id +
                                      '/subject/add'
                                    }
                                    color="info"
                                  >
                                    <IconCirclePlus size="18" />
                                    <Typography marginLeft={1}>เพิ่มรายวิชา</Typography>
                                  </IconButton>
                                </TableCell>
                              </TableHead>

                              {subject.map((subjectItem) => {
                                if (subjectItem.group_id === item.group_id) {
                                  return (
                                    <TableBody key={subjectItem._id}>
                                      <TableCell width={'15%'} align="center">
                                        {subjectItem.subject_id}
                                      </TableCell>
                                      <TableCell width={'30%'}>
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
                                      <TableCell width={'10%'} align="center">
                                        {subjectItem.total_credits}
                                      </TableCell>
                                      <TableCell width={'15%'} align="center">
                                        <DialogSubject _id={subjectItem._id} />
                                        <IconButton
                                          component={Link}
                                          to={
                                            '/admin/manage/curriculum/' +
                                            item.curriculum +
                                            '/structure/' +
                                            item.structure_id +
                                            '/group/' +
                                            item.group_id +
                                            '/subject/edit/' +
                                            subjectItem._id
                                          }
                                          color="warning"
                                        >
                                          <IconEditCircle size="18" />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => handleRemoveByStructure(subjectItem._id)}
                                          color="error"
                                        >
                                          <IconCircleMinus size="18" />
                                        </IconButton>
                                      </TableCell>
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

export default ListStructure;
