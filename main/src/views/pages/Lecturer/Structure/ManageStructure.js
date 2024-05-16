import React, { useState, useEffect } from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import PageContainer from '../../../../components/container/PageContainer';
import ListCurriculum from './ListStructure';

import { currentUser } from '../../../../function/auth';
import { read as readCurriculum } from '../../../../function/curriculum';

const ManageStructure = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const [curriculum, setDataCurriculum] = useState({});
  const curriculum_id = user.curriculum;

  const loadDataCurriculum = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadDataCurriculum(curriculum_id);
  }, [curriculum_id]);

  return (
    <PageContainer
      title="จัดการข้อมูลโครงสร้างหลักสูตร"
      description="จัดการข้อมูลจัดการข้อมูลโครงสร้างหลักสูตรหลักสูตร"
    >
      <Breadcrumb
        title={
          <>
          หลักสูตร {' '}
            {curriculum
              ? `${curriculum.name} (${curriculum.level} ${curriculum.time} ปี) พ.ศ ${curriculum.year}`
              : ''}
          </>
        }
      />
      <ListCurriculum />
    </PageContainer>
  );
};

export default ManageStructure;
