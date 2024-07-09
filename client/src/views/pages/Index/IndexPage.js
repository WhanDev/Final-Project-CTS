import React from 'react';

import PageContainer from 'src/components/container/PageContainer';
import Banner from '../../../components/landingpage/banner/Banner';

const IndexPage = () => {

  return (
    <PageContainer
      title="ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน"
      description="ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน"
    >
      <Banner />
    </PageContainer>
  );
};

export default IndexPage;
