import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Grid, MenuItem, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { create as createStructure } from '../../../../function/structure';
import { read as readCurriculum } from '../../../../function/curriculum';

const AddStructure = () => {
  const params = useParams();

  const [curriculum, setDataCurriculum] = useState({
    _id: '',
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
    loadData(params.curriculum);
  }, [params.curriculum]);

  const [data, setData] = useState({});

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [sort, setSort] = React.useState('');
  const sorts = [
    {
      name: '1. หมวดวิชาศึกษาทั่วไป',
    },
    {
      name: '2. หมวดวิชาเฉพาะ',
    },
    {
      name: '3. หมวดวิชาเลือกเสรี',
    },
  ];

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewData = {
      structure_id: params.structure_id,
      sort: sort,
      group_id: data.group_id,
      group_name: data.group_name,
      credit: data.credit,
      curriculum: params.curriculum,
    };

    try {
      console.log(NewData);
      await createStructure(NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate('/manage/curriculum/' + params.curriculum + '/structure/' + params.structure_id);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: error.response.data,
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    }
  };

  return (
    <PageContainer
      title="เพิ่มข้อมูลกลุ่มวิชา | จัดการข้อมูลโครงสร้างหลักสูตร"
      description="แก้ไขข้อมูลกลุ่มวิชา"
    >
      <Breadcrumb title={<>เพิ่มกลุ่มวิชา</>} />

      <ParentCard
        title={
          <>
            หลักสูตร {curriculum.name} ({curriculum.year}) {curriculum.level} {curriculum.time} ปี
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>หมวดวิชา</CustomFormLabel>
              <CustomSelect
                labelId="sort"
                id="sort"
                name="sort"
                value={sort}
                onChange={handleSortChange}
                required
                fullWidth
              >
                {sorts.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomFormLabel>รหัสกลุ่มวิชา</CustomFormLabel>
              <CustomTextField
                id="group_id"
                name="group_id"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 3 } }}
              />
              <CustomFormLabel>ชื่อกลุ่มวิชา</CustomFormLabel>
              <CustomTextField
                id="group_name"
                name="group_name"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>หน่วยกิต</CustomFormLabel>
              <CustomTextField
                id="credit"
                name="credit"
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

export default AddStructure;
