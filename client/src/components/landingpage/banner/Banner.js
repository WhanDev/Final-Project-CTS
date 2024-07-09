import React from 'react';
import { Grid, Box, Container, useMediaQuery, styled, Stack } from '@mui/material';
import BannerContent from './BannerContent';
import bannerbgImg1 from 'src/assets/images/landingpage/bannerimg1.png';
import bannerbgImg2 from 'src/assets/images/landingpage/bannerimg2.png';

const Banner = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const SliderBox = styled(Box)(() => ({
    '@keyframes slideup': {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
      },
      '100% ': {
        transform: 'translate3d(0px, -100%, 0px)',
      },
    },

    animation: 'slideup 35s linear infinite',
  }));

  const SliderBox2 = styled(Box)(() => ({
    '@keyframes slideDown': {
      '0%': {
        transform: 'translate3d(0, -100%, 0)',
      },
      '100% ': {
        transform: 'translate3d(0px, 0, 0px)',
      },
    },

    animation: 'slideDown 35s linear infinite',
  }));
  return (
    <Box mb={10} sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6} md={6}>
            <BannerContent />
          </Grid>
          {lgUp ? (
            <Grid md={6}>
              <Box
                p={3.2}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  minWidth: '2000px',
                  height: 'calc(100vh - 100px)',
                  maxHeight: '790px',
                }}
              >
                <Stack direction={'row'}>
                  <Box>
                    <SliderBox>
                      <img src={bannerbgImg1} alt="banner" width={300} />
                    </SliderBox>
                    <SliderBox>
                      <img src={bannerbgImg1} alt="banner" width={300} />
                    </SliderBox>
                  </Box>
                  <Box>
                    <SliderBox2>
                      <img src={bannerbgImg2} alt="banner" width={300} />
                    </SliderBox2>
                    <SliderBox2>
                      <img src={bannerbgImg2} alt="banner" width={300} />
                    </SliderBox2>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
