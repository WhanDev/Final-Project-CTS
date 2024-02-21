import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { create as createStudent } from '../../../../function/student';
import { list as lsitCurriculum } from '../../../../function/curriculum';

const AddStudent = () => {

  const [dataStudent, setDataStudent] = useState({});

  const handleDataChange = (e) => {
    setDataStudent({
      ...dataStudent,
      [e.target.name]: e.target.value,
    });
  };

  const [curriculum, setCurriculum] = useState('');

  const handleCurriculumChange = (e) => {
    setCurriculum(e.target.value);
  };

  const [curriculumList, setCurriculumList] = useState([]);

  const loadCurriculums = async () => {
    try {
      const response = await lsitCurriculum();
      const data = response.data;
      setCurriculumList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadCurriculums();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewData = {
      _id: dataStudent._id,
      password: dataStudent.password,
      fullname: dataStudent.fullname,
      curriculum: curriculum,
      year: dataStudent.year,
      institution: dataStudent.institution,
      branch: dataStudent.branch,
    };

    try {
      await createStudent(NewData);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });
      navigate('/manage/student');
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
      title="เพิ่มข้อมูลนักศึกษา | จัดการข้อมูลนักศึกษา"
      description="this is Add Admin"
    >
      <Breadcrumb title={<>หลักสูตร ปี รุ่นปี</>} />
      <ParentCard title="เพิ่มข้อมูลนักศึกษา">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>รหัสนักศึกษา</CustomFormLabel>
              <CustomTextField
                id="_id"
                name="_id"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
                InputProps={{ inputProps: { maxLength: 13 } }}
              />

              <CustomFormLabel>ชื่อ-นามสกุล</CustomFormLabel>
              <CustomTextField
                id="fullname"
                name="fullname"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>รหัสผ่าน</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>หลักสูตร</CustomFormLabel>
              <CustomSelect
                labelId="curriculum"
                id="curriculum"
                name="curriculum"
                value={curriculum}
                onChange={handleCurriculumChange}
                required
                fullWidth
              >
                {curriculumList.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item._id} | {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomFormLabel>รุ่นปี</CustomFormLabel>
              <CustomTextField
                id="year"
                name="year"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>สถาบันเดิม</CustomFormLabel>
              <CustomTextField
                id="institution"
                name="institution"
                variant="outlined"
                onChange={handleDataChange}
                required
                fullWidth
              />

              <CustomFormLabel>สาขาวิชาเดิม</CustomFormLabel>
              <CustomTextField
                id="branch"
                name="branch"
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
                    to={'/manage/student/'}
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

export default AddStudent;
