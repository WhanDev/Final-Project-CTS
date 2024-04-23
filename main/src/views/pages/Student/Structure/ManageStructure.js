import React, { useState, useEffect } from 'react';

import PageContainer from '../../../../components/container/PageContainer';
import ListStructure from './ListStructure';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { read as readCurriculum } from '../../../../function/curriculum';
import { currentUser } from '../../../../function/auth';

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

  const curriculum_id = user.curriculum;

  const [curriculum, setDataCurriculum] = useState({
    _id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  const loadData = async (id) => {
    try {
      const res = await readCurriculum(id);
      setDataCurriculum(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUser();
    loadData(curriculum_id);
  }, [curriculum_id]);

  console.log(curriculum_id);
  console.log(curriculum);

  return (
    <PageContainer
      title="จัดการข้อมูลโครงสร้างหลักสูตร"
      description="จัดการข้อมูลจัดการข้อมูลโครงสร้างหลักสูตรหลักสูตร"
    >
      <Breadcrumb
        title={
          <>
            หลักสูตร {curriculum && curriculum.name} ({curriculum && curriculum.year}){' '}
            {curriculum && curriculum.level} {curriculum && curriculum.time} ปี
          </>
        }
      />

      <ListStructure />
    </PageContainer>
  );
};

export default ManageStructure;
