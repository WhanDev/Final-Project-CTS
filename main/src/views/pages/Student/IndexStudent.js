import React from 'react';
import { Box, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';

const IndexStudent = () => {
  return (
    <PageContainer title="หน้าหลัก" description="หน้าหลัก">
      <Box
        
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        paddingTop={10}
      >
        <Typography
          variant="h1"
          fontWeight={500}
          sx={{
            fontSize: {
              md: '40px',
            },
          }}
          marginBottom={5}
        >
          ระบบเทียบโอนผลการเรียน
          <Typography variant="none" color={'primary'}>
            {' '}
            Student <br></br>
          </Typography>
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default IndexStudent;
