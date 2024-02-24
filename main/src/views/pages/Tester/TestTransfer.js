import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Container,
  Grid,
  Stack,
  Box,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { IconCirclePlus, IconCircleMinus } from '@tabler/icons';

import { list as AllExtraSubject } from '../../../function/extar-subject';

const TestTransfer = () => {
  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [subject, setSubject] = useState([]);
  const handleSubjectChange = (event, value) => {
    setSubject(value);
    console.log(subject);
  };

  const [subjectList, setSubjectList] = useState([]);
  const handleAddSubjectToList = () => {
    if (subject) {
      setSubjectList((prevSubjectList) => [...prevSubjectList, subject.value]);
      setSubject(null);
    }
  };

  const handleRemoveSubjectToList = (index) => {
    setSubjectList((prevSubjectList) => {
      const updatedSubjectList = [...prevSubjectList];
      updatedSubjectList.splice(index, 1);
      return updatedSubjectList;
    });
  };
  

  useEffect(() => {
    loadDataExtraSubject();
  }, []);

  return (
    <PageContainer title="จัดการคู่เทียบโอนรายวิชา" description="จัดการคู่เทียบโอนรายวิชา">
      <Container maxWidth="lg">
        <Breadcrumb title={<>ทดสอบเทียบโอน</>} />
        <ParentCard title="เพิ่มรายวิชา (รายวิชาในใบ รบ.)">
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
                  onChange={handleSubjectChange}
                  value={subject}
                />
                <IconButton color="primary" onClick={handleAddSubjectToList}>
                  <IconCirclePlus size="20" />
                </IconButton>
              </Stack>
              <Stack>
                <Box mt={2}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={'5%'}>
                            <Typography variant="h5" >ลำดับ</Typography>
                          </TableCell>
                          <TableCell align="center" width={'15%'}>
                            <Typography variant="h5">รหัสวิชา</Typography>
                          </TableCell>
                          <TableCell width={'60%'}>
                            <Typography variant="h5">ชื่อวิชา</Typography>
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            <Typography variant="h5">เกรด</Typography>
                          </TableCell>
                          <TableCell align="center" width={'10%'}>
                            <Typography variant="h5">ลบ</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subjectList.length > 0 ? (
                          subjectList.map((item, index) => {
                            const subject = ExtraSubject.find(
                              (option) => option.extraSubject_id === item,
                            );
                            if (subject) {
                              return (
                                <TableRow key={index} hover>
                                  <TableCell align="center" width="5%">{index + 1}</TableCell>
                                  <TableCell align="center" width="15%">{subject.extraSubject_id}</TableCell>
                                  <TableCell width="60%">
                                    {subject.extraSubject_nameTh}
                                    <Typography color="primary">
                                      ({subject.extraSubject_nameEn})
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center" width="10%">
                                    <TextField name="grade" variant="outlined" required />
                                  </TableCell>
                                  <TableCell align="center" width="10%">
                                    <IconButton color="error" onClick={() => handleRemoveSubjectToList(index)}>
                                      <IconCircleMinus size="18" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            } else {
                              return null; // Handle case when the selected subject is not found
                            }
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              <Box>
                                <Typography align="center">ไม่มีข้อมูลรายวิชาที่เรียนมา</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ParentCard>
      </Container>
    </PageContainer>
  );
};

export default TestTransfer;
