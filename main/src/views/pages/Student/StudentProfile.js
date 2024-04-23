import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
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

  const [dataCurriculum, setDataCurriculum] = useState({
  });

  const loadDataCurriculum = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadDataCurriculum(curriculum_id);
  }, [curriculum_id]);

  const strCurriculum = dataCurriculum._id + ' | '+ dataCurriculum.name + ' (' + dataCurriculum.level +' ' + dataCurriculum.time + ' ปี) ' + dataCurriculum.year

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="ข้อมูลนักศึกษา" description="this is Add Admin">
      <Breadcrumb title="ข้อมูลนักศึกษา" />
      <ParentCard title="ข้อมูลนักศึกษา">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
            <CustomTextField value={user._id} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>ชื่อนามสกุล</CustomFormLabel>
            <CustomTextField value={user.fullname} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>หลักสูตร</CustomFormLabel>
            <CustomTextField value={strCurriculum} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>รุ่นปี</CustomFormLabel>
            <CustomTextField value={user.year} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
            <CustomTextField value={user.institution} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
            <CustomTextField value={user.branch} fullWidth />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel>การเทียบโอน</CustomFormLabel>
            <CustomTextField value={user.status} fullWidth />
          </Grid>
          {/* <Grid item xs={12} sm={12} lg={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" mt={2}>
              <Stack spacing={1} direction="row">
                <Button type="submit" variant="contained" color="success">
                  บันทึก
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    handleBack();
                  }}
                >
                  ยกเลิก
                </Button>
              </Stack>
            </Stack>
          </Grid> */}
        </Grid>
        
      </ParentCard>
    </PageContainer>
  );
};

export default StudentProfile;
