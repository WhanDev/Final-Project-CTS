import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Button, CardContent, Grid } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from '../../components/shared/BlankCard';

import Student from 'src/assets/images/Student.png';
import Admin from 'src/assets/images/Admin.png';

const AuthRole = () => {
  return (
    <PageContainer title="เลือกกลุ่มผู้ใช้งาน" description="เลือกกลุ่มผู้ใช้งาน">
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        paddingLeft={'10%'}
        paddingRight={'10%'}
        paddingTop={'5%'}
      >
        <Typography
          variant="h2"
          fontWeight={500}
          sx={{
            fontSize: {
              md: '40px',
            },
          }}
          marginBottom={5}
        >
          เลือกกลุ่มผู้ใช้งาน
        </Typography>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} marginBottom={2}>
              <BlankCard>
                <CardContent>
                  <Box textAlign="center">
                    <img src={Student} alt="star" width={'40%'} />

                    <Typography variant="h2" mb={2} fontWeight={400}>
                      นักเรียน นักศึกษา
                    </Typography>

                    <Button
                      color="primary"
                      variant="outlined"
                      size="large"
                      component={NavLink}
                      to="/Login/Student"
                    >
                      <Typography variant="h3" fontWeight={300}>
                        เข้าสู่ระบบ
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6} marginBottom={5}>
              <BlankCard>
                <CardContent>
                  <Box textAlign="center">
                    <img src={Admin} alt="star" width={'40%'} />

                    <Typography variant="h2" mb={2} fontWeight={400}>
                      อาจารย์ เจ้าหน้าที่และผู้ดูแลระบบ
                    </Typography>

                    <Button
                      color="primary"
                      variant="outlined"
                      size="large"
                      component={NavLink}
                      to="/Login/Admin"
                    >
                      <Typography variant="h3" fontWeight={300}>
                        เข้าสู่ระบบ
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </BlankCard>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AuthRole;
