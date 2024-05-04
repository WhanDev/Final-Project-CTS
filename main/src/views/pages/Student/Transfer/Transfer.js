import React, { useEffect } from 'react';
import { currentUser } from '../../../../function/auth';

import Select from './Select';
import Mached from './Mached';

const Transfer = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState({});

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  return <>{user.status === 'รอการอนุมัติเทียบโอนผลการเรียน' ? <Mached /> : <Select />}</>;
};

export default Transfer;