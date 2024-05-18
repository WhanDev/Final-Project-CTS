import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { IconAlbum } from '@tabler/icons';

import PageContainer from '../../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import axios from 'axios';

const ManageReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/reportPath1', {
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
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="รายงาน" description="รายงาน">
      <Breadcrumb title="รายงาน" />
      <ChildCard>
        <Grid item xs={12} sm={12} lg={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<IconAlbum width={18} />}
              onClick={handleGeneratePdf}
              disabled={isLoading}
            >
              รายงานส่วนที่ 1 ใบคำร้องขอเทียบโอนผลการเรียน
            </Button>
            <Button variant="outlined" color="error" startIcon={<IconAlbum width={18} />} disabled>
              รายงานส่วนที่ 2 ใบคำร้องขอเทียบโอนผลการเรียน
            </Button>
          </Stack>
        </Grid>
      </ChildCard>
    </PageContainer>
  );
};

export default ManageReport;
