import React, { useState, useEffect } from 'react';
import { IconButton, Container, Grid, Stack } from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IconCirclePlus } from '@tabler/icons';

import { list as AllExtraSubject } from '../../../function/extar-subject';

const TestTransfer = () => {
  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataExtraSubject();
  }, []);

  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <Container maxWidth="lg">
        <Breadcrumb title={<>ทดสอบเทียบโอน</>} />
        <ParentCard title="เพิ่มรายวิชา (รายวิชาในใบ รบ.)">
          <form encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Autocomplete
                    fullWidth
                    id="subject_id"
                    name="subject_id"
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
                        placeholder="กรอกรหัสวิชา/ชื่อวิชา"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  <IconButton color="primary">
                    <IconCirclePlus size="20" />
                  </IconButton>
                </Stack>
                <Stack>
                    ตารางวิชา
                </Stack>
              </Grid>
            </Grid>
          </form>
        </ParentCard>
      </Container>
    </PageContainer>
  );
};

export default TestTransfer;
