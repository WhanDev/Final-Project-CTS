import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import {
  read as readCurriculum,
  update as updateCurriculum,
} from '../../../../function/curriculum';
const EditCurriculum = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [curriculum, setDataCurriculum] = useState({
    id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  const loadData = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadData(params._id);
  }, [params._id]);

  const handleDataChange = (e) => {
    setDataCurriculum({
      ...curriculum,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: curriculum.name,
      level: curriculum.level,
      year: curriculum.year,
      time: curriculum.time,
    };

    try {
      await updateCurriculum(params._id, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });
      navigate('/manage/curriculum');
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
    <PageContainer title="จัดการข้อมูลหลักสูตร" description="จัดการข้อมูลหลักสูตร">
      <Breadcrumb title="จัดการข้อมูลหลักสูตร" />

      <ParentCard
        title={
          <>
            แก้ไขข้อมูลหลักสูตร | {curriculum._id} - {curriculum.name}
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>ชื่อหลักสูตร</CustomFormLabel>
              <CustomTextField
                id="name"
                name="name"
                value={curriculum.name}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>หลักสูตรปี พ.ศ</CustomFormLabel>
              <CustomTextField
                id="year"
                name="year"
                value={curriculum.year}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>ระยะเวลาการศึกษา</CustomFormLabel>
              <CustomTextField
                id="time"
                name="time"
                value={curriculum.time}
                variant="outlined"
                onChange={handleDataChange}
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

export default EditCurriculum;
