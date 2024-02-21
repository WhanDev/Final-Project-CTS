import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import HeaderStudent from './vertical/header/HeaderStudent';
import Navigation from './horizontal/navbar/Navbar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayoutStudent = () => {
  const customizer = useSelector((state) => state.customizer);

  const theme = useTheme();

  return (
    <MainWrapper
      className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {/* {customizer.isHorizontal ? '' : <SidebarAdmin />} */}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? '' : <HeaderStudent />}
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        {/* <Customizer /> */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayoutStudent;
