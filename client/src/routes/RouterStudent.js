import React, { useEffect } from 'react';
import FullLayoutStudent from 'src/layouts/full/FullLayoutStudent';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../function/auth';

const RouterStudent = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      if (res.data.role !== 'นักศึกษา') {
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
      <FullLayoutStudent />
      {children}
    </>
  );
};

export default RouterStudent;
