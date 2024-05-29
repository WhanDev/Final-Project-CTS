import React, { useEffect, useState } from 'react';
import { Grid, Box, CardContent, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import { currentUser } from '../../../function/auth';
import { login } from '../../../store/userSlice';

import icon5 from '../../../assets/images/svgs/user-check.svg';
import icon6 from '../../../assets/images/svgs/file-check.svg';


import { dataDashboard } from '../../../function/admin';

const topcards = [
  {
    icon: icon5,
    title: 'รอการยืนยันการเทียบโอน โดยอาจารย์ประจำหลักสูตร'||(
      <>
        รอการยืนยันการเทียบโอน
        <br />
        โดยอาจารย์ประจำหลักสูตร
      </>
    ),
    bgcolor: 'error',
  },
  {
    icon: icon6,
    title: 'ยืนยันการเทียบโอนถูกต้อง',
    bgcolor: 'success',
  },
];

const IndexLecturer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = localStorage.getItem('token');
  console.log('token', idToken);
  
  const [dashboardData, setDashboardData] = useState([]);
  const loadDashboardData = async () => {
    try {
      const dashboard = await dataDashboard();
      setDashboardData(dashboard.data.data);
      console.log(dashboard.data.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const CheckTokenUser = async () => {
    try {
      const res = await currentUser(idToken);

      dispatch(
        login({
          _id: res.data._id,
          fullname: res.data.fullname,
          role: res.data.role,
          token: idToken,
        }),
      );

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
            <Grid item xs={12} sm={6} lg={6} key={i} style={{ display: 'flex' }}>
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
                  {dashboardData.map((item) => {
                    if (topcard.title === item.status) {
                      return <Typography variant="h5">{item.count} รายการ</Typography>;
                    }
                  })}
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default IndexLecturer;
