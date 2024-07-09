import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../../../components/container/PageContainer';
import ListCurriculum from './ListStructure';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { read as readCurriculum } from '../../../../function/curriculum';

const ManageStructure = () => {
  const params = useParams();

  const [curriculum, setDataCurriculum] = useState({
    _id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  const loadData = async (_id) => {
    readCurriculum(_id).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadData(params.curriculum);
  }, [params.curriculum]);

  return (
    <PageContainer
      title="จัดการข้อมูลโครงสร้างหลักสูตร"
      description="จัดการข้อมูลจัดการข้อมูลโครงสร้างหลักสูตรหลักสูตร"
    >
      <Breadcrumb
        title={
          <>
            โครงสร้างหลักสูตร {curriculum.name} ({curriculum.year}) {curriculum.level} {curriculum.time} ปี
          </>
        }
      />
      <ListCurriculum />
    </PageContainer>
  );
};

export default ManageStructure;
