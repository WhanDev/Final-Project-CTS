import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import { currentUser } from '../../../function/auth';
import { login } from '../../../store/userSlice';

const IndexLecturer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = localStorage.getItem('token');
  console.log('token', idToken);

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
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="center"
          padding={5}
        >
          <Typography
            variant="h1"
            fontWeight={400}
            sx={{
              fontSize: {
                md: '30px',
              },
            }}
            marginBottom={2}
          >
            {/* อาจารย์ <br />
            ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน */}
            <WelcomeCard/>
          </Typography>
          <Typography variant="h5" fontWeight={400} color={'primary'}>
            {/* Credit Transfer System <br /> */}
          </Typography>
        </Box>
      </PageContainer>
    </>
  );
};

export default IndexLecturer;
