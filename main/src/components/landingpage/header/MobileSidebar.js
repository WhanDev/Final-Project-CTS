import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material';
import Logo from 'src/layouts/full/shared/logo/Logo';

const MobileSidebar = () => {
  return (
    <>
      <Box px={3}>
        <Logo />
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          <Button
            color="inherit"
            to="/"
            component={Link}
            sx={{
              justifyContent: 'start',
            }}
          >
            หน้าแรก
          </Button>
          <Button
            color="inherit"
            to="/machsubject"
            component={Link}
            sx={{
              justifyContent: 'start',
            }}
          >
            คู่เทียบโอน
          </Button>
          <Button
            color="inherit"
            to="/test"
            component={Link}
            sx={{
              justifyContent: 'start',
            }}
          >
            เทียบโอน
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
