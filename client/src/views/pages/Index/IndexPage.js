import React from 'react';

import PageContainer from 'src/components/container/PageContainer';
import Banner from '../../../components/landingpage/banner/Banner';

const IndexPage = () => {

  return (
    <PageContainer
      title="ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ มทร. ขอนแก่น"
      description="Credit Transfer System of Faculty Business Administration and Information Technolog"
    >
      <Banner />
    </PageContainer>
  );
};

export default IndexPage;
