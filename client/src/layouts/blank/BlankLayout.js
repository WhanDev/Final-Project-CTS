import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../function/auth';
import { Outlet } from 'react-router-dom';
import LpHeader from '../../components/landingpage/header/Header';

const BlankLayout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      if (res.data.role) {
        switch (res.data.role) {
          case 'แอดมิน':
            navigate('/admin/index');
            break;
          case 'เจ้าหน้าที่':
            navigate('/officer/index');
            break;
          case 'อาจารย์':
            navigate('/lecturer/index');
            break;
          case 'นักศึกษา':
            navigate('/student/index');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  return (
    <>
      <LpHeader />
      <Outlet />
    </>
  );
}

export default BlankLayout;
