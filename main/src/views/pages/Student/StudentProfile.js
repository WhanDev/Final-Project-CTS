import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { currentUser } from '../../../function/auth';
import { read as readCurriculum } from '../../../function/curriculum';

const StudentProfile = () => {
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

  const curriculum_id = user.curriculum;

  const [dataCurriculum, setDataCurriculum] = useState({});

  const loadDataCurriculum = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadDataCurriculum(curriculum_id);
  }, [curriculum_id]);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/student/profile/edit');
  };

  return (
    <PageContainer title="ข้อมูลนักศึกษา" description="this is Add Admin">
      <Breadcrumb title="ข้อมูลนักศึกษา" />
      <ParentCard title="ข้อมูลนักศึกษา">
        <Grid container>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
            <Typography>{user._id}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
            <Typography>{user.fullname}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>หลักสูตร</CustomFormLabel>
            <Typography>
              {dataCurriculum
                ? `${dataCurriculum.name} (${dataCurriculum.level} ${dataCurriculum.time} ปี) พ.ศ ${dataCurriculum.year}`
                : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รุ่นปี</CustomFormLabel>
            <Typography>{user.year}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
            <Typography>{user.institution}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
            <Typography>{user.branch}</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>การเทียบโอน</CustomFormLabel>
            <Typography>{user.status}</Typography>
          </Grid>

          <Grid item xs={12} sm={12} lg={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
              <Stack spacing={1} direction="row">
                <Button variant="outlined" color="warning" onClick={handleEdit}>
                  แก้ไข
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default StudentProfile;
