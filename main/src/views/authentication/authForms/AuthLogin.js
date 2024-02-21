import React from 'react';
import { Box, Card, Typography, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const AuthLogin = ({ title, subtitle, subtext }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h2"
          fontWeight="500"
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
        <CustomTextField id="username" variant="outlined" fullWidth />
      </Box>
      <Box>
        <CustomFormLabel htmlFor="password">รหัสผ่าน</CustomFormLabel>
        <CustomTextField id="password" type="password" variant="outlined" fullWidth />
      </Box>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        {/* <Typography
          component={Link}
          to="/auth/forgot-password"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          Forgot Password ?
        </Typography> */}
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        to="/"
        type="submit"
      >
        เข้าสู่ระบบ
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
