import React from 'react';
import { Container } from '@mui/material';


import PageContainer from '../../../components/container/PageContainer';
import ListCurriculum from './ListCurriculum';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const ManageCurriculum = () => {
  return (
    <PageContainer title="ข้อมูลหลักสูตร" description="ข้อมูลหลักสูตร">
      <Container maxWidth="lg">
        <Breadcrumb title="ข้อมูลหลักสูตร" />
        <ChildCard>
          <ListCurriculum />
        </ChildCard>
      </Container>
    </PageContainer>
  );
};

export default ManageCurriculum;