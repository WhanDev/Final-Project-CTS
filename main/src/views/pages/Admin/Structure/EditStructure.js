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

import { read as readStructure, update as updateStructure } from '../../../../function/structure';
import { read as readCurriculum } from '../../../../function/curriculum';

const EditStructure = () => {
  const params = useParams();

  const [structure, setDataStructure] = useState({
    _id: '',
    structure_id: '',
    sort: '',
    group_id: '',
    group_name: '',
    credit: '',
    curriculum: '',
  });

  const loadDataStructure = async (_id) => {
    readStructure(_id).then((res) => {
      setDataStructure(res.data);
    });
  };

  const [curriculum, setDataCurriculum] = useState({
    _id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  const loadDataCurriculum = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(
    () => {
      loadDataStructure(params._id);
      loadDataCurriculum(params.curriculum);
    },
    [params._id],
    [params.curriculum],
  );

  const handleDataChange = (e) => {
    setDataStructure({
      ...structure,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      sort: structure.sort,
      group_id: structure.group_id,
      group_name: structure.group_name,
      credit: structure.credit,
      curriculum: structure.curriculum,
    };

    try {
      await updateStructure(params._id, updatedData);
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="แก้ไขข้อมูลกลุ่มวิชา | จัดการข้อมูลโครงสร้างหลักสูตร"
      description="แก้ไขข้อมูลกลุ่มวิชา"
    >
      <Breadcrumb title={<>แก้ไขข้อมูลกลุ่มวิชา</>} />

      <ParentCard
        title={
          <>
            หลักสูตร {curriculum.name} ({curriculum.year}) {curriculum.level} {curriculum.time} ปี
            <br />
            {structure.sort}
            <br />
            {structure.group_id} {structure.group_name} ({structure.credit} หน่วยกิต)
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>ชื่อกลุ่มวิชา</CustomFormLabel>
              <CustomTextField
                id="group_name"
                name="group_name"
                value={structure.group_name}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>หน่วยกิต</CustomFormLabel>
              <CustomTextField
                id="credit"
                name="credit"
                value={structure.credit}
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

export default EditStructure;
