import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Swal from 'sweetalert2';

import PageContainer from '../../../components/container/PageContainer';
import ParentCard from '../../../components/shared/ParentCard';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Stack } from '@mui/system';
import { changePassword as changePassword} from '../../../../src/function/student';
import { currentUser } from '../../../function/auth';

const ChangePassStudent = () => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NewData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    
    try {
      console.log(NewData);
      await changePassword(user._id,NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: error.response.data.message,
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    }

  }

  return (
    <PageContainer
      title="เปลี่ยนรหัสผ่าน | จัดการข้อมูลโครงสร้างหลักสูตร"
      description="เปลี่ยนรหัสผ่าน"
    >
      <Breadcrumb title={<>เปลี่ยนรหัสผ่าน</>} />
      <ParentCard title="เปลี่ยนรหัสผ่าน">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>รหัสผ่านเก่า</CustomFormLabel>
              <CustomTextField
                id="oldPassword"
                name="oldPassword"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 10 } }}
                type="password"
              />
              <CustomFormLabel>รหัสผ่านใหม่</CustomFormLabel>
              <CustomTextField
                id="newPassword"
                name="newPassword"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 10 } }}
                type="password"
              />
              <CustomFormLabel>ยืนยันรหัสผ่านใหม่</CustomFormLabel>
              <CustomTextField
                id="confirmPassword"
                name="confirmPassword"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 10 } }}
                type="password"
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
                  <Button type="submit" variant="contained" color="success">
                    บันทึก
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleBack}
                  >
                    ยกเลิก
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

export default ChangePassStudent;
