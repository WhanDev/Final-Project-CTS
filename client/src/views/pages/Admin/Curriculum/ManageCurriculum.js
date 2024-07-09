import React from 'react';
import { Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { IconAlbum } from '@tabler/icons';
import { Link } from 'react-router-dom';

import PageContainer from '../../../../components/container/PageContainer';
import ListCurriculum from './ListCurriculum';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const ManageCurriculum = () => {
  return (
    <PageContainer title="จัดการข้อมูลหลักสูตร" description="จัดการข้อมูลหลักสูตร">
      <Breadcrumb title="จัดการข้อมูลหลักสูตร" />
      <ChildCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="end">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<IconAlbum width={25} />}
              component={Link}
              to={'/admin/manage/curriculum/add'}
            >
              เพิ่มหลักสูตร
            </Button>
          </Stack>
        </Grid>
        <ListCurriculum />
      </ChildCard>
    </PageContainer>
  );
};

export default ManageCurriculum;
