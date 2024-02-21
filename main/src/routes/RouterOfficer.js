import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullLayoutOfficer from 'src/layouts/full/FullLayoutOfficer';
import { currentUser } from '../function/auth';

const RouterOfficer = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      if (res.data.role !== 'เจ้าหน้าที่') {
        navigate('/AuthRole');
      }
    } catch (error) {
      console.log(error);
      navigate('/AuthRole');
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  return (
    <>
      <FullLayoutOfficer />
      {children}
    </>
  );
};

export default RouterOfficer;
