import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Grid, Button, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconCircleMinus } from '@tabler/icons';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import ParentCard from '../../../../components/shared/ParentCard';
import Autocomplete from '@mui/material/Autocomplete';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';

import { readSubject_id as ReadSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';
import {
  read as readMachList,
  update as updataMachList,
} from '../../../../function/machsubjectlist';

const EditMachSubjectList = () => {
  const params = useParams();
  console.log(params.subject_id);

  const [dataSubject, setDataSubject] = useState({
    subject_id: '',
    subject_nameTh: '',
    subject_nameEn: '',
    total_credits: '',
  });

  const loadDataSubject = async (_id) => {
    ReadSubject(_id).then((res) => {
      setDataSubject(res.data);
    });
  };

  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [dataMachSubject, setDataMachSubject] = useState({
    extraSubject_id: [],
  });

  const loadDataMachSubject = async (_id) => {
    readMachList(_id).then((res) => {
      setDataMachSubject(res.data);
    });
  };

  useEffect(
    () => {
      loadDataSubject(params.subject_id);
      loadDataAllExtraSubject();
      loadDataMachSubject(params._id);
    },
    [params.subject_id],
    [params._id],
  );

  useEffect(() => {
    setNumMachSubject(
      dataMachSubject.extraSubject_id.map((value, index) => ({
        id: `${index + 1}`,
        value: value,
      })),
    );
  }, [dataMachSubject.extraSubject_id]);

  const [numMachSubject, setNumMachSubject] = useState([{ id: '1', value: '' }]);

  const handleAddAutocomplete = () => {
    setNumMachSubject((prevNumMachSubjects) => [
      ...prevNumMachSubjects,
      { id: `${prevNumMachSubjects.length + 1}`, value: '' },
    ]);
  };

  const handleRemoveAutocomplete = (id) => {
    setNumMachSubject((prevExtraSubjects) =>
      prevExtraSubjects.filter((extraSubject) => extraSubject.id !== id),
    );
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        extraSubject_id: numMachSubject.map((numMachSubject) => numMachSubject.value),
      };

      await updataMachList(params._id, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
      });

      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ',
        text: error.response.data,
      });
      console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <Breadcrumb title={'จัดการคู่เทียบโอนรายวิชา'} />
      <ParentCard title="เพิ่มคู่เทียบโอนรายวิชา">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
              <Stack>
                <CustomFormLabel>รายวิชาในหลักสูตร</CustomFormLabel>
                <TextField
                  fullWidth
                  id="subject_id"
                  name="subject_id"
                  value={`${dataSubject.subject_id} | ${dataSubject.subject_nameTh}(${dataSubject.subject_nameEn}) | ${dataSubject.total_credits} หน่วยกิต`}
                  disabled
                />

                <CustomFormLabel>รายวิชานอกหลักสูตร</CustomFormLabel>
                {numMachSubject.map((extraSubject, index) => (
                  <React.Fragment key={index}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography mx={2}>{`${extraSubject.id}`}</Typography>
                      <Autocomplete
                        fullWidth
                        id="extraSubject_id"
                        name="extraSubject_id"
                        disableClearable
                        options={ExtraSubject.map((option) => ({
                          label:
                            option.extraSubject_id +
                            ' | ' +
                            option.extraSubject_nameTh +
                            ' (' +
                            option.extraSubject_nameEn +
                            ') ' +
                            option.total_credits +
                            ' หน่วยกิต',
                          value: option.extraSubject_id,
                        }))}
                        value={extraSubject.value}
                        onChange={(event, newValue) => {
                          setNumMachSubject((prev) => [
                            ...prev.slice(0, index),
                            { ...prev[index], value: newValue?.value || '' },
                            ...prev.slice(index + 1),
                          ]);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="เลือกรายวิชานอกหลักสูตร"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveAutocomplete(extraSubject.id)}
                      >
                        <IconCircleMinus size="18" />
                      </IconButton>
                    </Stack>
                  </React.Fragment>
                ))}
                <Stack>
                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    onClick={handleAddAutocomplete}
                  >
                    เพิ่มรายวิชานอกหลักสูตร
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} lg={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end">
                <Stack spacing={1} direction="row">
                  <Button type="submit" variant="contained" color="success">
                    บันทึก
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleBack}
                  >
                    ยกเลิก
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </ParentCard>
    </PageContainer>
  );
};

export default EditMachSubjectList;
