import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'src/components/container/PageContainer';
import Banner from '../../../components/landingpage/banner/Banner';

//function
import { currentUser } from '../../../function/auth';
import { login } from '../../../store/userSlice';

const IndexPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = localStorage.getItem('token');
  console.log('token', idToken);

  const CheckTokenUser = async () => {
    try {
      const res = await currentUser(idToken);
      console.log(res);

      dispatch(
        login({
          _id: res.data._id,
          fullname: res.data.fullname,
          role: res.data.role,
          token: idToken,
        }),
      );
      console.log(res.data.role);

      switch (res.data.role) {
        case 'แอดมิน':
          navigate('/Admin/Index');
          break;
        case 'เจ้าหน้าที่':
          navigate('/Admin/Index');
          break;
        case 'อาจารย์':
          navigate('/Admin/Index');
          break;
        case 'นักศึกษา':
          navigate('/Student/Index');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    CheckTokenUser();
  }, []);

  return (
    <PageContainer
      title="ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน"
      description="ระบบดิจิทัลสำหรับการเทียบโอนผลการเรียน"
    >
      <Banner />
    </PageContainer>
  );
};

export default IndexPage;
