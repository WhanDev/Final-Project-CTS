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
            navigate('/Admin/Index');
            break;
          case 'เจ้าหน้าที่':
            navigate('/Officer/Index');
            break;
          case 'อาจารย์':
            navigate('/Lecturer/Index');
            break;
          case 'นักศึกษา':
            navigate('/Student/Index');
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
