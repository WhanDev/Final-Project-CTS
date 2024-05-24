import React, { useState } from 'react';
import { Button } from '@mui/material';

import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import axios from 'axios';

const ManageReport = () => {
  const handleGeneratePdfPath3 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reportPath3/', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      // const fileName = 'ส่วนที่ 1 ใบคำร้องขอเทียบโอนผลการเรียน.pdf';

      // const anchor = document.createElement('a');
      // anchor.href = url;
      // anchor.window.open = fileName;
      // anchor.click();
      // window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  return (
    <PageContainer title="รายงาน" description="รายงาน">
      <Breadcrumb title="รายงาน" />
      <Button variant="contained" color="primary" onClick={handleGeneratePdfPath3}>
        ใบคำร้องขอเทียบโอนผลการเรียน ส่วนที่ 3
      </Button>
    </PageContainer>
  );
};

export default ManageReport;
