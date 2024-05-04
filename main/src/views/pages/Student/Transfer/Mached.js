import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageContainer from 'src/components/container/PageContainer';

const Mached = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <PageContainer title="รอการอนุมัติเทียบโอนผลการเรียน" description="รอการอนุมัติเทียบโอนผลการเรียน">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Typography
          variant="h1"
          fontWeight={500}
          sx={{
            fontSize: {
              md: '40px',
            },
          }}
          textAlign="center"
        >
          รอการอนุมัติเทียบโอนผลการเรียน
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default Mached;
