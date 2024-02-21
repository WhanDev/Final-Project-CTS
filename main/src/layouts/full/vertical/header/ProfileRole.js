import React, { useState } from 'react';
import { Box, Menu, Typography, Divider, Button, IconButton } from '@mui/material';
import { IconUser, IconUserCircle } from '@tabler/icons';
import { Stack } from '@mui/system';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileRole = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <IconUserCircle size={30} />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">ข้อมูลผู้ใช้</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Box>

                <Typography variant="subtitle2" color="textSecondary" display="flex" gap={1}>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  ชื่อนาม-สกุล
                  </Typography>
                  {user.user.fullname}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary" display="flex" gap={1}>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  สิทธิ์ผู้ใช้
                  </Typography>
                  {user.user.role}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary" display="flex" gap={1}>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                    รหัสประจำตัว
                  </Typography>
                  {user.user._id}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            <Box mt={2}>
              <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
                ออกจากระบบ
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default ProfileRole;
