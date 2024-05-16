import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, styled, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Logo from '../../shared/logo/Logo';

// components
import ProfileRole from './ProfileRole';

const HeaderStudent = () => {
  // drawer
  const customizer = useSelector((state) => state.customizer);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box>
          <Logo />
        </Box>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            color="inherit"
            sx={{ color: (theme) => theme.palette.text.primary }}
            variant="text"
            to="/student/curriculum"
            component={Link}
          >
            โครงสร้างหลักสูตร
          </Button>
          <Button
            color="inherit"
            sx={{ color: (theme) => theme.palette.text.primary }}
            variant="text"
            to="/student/transfer"
            component={Link}
          >
            เทียบโอน
          </Button>
          <Button
            color="inherit"
            sx={{ color: (theme) => theme.palette.text.primary }}
            variant="text"
            to="/student/profile"
            component={Link}
          >
            ข้อมูลส่วนตัว
          </Button>
          <ProfileRole />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

HeaderStudent.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default HeaderStudent;
