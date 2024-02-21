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

import { read, update } from '../../../../function/subject';
import { listByGroup } from '../../../../function/structure';

const EditSubject = () => {
  const params = useParams();
  const navigate = useNavigate();

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

  const [data, setData] = useState({
    structure_id: '',
    group_id: '',
    subject_id: '',
    subject_nameTh: '',
    subject_nameEn: '',
    description: '',
    theory_credits: '',
    practical_credits: '',
  });

  const loadData = async (_id) => {
    read(_id).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    loadData(params._id);
  }, [params._id]);

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      structure_id: params.structure_id,
      group_id: params.group_id,
      subject_id: data.subject_id,
      subject_nameTh: data.subject_nameTh,
      subject_nameEn: data.subject_nameEn,
      description: data.description,
      theory_credits: Math.floor(parseInt(data.theory_credits, 10)),
      practical_credits: Math.floor(parseInt(data.practical_credits, 10)),
      total_credits:
        Math.floor(parseInt(data.theory_credits, 10)) +
        Math.floor(parseInt(data.practical_credits, 10)),
    };

    try {
      // console.log(updatedData);
      await update(params._id, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });
      navigate('/manage/curriculum/' + params.curriculum + '/structure/' + params.structure_id);
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
    <PageContainer
      title="แก้ไขข้อมูลรายวิชา | จัดการข้อมูลรายวิชา"
      description="จัดการข้อมูลรายวิชา"
    >
      <Breadcrumb title={<>วิชา {data.subject_id} {data.subject_nameTh}</>} />

      <ParentCard
        title={
          <>
            {dataByGroup.sort} <br /> {dataByGroup.group_id} {dataByGroup.group_name} (
            {dataByGroup.credit} หน่วยกิต)
            <br />
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              {/* <CustomFormLabel>รหัสวิชา</CustomFormLabel>
              <CustomTextField
                id="subject_id"
                name="subject_id"
                value={data.subject_id}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              /> */}

              <CustomFormLabel>ชื่อวิชาภาษาไทย (TH)</CustomFormLabel>
              <CustomTextField
                id="subject_name"
                name="subject_name"
                value={data.subject_nameTh}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>ชื่อวิชาอังกฤษ (EN)</CustomFormLabel>
              <CustomTextField
                id="subject_nameEn"
                name="subject_nameEn"
                value={data.subject_nameEn}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>คำอธิบายรายวิชา</CustomFormLabel>
              <CustomTextField
                id="description"
                name="description"
                variant="outlined"
                value={data.description}
                onChange={handleDataChange}
                rows={2}
                multiline
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตทฤษฎี</CustomFormLabel>
              <CustomTextField
                id="theory_credits"
                name="theory_credits"
                value={data.theory_credits}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>หน่วยกิตปฏิบัติ</CustomFormLabel>
              <CustomTextField
                id="practical_credits"
                name="practical_credits"
                value={data.practical_credits}
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
                    to={
                      '/manage/curriculum/' +
                      params.curriculum +
                      '/structure/' +
                      params.structure_id
                    }
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

export default EditSubject;
