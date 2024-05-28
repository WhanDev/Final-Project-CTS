import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import { currentUser } from '../../../function/auth';
import { login } from '../../../store/userSlice';

const IndexLecturer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = localStorage.getItem('token');
  console.log('token', idToken);

  const CheckTokenUser = async () => {
    try {
      const res = await currentUser(idToken);

      dispatch(
        login({
          _id: res.data._id,
          fullname: res.data.fullname,
          role: res.data.role,
          token: idToken,
        }),
      );

      switch (res.data.role) {
        case 'แอดมิน':
          navigate('/Admin/Index');
          break;
        case 'เจ้าหน้าที่':
          navigate('/Officer/Index');
          break;
        case 'อาจารย์':
          navigate('/Lecturer/Index');
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
    <>
      <PageContainer title="หน้าหลัก" description="หน้าหลัก">
        <WelcomeCard />
      </PageContainer>
    </>
  );
};

export default IndexLecturer;
