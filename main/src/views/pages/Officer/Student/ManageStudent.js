import React from 'react';
import { Box } from '@mui/material';

import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ChildCard from 'src/components/shared/ChildCard';
import ListStudent from './ListStudent';

const ManageStudent = () => {
  return (
    <PageContainer title="จัดการข้อมูลนักศึกษา" description="จัดการข้อมูลนักศึกษา">
      <Breadcrumb title="จัดการข้อมูลนักศึกษา" />
      <ChildCard>
        <Box mt={2}>
          <ListStudent />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default ManageStudent;
