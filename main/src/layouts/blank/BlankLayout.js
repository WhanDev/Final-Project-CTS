import { Outlet } from 'react-router-dom';
import LpHeader from '../../components/landingpage/header/Header';

const BlankLayout = () => (
  <>
    <LpHeader />
    <Outlet />
  </>
);

export default BlankLayout;
