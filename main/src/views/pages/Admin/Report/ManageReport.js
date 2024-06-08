import React from 'react';
import { Box} from '@mui/material';

import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ChildCard from 'src/components/shared/ChildCard';
import ListReport from './ListReport';


const ManageReport = () => {

  return (
    <PageContainer title="รายงานคำร้องขอเทียบโอนผลการเรียน" description="รายงานคำร้องขอเทียบโอนผลการเรียน">
      <Breadcrumb title="รายงานคำร้องขอเทียบโอนผลการเรียน" />
      <ChildCard>
        <Box mt={2}>
          <ListReport />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default ManageReport;
