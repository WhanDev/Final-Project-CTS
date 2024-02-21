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

import { read as readExtraSubject, update as updateExtraSubject } from '../../../../function/extar-subject';

const ExtraSubject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [extraSubject, setDataExtraSubject] = useState({
    extraSubject_id: '',
    extraSubject_nameTh: '',
    extraSubject_nameEn: '',
    description: '',
    theory_credits: '',
    practical_credits: '',
  });

  const loadDataExtraSubject = async (_id) => {
    readExtraSubject(_id).then((res) => {
      setDataExtraSubject(res.data);
    });
  };

  useEffect(() => {
    loadDataExtraSubject(params._id);
  }, [params._id]);

  const handleDataChange = (e) => {
    loadDataExtraSubject({
      ...extraSubject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      extraSubject_id: extraSubject.extraSubject_id,
      extraSubject_name: extraSubject.extraSubject_name,
      description: extraSubject.description,
      theory_credits: Math.floor(parseInt(extraSubject.theory_credits, 10)),
      practical_credits: Math.floor(parseInt(extraSubject.practical_credits, 10)),
      total_credits:
        Math.floor(parseInt(extraSubject.theory_credits, 10)) +
        Math.floor(parseInt(extraSubject.practical_credits, 10)),
    };

    try {
      await updateExtraSubject(params._id, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });
      navigate('/manage/extrasubject/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ',
      });
      console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล:', error);
    }
  };

  return (
    <PageContainer
      title="จัดการข้อมูลรายวิชานอกหลักสูตร"
      description="จัดการข้อมูลรายวิชานอกหลักสูตร"
    >
      <Breadcrumb title={'จัดการข้อมูลรายวิชานอกหลักสูตร '} />

      <ParentCard
        title={
          <>
            แก้ไขรายวิชานอกหลักสูตร | {extraSubject.extraSubject_id} {extraSubject.extraSubject_nameTh}
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              {/* <CustomFormLabel>รหัสวิชา</CustomFormLabel>
              <CustomTextField
                id="extraSubject_id"
                name="extraSubject_id"
                value={data.extraSubject_id}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              /> */}

              <CustomFormLabel>ชื่อวิชาภาษาไทย (TH)</CustomFormLabel>
              <CustomTextField
                id="extraSubject_nameTh"
                name="extraSubject_nameTh"
                value={extraSubject.extraSubject_nameTh}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาอังกฤษ (EN)</CustomFormLabel>
              <CustomTextField
                id="extraSubject_nameEn"
                name="extraSubject_nameEn"
                value={extraSubject.extraSubject_nameEn}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>คำอธิบายรายวิชา</CustomFormLabel>
              <CustomTextField
                id="description"
                name="description"
                variant="outlined"
                value={extraSubject.description}
                onChange={handleDataChange}
                rows={2}
                multiline
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตทฤษฎี</CustomFormLabel>
              <CustomTextField
                id="theory_credits"
                name="theory_credits"
                value={extraSubject.theory_credits}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตปฏิบัติ</CustomFormLabel>
              <CustomTextField
                id="practical_credits"
                name="practical_credits"
                value={extraSubject.practical_credits}
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
                    to={'/manage/extrasubject/'}
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

export default ExtraSubject;
