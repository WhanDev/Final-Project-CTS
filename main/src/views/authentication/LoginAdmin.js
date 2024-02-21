import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Box, Card, Typography, Button, Stack, Divider } from '@mui/material';
import Swal from 'sweetalert2';

//components
import PageContainer from 'src/components/container/PageContainer';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
//api
import { loginAdmin } from '../../function/auth';
//store
import { login as loginRedux } from '../../store/userSlice';

const LoginAdmin = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      _id: data.get('_id'),
      password: data.get('password'),
    };

    loginAdmin(user)
      .then((res) => {
        console.log(res);

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
        });

        dispatch(
          loginRedux({
            _id: res.data.payload.user._id,
            fullname: res.data.payload.user.fullname,
            role: res.data.payload.user.role,
            token: res.data.token,
          }),
        );

        localStorage.setItem('token', res.data.token);
        roleRedirects(res.data.payload.user.role);
        console.log(res.data.payload.user.role);
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: error.response.data,
        });
      });
  };

  const roleRedirects = (role) => {
    switch (role) {
      case 'แอดมิน':
        navi('/Admin/Index');
        break;
      case 'เจ้าหน้าที่':
        navi('/Officer/Index');
        break;
      default:
        navi('/Lecturer/Index');
    }
  };

  return (
    <PageContainer title="ผู้ใช้ระบบเข้าสู่ระบบ" description="ผู้ใช้ระบบเข้าสู่ระบบ">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: 'calc(100vh - 100px)' }}>
          <Grid
            item
            xs={12}
            sm={12}
            margin={5}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '600px' }}>
              <Typography variant="h2" color="textSecondary" align="center" margin={1}>
                กลุ่มอาจารย์ เจ้าหน้าที่และผู้ดูแลระบบ
              </Typography>
              <Box>
                <Divider>
                  <Typography
                    component="span"
                    color="primary"
                    variant="h3"
                    fontWeight="400"
                    position="relative"
                    px={2}
                  >
                    เข้าสู่ระบบ
                  </Typography>
                </Divider>
              </Box>

              <Stack>
                <Box>
                  <CustomFormLabel htmlFor="username">รหัสประจำตัว</CustomFormLabel>
                  <CustomTextField id="_id" name="_id" variant="outlined" fullWidth />
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="password">รหัสผ่าน</CustomFormLabel>
                  <CustomTextField
                    id="password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  my={2}
                ></Stack>
              </Stack>
              <Box>
                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default LoginAdmin;
