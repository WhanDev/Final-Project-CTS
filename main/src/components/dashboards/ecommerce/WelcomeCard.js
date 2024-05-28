import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/welcome-bg2.png';
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
          <Grid item sm={6} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h3">ยินดีต้อนรับ {user.role} {user.fullname} !!</Typography>
              <Typography variant="subtitle2" my={2} color="textSecondary">
                ยินดีต้อนรับเข้าสู่ระบบสำหรับเทียบโอนผลการเรียน หี ควย แตด
              </Typography>
              {/* <Button variant="contained" color="primary">
                Check
              </Button> */}
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box mb="-90px">
              <img src={welcomeImg} alt={welcomeImg} width={'300px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
