import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

import welcomeImg from 'src/assets/images/Welcome.png';

import { currentUser } from 'src/function/auth';
import { read as readCurriculum } from 'src/function/curriculum';

const WelcomeCard = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [curriculum, setCurriculum] = useState({});

  console.log(curriculum);

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCurriculum = async (curriculum_id) => {
    try {
      const res = await readCurriculum(curriculum_id);
      setCurriculum(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user.curriculum) {
      loadCurriculum(user.curriculum);
    }
  }, [user.curriculum]);

  return (
    <Card elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item sm={8} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h3" my={2} color="primary">
                ยินดีต้อนรับเข้าสู่ระบบสำหรับเทียบโอนผลการเรียน
              </Typography>
              <Typography variant="h6">
                สิทธิ์ผู้ใช้งาน: {user.role === 'แอดมิน' ? 'ผู้ดูแลระบบ' : user.role} (
                {user.fullname})
              </Typography>
              <Typography variant="none">
                สังกัด:{' '}
                {user.curriculum === '0000000'
                  ? 'ไม่สังกัดหลักสูตร'
                  : user.curriculum
                  ? 'หลักสูตร' +
                    curriculum.name +
                    ' (' +
                    curriculum.year +
                    ') ' +
                    curriculum.level +
                    ' ' +
                    curriculum.time +
                    ' ปี'
                  : null}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={3} display="flex" justifyContent="center">
            <Box mb="-90px">
              <img src={welcomeImg} alt="Welcome" width={'250px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
