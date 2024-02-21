import React from 'react';
import { Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { IconUserPlus } from '@tabler/icons';
import { Link } from 'react-router-dom';

import PageContainer from '../../../../components/container/PageContainer';
import ListAdmin from './ListAdmin';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const ManageAdmin = () => {
  return (
    <PageContainer title="จัดการข้อมูลผู้ใช้ระบบ" description="จัดการข้อมูลผู้ใช้ระบบ">
      <Breadcrumb title="จัดการข้อมูลผู้ใช้ระบบ" />
      <ChildCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="end">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<IconUserPlus width={18} />}
              component={Link}
              to={'/manage/admin/add'}
            >
              เพิ่มข้อมูลผู้ใช้ระบบ
            </Button>
          </Stack>
        </Grid>
        <ListAdmin />
      </ChildCard>
    </PageContainer>
  );
};

export default ManageAdmin;
