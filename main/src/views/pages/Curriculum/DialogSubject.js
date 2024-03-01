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

import { read } from '../../../function/subject';

const DialogSubject = ({ _id }) => {
  const [data, setData] = useState({
    structure_id: '',
    group_id: '',
    subject_id: '',
    subject_nameTh: '',
    subject_nameEn: '',
    description: '',
    theory_credits: '',
    practical_credits: '',
    total_credits: '',
  });

  const loadData = async (_id) => {
    read(_id).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    loadData(_id);
  }, [_id]);

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
          รายละเอียดรายวิชา
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="h5">รหัสวิชา</Typography>
            <Typography variant="body1" mb={1}>
              {data.subject_id}
            </Typography>

            <Typography variant="h5">ชื่อวิชาภาษาไทย</Typography>
            <Typography variant="body1" mb={1}>
              {data.subject_nameTh}
            </Typography>

            <Typography variant="h5">ชื่อวิชาภาษาอังกฤษ</Typography>
            <Typography variant="body1" mb={1}>
              {data.subject_nameEn}
            </Typography>

            <Typography variant="h5">คำอธิบายรายวิชา</Typography>
            <Typography variant="body1" mb={1}>
              {data.description}
            </Typography>

            <Typography variant="h5">หน่วยกิตทฤษฎี</Typography>
            <Typography variant="body1" mb={1}>
              {data.theory_credits}
            </Typography>

            <Typography variant="h5">หน่วยกิตปฏิบัติ</Typography>
            <Typography variant="body1" mb={1}>
              {data.practical_credits}
            </Typography>

            <Typography variant="h5">หน่วยกิตรวม</Typography>
            <Typography variant="body1" mb={1}>
              {data.total_credits}
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

export default DialogSubject;
