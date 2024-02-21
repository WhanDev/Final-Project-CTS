import React from 'react';
import { Typography, Box, Button, Stack, styled, useMediaQuery } from '@mui/material';
import { IconSchool } from '@tabler/icons';
import { Link } from 'react-router-dom';
// third party
import { motion } from 'framer-motion';

const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <Box mt={lgDown ? 8 : 0}>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <Typography variant="h6" display={'flex'} gap={1} mb={2}>
          <Typography color={'secondary'}>
            <IconSchool size={'21'} />
          </Typography>{' '}
          มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
        </Typography>

        <Typography
          variant="h1"
          fontWeight={600}
          sx={{
            fontSize: {
              md: '40px',
            },
            lineHeight: {
              md: '50px',
            },
          }}
        >
          ระบบดิจิทัล
          <br />
          สำหรับการเทียบโอนผลการเรียน
          <br />
          <Typography component={'span'} variant="none" color={'primary'}>
            Credit Transfer System
          </Typography>{' '}
        </Typography>
      </motion.div>
      <Box pt={4} pb={3}>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.2,
          }}
        >
          <Typography variant="h5" fontWeight={300}>
            ยินดีต้อนรับเข้าสู่ ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน หลักสูตรบริหารธุรกิจบัณฑิต
            สาขาวิชาเทคโนโลยีธุรกิจดิทัล Credit Transfer System of B.B.A Digital Business
            Technology.
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton variant="contained" color="primary" component={Link} to="/AuthRole">
            เข้าสู่ระบบ
          </StyledButton>

          <StyledButton2 variant="outlined" component={Link} to="/test">
            ทดสอบเทียบโอน
          </StyledButton2>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;
