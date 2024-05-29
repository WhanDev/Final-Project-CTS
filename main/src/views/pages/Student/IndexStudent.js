import React, { useState, useEffect } from 'react';
import { Grid, Box, CardContent, Typography } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';

import { dataDashboard } from '../../../function/student';
import { currentUser } from '../../../function/auth';

import icon5 from '../../../assets/images/svgs/file-alert.svg';
import icon3 from '../../../assets/images/svgs/checklist.svg';

const IndexStudent = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [credit, setCredit] = useState([]);
  const [LearnMore, setLearnMore] = useState([]);
  const [totalCredit, setTotalCredit] = useState([]);

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const loadCredit = async (id) => {
    try {
      const dashboard = await dataDashboard(id);
      setCredit(dashboard.data.credit);
      console.log(credit);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const loadLearnMore = async (id) => {
    try {
      const dashboard = await dataDashboard(id);
      setLearnMore(dashboard.data.LearnMore);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const loadTotalCredit = async (id) => {
    try {
      const dashboard = await dataDashboard(id);
      setTotalCredit(dashboard.data.totalCredits);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  useEffect(() => {
    loadCredit(user._id);
    loadTotalCredit(user._id);
    loadLearnMore(user._id);
  }, [user._id]);
  console.log(credit, LearnMore, totalCredit);

  const topcards = [
    {
      icon: icon3,
      title: 'หน่วยกิตที่เทียบโอนได้',
      list: credit,
      bgcolor: 'success',
    },

    {
      icon: icon5,
      title: 'ที่ต้องเรียนเพิ่ม' || (
        <>
          รอการยืนยันการเทียบโอน
          <br />
          โดยอาจารย์ประจำหลักสูตร
        </>
      ),
      list: LearnMore,
      bgcolor: 'warning',
    },
  ];
  return (
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
                <Typography variant="h5">
                  {topcard.list.length > 0 ? `${topcard.list} หน่วยกิต` : '0 หน่วยกิต'}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
        {user.status === 'ยังไม่ดำเนินการเทียบโอนเบื้องต้น' && (
          <Grid item xs={12} sm={12} lg={12} style={{ display: 'flex' }}>
            <Box
              bgcolor={`error.light`}
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
                <Typography color={`red`} mt={1} variant="h5">
                  นักศึกษา{user.status} !!
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default IndexStudent;
