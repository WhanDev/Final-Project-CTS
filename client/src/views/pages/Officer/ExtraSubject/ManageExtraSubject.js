import React from 'react';
import { Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { IconCirclePlus } from '@tabler/icons';
import { Link } from 'react-router-dom';

import PageContainer from '../../../../components/container/PageContainer';
import ListExtraSubject from './ListExtraSubject';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const ManageExtraSubject = () => {
  return (
    <PageContainer title="จัดการวิชานอกหลักสูตร" description="จัดการวิชานอกหลักสูตร">
      <Breadcrumb title="จัดการวิชานอกหลักสูตร" />
      <ChildCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="end">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<IconCirclePlus width={18} />}
              component={Link}
              to={'/officer/manage/extrasubject/add'}
            >
              เพิ่มรายวิชานอกหลักสูตร
            </Button>
          </Stack>
        </Grid>
        <ListExtraSubject />
      </ChildCard>
    </PageContainer>
  );
};

export default ManageExtraSubject;
