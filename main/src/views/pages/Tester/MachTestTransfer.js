import React from 'react';
import {
  Container,
  Grid,
} from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import { useSelector } from 'react-redux';

const MachTestTransfer = () => {

  const getSelected = useSelector((state) => state.extraSubject.extraSubjects);

  console.log(getSelected);


  return (
    <PageContainer
      title="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
      description="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
    >
      <Container maxWidth="lg">
        <Breadcrumb title={<>ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน</>} />
        <ParentCard title="รายวิชาที่สามารถเทียบโอนได้">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
            </Grid>
          </Grid>
        </ParentCard>
      </Container>
    </PageContainer>
  );
};

export default MachTestTransfer;
