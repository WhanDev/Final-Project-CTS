import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Grid, Box, CardContent, Typography } from '@mui/material';

import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';

import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';

import { currentUser } from '../../../function/auth';

import { login } from '../../../store/userSlice';

const topcards = [
  {
    icon: icon3,
    title: 'รอการยืนยันการเทียบโอนเบื้องต้น',
    list: '11',
    bgcolor: 'warning',
  },

  {
    icon: icon5,
    title: (
      <>
        รอการยืนยันการเทียบโอน
        <br />
        โดยอาจารย์ประจำหลักสูตร
      </>
    ),
    list: '5',
    bgcolor: 'error',
  },
  {
    icon: icon6,
    title: 'ยืนยันการเทียบโอนถูกต้อง',
    list: '6',
    bgcolor: 'success',
  },
];

const IndexAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = localStorage.getItem('token');

  const CheckTokenUser = async () => {
    try {
      const res = await currentUser(idToken);
      console.log(res);

      dispatch(
        login({
          _id: res.data._id,
          fullname: res.data.fullname,
          role: res.data.role,
          token: idToken,
        }),
      );
      console.log(res.data.role);

      switch (res.data.role) {
        case 'แอดมิน':
          navigate('/Admin/Index');
          break;
        case 'เจ้าหน้าที่':
          navigate('/Officer/Index');
          break;
        case 'อาจารย์':
          navigate('/Lecturer/Index');
          break;
        case 'นักศึกษา':
          navigate('/Student/Index');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    CheckTokenUser();
  }, []);

  return (
    <>
      <PageContainer title="หน้าหลัก" description="หน้าหลัก">
        <WelcomeCard />
        <Box marginY={2} />
        <Grid container spacing={3}>
          {topcards.map((topcard, i) => (
            <Grid item xs={12} sm={4} lg={4} key={i} style={{ display: 'flex' }}>
              <Box
                bgcolor={`${topcard.bgcolor}.light`}
                textAlign="center"
                style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
              >
                <CardContent
                  style={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img src={topcard.icon} alt={topcard.icon} width="50" />
                  <Typography color={`${topcard.bgcolor}.main`} mt={1} variant="h5">
                    {topcard.title}
                  </Typography>
                  <Typography mt={1} variant="h5">
                    {topcard.list} รายการ
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default IndexAdmin;