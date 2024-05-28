import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Grid,
  Typography,
  Stack,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TextField,
  Autocomplete,
  Radio,
} from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';

import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/extar-subject';
import { read as readStudent } from '../../../../function/student';
import { list as AllMatchSubjectList } from '../../../../function/machsubjectlist';

const DialogAdd = ({ onAddSuccess, transferList }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [student, setStudent] = useState({});
  const [Subject, setAllSubject] = useState([]);
  const [ExtraSubject, setAllExtraSubject] = useState([]);
  const [MatchSubjectList, setAllMatchSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const params = useParams();
  const structure_id = 'CS-' + student.curriculum;
  // const [transferList, setTransferList] = useState([]);

  const AllSuccess = Array.isArray(transferList)
    ? transferList.flatMap((list) => list.success)
    : [];

  const SubjectInSuccess = AllSuccess.flatMap((list) => list.subject_id);
  const CutSubject = Subject.filter((subject) => !SubjectInSuccess.includes(subject.subject_id));

  const perExtraSubjectInSuccess = AllSuccess.flatMap((list) => list.extraSubject);
  const ExtraSubjectInSuccess = perExtraSubjectInSuccess.flatMap((list) => list.id);
  const CutExtraSubject = MatchSubjectList.filter(
    (msList) => !msList.extraSubject_id.some((id) => ExtraSubjectInSuccess.includes(id)),
  );

  const filteredMatchSubjectList = CutExtraSubject.filter(
    (item) => item.machSubject_id === 'MS' + student.curriculum + '-' + selectedSubject,
  );

  useEffect(() => {
    const loadReadStudent = async (id) => {
      try {
        const res = await readStudent(id);
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const loadDataAllSubject = async (id) => {
      try {
        const res = await AllSubject(id);
        setAllSubject(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const loadDataAllExtraSubject = async () => {
      try {
        const res = await AllExtraSubject();
        setAllExtraSubject(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const loadAllMatchSubjectList = async () => {
      try {
        const res = await AllMatchSubjectList();
        setAllMatchSubjectList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadReadStudent(params._id);
    loadDataAllSubject(structure_id);
    loadDataAllExtraSubject();
    loadAllMatchSubjectList();
  }, [params._id, structure_id]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue(null);
    setSelectedSubject(null);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const handleSave = () => {
    const filteredMatchSubjectList = MatchSubjectList.filter((item) => item._id === selectedValue);
    const listExtra = filteredMatchSubjectList.flatMap((item) => item.extraSubject_id);

    const success = {
      curriculum_id: student.curriculum,
      mach_id: 'MS' + student.curriculum + '-' + selectedSubject,
      subject_id: selectedSubject,
      machlist_id: selectedValue,
      extraSubject: listExtra.map((extraSubjectId) => ({
        id: extraSubjectId,
        grade: '4',
      })),
      note: 'เทียบโอนเพิ่มเติม',
    };

    onAddSuccess(success);
    setOpen(false);
    setSelectedValue(null);
    setSelectedSubject(null);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen('paper')} color="primary">
        <IconCirclePlus width={25} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" align="center">
          เพิ่มรายการคู่เทียบโอน
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={12}>
                  <Stack>
                    <CustomFormLabel>รายวิชาในหลักสูตร</CustomFormLabel>
                    <Autocomplete
                      fullWidth
                      id="subject_id"
                      name="subject_id"
                      disableClearable
                      options={CutSubject.map((option) => ({
                        label:
                          option.subject_id +
                          ' | ' +
                          option.subject_nameTh +
                          ' (' +
                          option.subject_nameEn +
                          ') ' +
                          option.total_credits +
                          ' หน่วยกิต',
                        value: option.subject_id,
                      }))}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="เลือกรายวิชา"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                      onChange={(event, newValue) => setSelectedSubject(newValue?.value)}
                    />
                  </Stack>
                  <Stack>
                    <CustomFormLabel>รายการคู่เทียบโอน</CustomFormLabel>
                    {selectedSubject ? (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell width={'10%'} align="center"></TableCell>
                              <TableCell width={'30%'} align="center">
                                <Typography>รหัสวิชา</Typography>
                              </TableCell>
                              <TableCell width={'50%'}>
                                <Typography>ชื่อวิชา</Typography>
                              </TableCell>
                              <TableCell width={'10%'} align="center">
                                <Typography>หน่วยกิต</Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredMatchSubjectList.length > 0 ? (
                              filteredMatchSubjectList.map((item) => (
                                <TableRow key={item._id}>
                                  <TableCell width={'10%'} align="center">
                                    <Radio {...controlProps(item._id)} sx={{ paddingX: 0 }} />
                                  </TableCell>
                                  <TableCell width={'90%'} colSpan={3} sx={{ paddingX: 0 }}>
                                    {item.extraSubject_id.map((extra) => (
                                      <React.Fragment key={extra}>
                                        <Stack
                                          direction="row"
                                          justifyContent="space-between"
                                          alignItems="center"
                                        >
                                          {ExtraSubject.filter(
                                            (subject) => subject.extraSubject_id === extra,
                                          ).map((subject) => (
                                            <>
                                              <TableCell
                                                width={'30%'}
                                                align="center"
                                                sx={{ paddingX: 0, borderBottom: 'none' }}
                                              >
                                                <Typography>{subject.extraSubject_id}</Typography>
                                              </TableCell>
                                              <TableCell
                                                width={'50%'}
                                                sx={{ paddingX: 0, borderBottom: 'none' }}
                                              >
                                                <Typography>
                                                  {subject.extraSubject_nameTh}
                                                </Typography>
                                              </TableCell>
                                              <TableCell
                                                width={'10%'}
                                                align="center"
                                                sx={{ paddingX: 0, borderBottom: 'none' }}
                                              >
                                                <Typography>{subject.total_credits}</Typography>
                                              </TableCell>
                                            </>
                                          ))}
                                        </Stack>
                                      </React.Fragment>
                                    ))}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} align="center">
                                  <Typography>ไม่มีรายการคู่เทียบโอน</Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Typography align="center">กรุณาเลือกรายวิชาในหลักสูตร</Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button color="primary" onClick={handleSave} disabled={!selectedValue}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogAdd;
