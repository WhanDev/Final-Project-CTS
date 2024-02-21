import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FullLayoutOfficer from 'src/layouts/full/FullLayoutOfficer';
import { currentOfficer } from '../function/auth';

const RouterOfficer = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState({});

  useEffect(() => {
    if (user && user.user.token) {
      currentOfficer(user.user.token)
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
      <FullLayoutOfficer />
      {children}
    </>
  ) : (
    <Navigate to="/AuthRole" />
  );
};

export default RouterOfficer;
