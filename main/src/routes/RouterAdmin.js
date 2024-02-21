import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullLayoutAdmin from 'src/layouts/full/FullLayoutAdmin';
import { currentUser } from '../function/auth';

const RouterAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      if (res.data.role !== 'แอดมิน') {
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
      <FullLayoutAdmin />
      {children}
    </>
  );
};

export default RouterAdmin;
