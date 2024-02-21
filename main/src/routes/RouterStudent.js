import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FullLayoutStudent from 'src/layouts/full/FullLayoutStudent';
import { Navigate } from 'react-router-dom';
import { currentStudent } from '../function/auth';

const RouterStudent = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState({});

  useEffect(() => {
    if (user && user.user.token) {
      currentStudent(user.user.token)
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
      <FullLayoutStudent />
      {children}
    </>
  ) : (
    <Navigate to="/AuthRole" />
  );
};

export default RouterStudent;
