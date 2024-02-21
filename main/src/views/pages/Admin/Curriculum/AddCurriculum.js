import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { create as createCurriculum } from '../../../../function/curriculum';

const AddCurriculum = () => {
  const [curriculum, setDataCurriculum] = useState({});

  const handleDataChange = (e) => {
    setDataCurriculum({
      ...curriculum,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewData = {
      _id: curriculum._id,
      name: curriculum.name,
      level: 'ปริญญาตรี',
      year: curriculum.year,
      time: curriculum.time,
    };

    try {
      await createCurriculum(NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate('/manage/curriculum');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: error.response.data.message,
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    }
  };

  return (
    <PageContainer title="เพิ่มหลักสูตร | จัดการข้อมูลหลักสูตร" description="จัดการข้อมูลหลักสูตร">
      <Breadcrumb title="จัดการข้อมูลหลักสูตร" />
      <ParentCard title="เพิ่มหลักสูตร">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>รหัสหลักสูตร</CustomFormLabel>
              <CustomTextField
                id="_id"
                name="_id"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 7 } }}
              />

              <CustomFormLabel>ชื่อหลักสูตร</CustomFormLabel>
              <CustomTextField
                id="name"
                name="name"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>หลักสูตรปี พ.ศ</CustomFormLabel>
              <CustomTextField
                id="year"
                name="year"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />
              <CustomFormLabel>ระยะเวลาการศึกษา</CustomFormLabel>
              <CustomTextField
                id="time"
                name="time"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
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
                    component={Link}
                    to={'/manage/curriculum'}
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

export default AddCurriculum;
