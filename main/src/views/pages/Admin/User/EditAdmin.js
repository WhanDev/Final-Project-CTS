import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, MenuItem, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

import { read as readAdmin, update as updateAdmin } from '../../../../function/admin';
import { list as listCurriculum } from '../../../../function/curriculum';

const EditAdmin = () => {
  const [admin, setDataAdmin] = useState({
    id: '',
    password: '',
    fullname: '',
    curriculum: '',
    role: '',
  });

  const loadDataAdmin = async (_id) => {
    readAdmin(_id).then((res) => {
      setDataAdmin(res.data);
      setRole(res.data.role);
    });
  };

  const roles = [
    {
      name: 'แอดมิน',
    },
    {
      name: 'เจ้าหน้าที่',
    },
    {
      name: 'อาจารย์',
    },
  ];

  const [curriculumList, setCurriculumList] = useState([]);

  const loadCurriculums = async () => {
    try {
      const response = await listCurriculum();
      const data = response.data;
      setCurriculumList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const params = useParams();

  useEffect(() => {
    loadDataAdmin(params._id);
    loadCurriculums();
  }, [params._id]);

  const handleDataChange = (e) => {
    setDataAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const [curriculum, setCurriculum] = useState('');

  const handleCurriculumChange = (e) => {
    setCurriculum(e.target.value);
  };

  const [role, setRole] = React.useState('' || admin.role);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    const curriculumValue =
      selectedRole === 'แอดมิน' || selectedRole === 'เจ้าหน้าที่' ? '0000000' : '0000000';

    setRole(selectedRole);
    setCurriculum(curriculumValue);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      password: admin.password,
      fullname: admin.fullname,
      curriculum: curriculum || admin.curriculum,
      role: role || admin.role,
    };

    try {
      await updateAdmin(params._id, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });
      navigate(-1)
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
    navigate(-1)
  };

  return (
    <PageContainer
      title="แก้ไขข้อมูลผู้ใช้ระบบ | จัดการข้อมูลผู้ใช้ระบบ"
      description="จัดการข้อมูลผู้ใช้ระบบ"
    >
      <Breadcrumb title="จัดการข้อมูลผู้ใช้ระบบ" />

      <ParentCard
        title={
          <>
            แก้ไขข้อมูลผู้ใช้ระบบ | {admin._id} {admin.fullname}
          </>
        }
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>ชื่อ-นามสกุล</CustomFormLabel>
              <CustomTextField
                id="fullname"
                name="fullname"
                value={admin.fullname}
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>รหัสผ่าน</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                value={admin.password}
                type="password"
                variant="outlined"
                onChange={handleDataChange}
                fullWidth
              />

              <CustomFormLabel>สิทธิ์ผู้ใช้</CustomFormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={role || admin.role}
                onChange={handleRoleChange}
                row
              >
                {roles.map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
              </RadioGroup>

              {role === 'อาจารย์' && curriculumList && (
                <div>
                  <CustomFormLabel>สังกัต</CustomFormLabel>
                  <CustomSelect
                    labelId="curriculum"
                    id="curriculum"
                    name="curriculum"
                    value={curriculum || admin.curriculum}
                    onChange={handleCurriculumChange}
                    required
                    fullWidth
                  >
                    {curriculumList.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        หลักสูตร {item.name} ปี พ.ศ {item.year} ({item.level} {item.time} ปี)
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </div>
              )}
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

export default EditAdmin;
