import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { currentUser } from '../../../function/auth';
import { read as readCurriculum } from '../../../function/curriculum';
import { updatedById } from 'src/function/admin';

import Swal from 'sweetalert2';

const StudentProfileEdit = () => {
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
  const handleBack = () => {
    navigate(-1);
  };

  const handleDataChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updated = {
      _id: user._id,
      fullname: user.fullname,
    };
    try {
      await updatedById(updated);
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ',
        text: error.response.data,
      });
      console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล:', error);
    }
  };

  return (
    <PageContainer title="ข้อมูลผู้ใช้ระบบ" description="this is Add officer">
      <Breadcrumb title="ข้อมูลผู้ใช้ระบบ" />
      <ParentCard title="ข้อมูลส่วนตัว">
        <form encType="multipart/form-data" onSubmit={handleSave}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel>รหัสประจำตัว</CustomFormLabel>
              <CustomTextField value={user._id} fullWidth disabled />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel>ชื่อ - นามสกุล</CustomFormLabel>
              <CustomTextField
                value={user.fullname}
                fullWidth
                onChange={handleDataChange}
                name="fullname"
                id="fullname"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel>สิทธิ์ผู้ใช้งาน</CustomFormLabel>
              <CustomTextField value={user.role} fullWidth disabled />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel>สังกัด</CustomFormLabel>
              <CustomTextField
                value={
                  dataCurriculum === '0000000'
                    ? `${dataCurriculum.name} (${dataCurriculum.level} ${dataCurriculum.time} ปี) พ.ศ ${dataCurriculum.year}`
                    : 'ไม่สังกัดหลักสูตรใด'
                }
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="end"
                mt={2}
              >
                <Stack spacing={1} direction="row">
                  <Button variant="outlined" color="warning" onClick={handleBack}>
                    ยกเลิก
                  </Button>
                  <Button type="submit" variant="outlined" color="primary">
                    บันทึก
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </ParentCard>
    </PageContainer>
  );
};

export default StudentProfileEdit;
