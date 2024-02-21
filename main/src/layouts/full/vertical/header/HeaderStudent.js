import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Button,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons';
import Logo from '../../shared/logo/Logo';

// components
import Notifications from './Notifications';
import ProfileRole from './ProfileRole';
import Cart from './Cart';
import Search from './Search';
import Language from './Language';
import Navigation from './Navigation';
import MobileRightSidebar from './MobileRightSidebar';

const HeaderStudent = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // drawer
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();

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
            // to="/machsubject"
            // component={Link}
          >
            คู่เทียบโอน
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
