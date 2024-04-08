import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { create as createExtraSubject } from '../../../../function/extar-subject';
import { currentUser } from '../../../../function/auth';

const ExtraSubject = () => {
  const navigate = useNavigate();

  const [extraSubject, setDataExtraSubject] = useState({});

  const handleDataChange = (e) => {
    setDataExtraSubject({
      ...extraSubject,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewData = {
      extraSubject_id: extraSubject.extraSubject_id,
      extraSubject_nameTh: extraSubject.extraSubject_nameTh,
      extraSubject_nameEn: extraSubject.extraSubject_nameEn,
      description: extraSubject.description,
      theory_credits: Math.floor(parseInt(extraSubject.theory_credits, 10)),
      practical_credits: Math.floor(parseInt(extraSubject.practical_credits, 10)),
      createBy: user.curriculum
    };

    try {
      // console.log(NewData);
      await createExtraSubject(NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="จัดการข้อมูลรายวิชานอกหลักสูตร"
      description="จัดการข้อมูลรายวิชานอกหลักสูตร"
    >
      <Breadcrumb title={'จัดการข้อมูลรายวิชานอกหลักสูตร'} />
      <ParentCard title="เพิ่มรายวิชานอกหลักสูตร">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>รหัสวิชา</CustomFormLabel>
              <CustomTextField
                id="extraSubject_id"
                name="extraSubject_id"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาภาษาไทย (Th)</CustomFormLabel>
              <CustomTextField
                id="extraSubject_nameTh"
                name="extraSubject_nameTh"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาภาษาอังกฤษ (EN)</CustomFormLabel>
              <CustomTextField
                id="extraSubject_nameEn"
                name="extraSubject_nameEn"
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
                  <Button variant="outlined" color="warning" onClick={handleBack}>
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
