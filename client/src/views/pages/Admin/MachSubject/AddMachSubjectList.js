import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconCircleMinus, IconCirclePlus } from '@tabler/icons';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import ParentCard from '../../../../components/shared/ParentCard';
import Autocomplete from '@mui/material/Autocomplete';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';

import { readSubject_id as ReadSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';
import { create as createMachList } from '../../../../function/machsubjectlist';

const AddMachSubjectList = () => {
  const params = useParams();
  console.log(params.subject_id);

  const [dataSubject, setDataSubject] = useState({
    subject_id: '',
    subject_nameTh: '',
    subject_nameEn: '',
    total_credits: '',
  });

  const loadData = async (_id) => {
    ReadSubject(_id).then((res) => {
      setDataSubject(res.data);
    });
  };

  useEffect(() => {
    loadData(params.subject_id);
  }, [params.subject_id]);

  const [ExtraSubject, setExtraSubject] = useState([]);

  useEffect(() => {
    loadDataAllExtraSubject();
  }, []);

  const loadDataAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [AddExtraSubjects, setAddExtraSubjects] = useState([{ id: '1', value: '' }]);

  const handleAddAutocomplete = () => {
    setAddExtraSubjects((prevExtraSubjects) => [
      ...prevExtraSubjects,
      { id: `${prevExtraSubjects.length + 1}`, value: NewExtraSubject },
    ]);
  };

  const handleRemoveAutocomplete = (id) => {
    setAddExtraSubjects((prevExtraSubjects) =>
      prevExtraSubjects.filter((extraSubject) => extraSubject.id !== id),
    );
  };

  const [NewExtraSubject, setNewExtraSubject] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const NewData = {
        curriculum: params.curriculum,
        subject_id: dataSubject.subject_id,
        machSubject_id: 'MS' + params.curriculum + '-' + params.subject_id,
        extraSubject_id: NewExtraSubject.map((extraSubject) => extraSubject.value),
      };

      console.log(NewData);

      await createMachList(NewData);

      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
      });

      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        text: error.response.data,
      });
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
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
                {AddExtraSubjects.map((extraSubject, index) => (
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Subject"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        onChange={(event, newValue) =>
                          setNewExtraSubject((prev) => [
                            ...prev.filter((selected) => selected.id !== index),
                            { value: newValue.value },
                          ])
                        }
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
                    <IconCirclePlus size="25" />
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
                  <Button variant="outlined" color="warning" onClick={() => handleBack()}>
                    ย้อนกลับ
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

export default AddMachSubjectList;
