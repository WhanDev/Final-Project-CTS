import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { read as readStudent, update as updateStudent } from '../../../../function/student';
import { list as ListCurriculum, read as readCurriculum } from '../../../../function/curriculum';

const EditStudent = () => {
  const params = useParams();

  const [dataStudent, setDataStudent] = useState({
    id: '',
    fullname: '',
    password: '',
    curriculum: '',
    year: '',
    institution: '',
    branch: '',
  });

  const loadDataStudent = async (_id) => {
    readStudent(_id).then((res) => {
      setDataStudent(res.data);
    });
  };

  useEffect(() => {
    loadDataStudent(params._id);
  }, [params._id]);

  const handleDataChange = (e) => {
    setDataStudent({
      ...dataStudent,
      [e.target.name]: e.target.value,
    });
  };

  const [dataCurriculumList, setCurriculumList] = useState([]);

  const loadCurriculumsList = async () => {
    try {
      const response = await ListCurriculum();
      const data = response.data;
      setCurriculumList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadCurriculumsList();
  }, []);

  const [curriculum, setCurriculum] = useState('');

  const [dataCurriculum, setDataCurriculum] = useState({
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

  useEffect(() => {
    loadDataCurriculum(dataStudent.curriculum);
  }, [dataStudent.curriculum]);

  const handleCurriculumChange = (e) => {
    setCurriculum(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      password: dataStudent.password,
      fullname: dataStudent.fullname,
      curriculum: curriculum || dataStudent.curriculum,
      year: dataStudent.year,
      institution: dataStudent.institution,
      branch: dataStudent.branch,
    };

    try {
      await updateStudent(params._id, updatedData);
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
      title="แก้ไขข้อมูลนักศึกษา | จัดการข้อมูลนักศึกษา"
      description="แก้ไขข้อมูลนักศึกษา"
    >
      <Breadcrumb
        title={
          <>
            หลักสูตร {dataCurriculum.name} ({dataCurriculum.year}) {dataCurriculum.level}{' '}
            {dataCurriculum.time} ปี รุ่นปี {dataCurriculum.year}
          </>
        }
      />

      <ParentCard title={<>แก้ไขข้อมูลนักศึกษา |</>}>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>ชื่อ-นามสกุล</CustomFormLabel>
              <CustomTextField
                id="fullname"
                name="fullname"
                value={dataStudent.fullname}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
              />

              <CustomFormLabel>รหัสผ่าน</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                type="password"
                value={dataStudent.password}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
              />

              <CustomFormLabel>หลักสูตร</CustomFormLabel>
              <CustomSelect
                labelId="curriculum"
                id="curriculum"
                name="curriculum"
                value={curriculum || dataStudent.curriculum}
                onChange={handleCurriculumChange}
                fullWidth
              >
                {dataCurriculumList.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item._id} | {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomFormLabel>รุ่น</CustomFormLabel>
              <CustomTextField
                id="year"
                name="year"
                value={dataStudent.year}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
              />

              <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
              <CustomTextField
                id="institution"
                name="institution"
                value={dataStudent.institution}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
              />

              <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
              <CustomTextField
                id="branch"
                name="branch"
                value={dataStudent.branch}
                onChange={handleDataChange}
                variant="outlined"
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

export default EditStudent;
