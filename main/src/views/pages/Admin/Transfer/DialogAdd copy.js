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
  Stack,
  Typography,
  Box
} from '@mui/material';
import { IconCirclePlus } from '@tabler/icons';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import EnhancedTable from './EnhancedTable';

import { listByStructure as AllSubject } from '../../../../function/subject';
import { list as AllExtraSubject } from '../../../../function/subject';
import { read as readStudent } from '../../../../function/student';
import { list as AllMatchSubjectList } from '../../../../function/machsubjectlist';

const DialogAdd = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [student, setStudent] = useState({});
  const [Subject, setAllSubject] = useState([]);
  const [ExtraSubject, setAllExtraSubject] = useState([]);
  const [MatchSubjectList, setAllMatchSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTransferSubject, setSelectedTransferSubject] = useState(null);

  const params = useParams();
  const structure_id = 'CS-' + student.curriculum;

  useEffect(
    () => {
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

      const loadAllMatchSubjectList = async () => {
        try {
          const res = await AllMatchSubjectList();
          setAllMatchSubjectList(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      const loadAllExtraSubject = async () => {
        try {
          const res = await AllExtraSubject();
          setAllExtraSubject(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      loadReadStudent(params._id);
      loadDataAllSubject(structure_id);
      loadAllMatchSubjectList();
      loadAllExtraSubject();
    },
    [params._id, structure_id],
    [],
  );

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log('Selected Subject:', selectedSubject);
    console.log('Selected Transfer Subject:', selectedTransferSubject);
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
                      options={Subject.map((option) => ({
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
                    <Box mb={2} sx={{ mb: 2 }}>
                      <EnhancedTable
                      />
                    </Box>
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
          <Button color="primary" onClick={handleSave}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogAdd;
