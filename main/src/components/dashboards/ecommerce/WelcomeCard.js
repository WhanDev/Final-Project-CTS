import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/Welcome.png';
import { currentUser } from 'src/function/auth';


const WelcomeCard = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

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
              <Typography variant="h6">สิทธิ์ผู้ใช้งาน: {user.role === 'แอดมิน' ? 'ผู้ดูแลระบบ' : user.role} ({user.fullname})</Typography>

            </Box>
          </Grid>
          <Grid item sm={3} display="flex" justifyContent="center">
            <Box mb="-90px">
              <img src={welcomeImg} alt={welcomeImg} width={'250px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
