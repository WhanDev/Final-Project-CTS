import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  Grid,
  Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  IconArrowBackUp,
} from '@tabler/icons';

import ParentCard from '../../../components/shared/ParentCard';
import ChildCard from '../../../components/shared/ChildCard';
import DialogSubject from './DialogSubject';
import { listByCurriculm } from '../../../function/structure';
import { listByStructure } from '../../../function/subject';

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
    []
  );

  const sort = ['1. หมวดวิชาศึกษาทั่วไป', '2. หมวดวิชาเฉพาะ', '3. หมวดวิชาเลือกเสรี'];

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
              <Stack
                spacing={1}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
              >
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconArrowBackUp width={18} />}
                  onClick={handleBack}
                >
                  ย้อนกลับ
                </Button>
                <Button variant="outlined" color="success" to="/test" component={Link}>
                  ทดลองเทียบโอน
                </Button>
              </Stack>
            }
          >
            {sort.map((category) => (
              <React.Fragment key={category}>
                {/* ชื่อหมวด */}
                <Typography variant="h5" marginBottom={1}>
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
                                <TableCell width={'5%'} />
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
                                      <TableCell width={'5%'} align="center">
                                        <DialogSubject _id={subjectItem._id} />
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
