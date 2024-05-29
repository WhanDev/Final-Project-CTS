import React from 'react';

import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';

const IndexStudent = () => {
  return (
    <PageContainer title="หน้าหลัก" description="หน้าหลัก">
      <WelcomeCard />
    </PageContainer>
  );
};

export default IndexStudent;
