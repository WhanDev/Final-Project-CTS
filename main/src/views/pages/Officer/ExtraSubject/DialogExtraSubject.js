import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import { IconFileDescription } from '@tabler/icons';

import { read as readExtraSubject } from '../../../../function/extar-subject';
import { read as readCurriculum } from '../../../../function/curriculum';

const DialogExtraSubject = ({ _id }) => {
  const [extraSubject, setDataExtraSubject] = useState({
    extraSubject_id: '',
    extraSubject_nameTh: '',
    extraSubject_nameEn: '',
    description: '',
    theory_credits: '',
    practical_credits: '',
    total_credits: '',
    createBy: '',
  });
  const curriculumId = extraSubject.createBy;

  const loadDataExtraSubject = async (_id) => {
    readExtraSubject(_id).then((res) => {
      setDataExtraSubject(res.data);
    });
  };

  const [curriculum, setDataCurriculum] = useState({
    name: '',
    level: '',
    year: '',
  });

  const loadDataCurriculum = async (curriculumId) => {
    readCurriculum(curriculumId).then((res) => {
      setDataCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadDataExtraSubject(_id);
    loadDataCurriculum(curriculumId);
  }, [_id, curriculumId]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <IconButton onClick={handleClickOpen('paper')}>
        <IconFileDescription size="18" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title" align="center" color={'primary'}>
          รายละเอียดรายวิชานอกหลักสูตร
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="h5">รหัสวิชา</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.extraSubject_id}
            </Typography>

            <Typography variant="h5">ชื่อวิชาภาษาไทย</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.extraSubject_nameTh}
            </Typography>

            <Typography variant="h5">ชื่อวิชาภาษาอังกฤษ</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.extraSubject_nameEn}
            </Typography>

            <Typography variant="h5">คำอธิบายรายวิชา</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.description}
            </Typography>

            <Typography variant="h5">หน่วยกิตทฤษฎี</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.theory_credits}
            </Typography>

            <Typography variant="h5">หน่วยกิตปฏิบัติ</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.practical_credits}
            </Typography>

            <Typography variant="h5">หน่วยกิตรวม</Typography>
            <Typography variant="body1" mb={1}>
              {extraSubject.total_credits}
            </Typography>

            <Typography variant="h5">สร้างโดยหลักสูตร</Typography>
            <Typography variant="body1" mb={1}>
              {curriculum.name} ({curriculum.level}) {curriculum.year}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogExtraSubject;
