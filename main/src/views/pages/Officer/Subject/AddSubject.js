import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { create } from '../../../../function/subject';
import { listByGroup } from '../../../../function/structure';

const AddSubject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [dataByGroup, setDataByGroup] = useState({});

  const loadByGroup = async (group_id) => {
    try {
      const res = await listByGroup(group_id);
      const data = res.data;
      setDataByGroup(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadByGroup(params.group_id);
  }, [params.group_id]);

  console.log(dataByGroup);

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewData = {
      structure_id: params.structure_id,
      group_id: params.group_id,
      subject_id: data.subject_id,
      subject_nameTh: data.subject_nameTh,
      subject_nameEn: data.subject_nameEn,
      description: data.description,
      theory_credits: Math.floor(parseInt(data.theory_credits, 10)),
      practical_credits: Math.floor(parseInt(data.practical_credits, 10)),
    };

    try {
      await create(NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: error.response.data,
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="เพิ่มข้อมูลรายวิชา | จัดการข้อมูลรายวิชา"
      description="จัดการข้อมูลรายวิชา"
    >
      <Breadcrumb title={
          <>
            {dataByGroup.sort}
            <Typography variant='h6' fontWeight={400} mt={1}>
            {dataByGroup.group_id} {dataByGroup.group_name} ({dataByGroup.credit} หน่วยกิต)
            </Typography>
          </>
        } />
      <ParentCard
      title='เพิ่มข้อมูลรายวิชา'
        
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>รหัสวิชา</CustomFormLabel>
              <CustomTextField
                id="subject_id"
                name="subject_id"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาภาษาไทย (TH)</CustomFormLabel>
              <CustomTextField
                id="subject_nameTh"
                name="subject_nameTh"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาภาษาอังกฤษ (EN)</CustomFormLabel>
              <CustomTextField
                id="subject_nameEn"
                name="subject_nameEn"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>คำอธิบายรายวิชา</CustomFormLabel>
              <CustomTextField
                id="description"
                name="description"
                variant="outlined"
                onChange={handleDataChange}
                rows={2}
                multiline
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตทฤษฎี</CustomFormLabel>
              <CustomTextField
                id="theory_credits"
                name="theory_credits"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตปฏิบัติ</CustomFormLabel>
              <CustomTextField
                id="practical_credits"
                name="practical_credits"
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
                    onClick={handleBack}
                  >
                    ย้อนกลับ
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

export default AddSubject;
