import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullLayoutLecturer from 'src/layouts/full/FullLayoutLecturer';
import { currentUser } from '../function/auth';

const RouterLecturer = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      if (res.data.role !== 'อาจารย์') {
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
      <FullLayoutLecturer />
      {children}
    </>
  );
};

export default RouterLecturer;
