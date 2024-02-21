import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FullLayoutLecturer from 'src/layouts/full/FullLayoutLecturer';
import { currentLecturer } from '../function/auth';

const RouterLecturer = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState({});

  useEffect(() => {
    if (user && user.user.token) {
      currentLecturer(user.user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <>
      <FullLayoutLecturer />
      {children}
    </>
  ) : (
    <Navigate to="/AuthRole" />
  );
};

export default RouterLecturer;
