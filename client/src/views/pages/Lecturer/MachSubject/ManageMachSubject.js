import React from 'react';

import PageContainer from '../../../../components/container/PageContainer';

import ListMachSubject from './ListMachSubject';

const ManageMachSubject = () => {
  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <ListMachSubject />
    </PageContainer>
  );
};

export default ManageMachSubject;
