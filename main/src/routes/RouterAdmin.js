import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FullLayoutAdmin from 'src/layouts/full/FullLayoutAdmin';
import { currentAdmin } from '../function/auth';

const RouterAdmin = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState({});

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
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
      <FullLayoutAdmin />
      {children}
    </>
  ) : (
    <Navigate to="/AuthRole" />
  );
};

export default RouterAdmin;
