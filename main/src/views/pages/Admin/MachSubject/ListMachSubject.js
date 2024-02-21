import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Stack } from '@mui/system';
import { IconEditCircle, IconCirclePlus, IconCircleMinus } from '@tabler/icons';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { read as ReadCurriculum } from '../../../../function/curriculum';
import {
  listByCurriculum as AllMachsubject,
  remove as RemoveMachSubject,
} from '../../../../function/machsubject';
import { listByStructure as AllSubject } from '../../../../function/subject';
import {
  list as AllMachsubjectList,
  remove as RemoveMachSubjectList,
} from '../../../../function/machsubjectlist';
import { list as AllExtraSubject } from '../../../../function/extar-subject';
import Swal from 'sweetalert2';

const CollapsibleRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const [Subject, setSubject] = useState([]);
  const loadDataAllSubject = async (structure_id) => {
    try {
      const res = await AllSubject(structure_id);
      const data = res.data;
      setSubject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [MachSubjectList, setMachSubjectList] = useState([]);

  const loadDataAllMachsubjectList = async () => {
    AllMachsubjectList()
      .then((res) => setMachSubjectList(res.data))
      .catch((err) => console.log(err));
  };

  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataAllExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      loadDataAllSubject(params.structure_id);
      loadDataAllMachsubjectList();
      loadDataAllExtraSubject();
    },
    [params.structure_id],
    [],
  );

  const handleRemoveMachSubjectList = async (_id) => {
    Swal.fire({
      title: 'ต้องการลบข้อมูลนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
        RemoveMachSubjectList(_id).then((res) => {
          console.log(res);
          loadDataAllMachsubjectList();
          loadDataAllExtraSubject();
        });
      }
    });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Subject.map(
          (subject) =>
            subject.subject_id === row.subject_id && (
              <React.Fragment key={subject._id}>
                <TableCell align="center">{subject.subject_id}</TableCell>
                <TableCell>
                  {subject.subject_nameTh}
                  <Typography color={'primary'}>({subject.subject_nameEn})</Typography>
                </TableCell>
                <TableCell align="center">{subject.theory_credits}</TableCell>
                <TableCell align="center">{subject.practical_credits}</TableCell>
                <TableCell align="center">{subject.total_credits}</TableCell>
                <TableCell align="center">
                  <IconButton color="error">
                    <IconCircleMinus size="18" />
                  </IconButton>
                </TableCell>
              </React.Fragment>
            ),
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                รายวิชาที่นำมาเทียบได้
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={'10%'}>
                      <Typography variant="h6" fontWeight={400}>
                        ลำดับ
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      <Typography variant="h6" fontWeight={400}>
                        รหัสวิชา
                      </Typography>
                    </TableCell>
                    <TableCell width={'50%'}>
                      <Typography variant="h6" fontWeight={400}>
                        ชื่อวิชา
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={'10%'}>
                      <Typography variant="h6" fontWeight={400}>
                        หน่วยกิตรวม
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={'20%'}>
                      <IconButton color="info">
                        <IconCirclePlus size="18" />
                        <Typography variant="h6" fontWeight={400} marginLeft={1}>
                          เพิ่มรายการคู่เทียบโอน
                        </Typography>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} width={'100%'}>
                      {MachSubjectList.map(
                        (machtList, index) =>
                          machtList.machSubject_id === row._id && (
                            <React.Fragment key={machtList._id}>
                              <TableRow
                                style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5' }}
                              >
                                <TableCell>
                                  <Typography>{index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                  {machtList.extraSubject_id.map((extraId) => (
                                    <React.Fragment key={extraId}>
                                      <TableRow>
                                        {ExtraSubject.map(
                                          (extra) =>
                                            extra.extraSubject_id === extraId && (
                                              <React.Fragment key={extra._id}>
                                                <TableCell>{extra.extraSubject_id}</TableCell>
                                                <TableCell>
                                                  {extra.extraSubject_nameTh}
                                                  <Typography color={'primary'}>
                                                    ({extra.extraSubject_nameEn})
                                                  </Typography>
                                                </TableCell>
                                                <TableCell>{extra.total_credits}</TableCell>
                                              </React.Fragment>
                                            ),
                                        )}
                                      </TableRow>
                                    </React.Fragment>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    <IconButton
                                      color="info"
                                      component={Link}
                                      to={
                                        '/manage/machsubject/curriculum/' +
                                        params.curriculum +
                                        '/structure/' +
                                        params.structure_id +
                                        '/' +
                                        row.subject_id +
                                        '/' +
                                        machtList._id +
                                        '/edit'
                                      }
                                    >
                                      <IconEditCircle size="18" />
                                    </IconButton>
                                    <IconButton
                                      color="error"
                                      onClick={() =>
                                        handleRemoveMachSubjectList(machtList._id)
                                      }
                                    >
                                      <IconCircleMinus size="18" />
                                    </IconButton>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ),
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ListMachSubject = () => {
  const params = useParams();
  const [MachSubject, setMachSubject] = useState([]);

  const loadDataAllMachsubject = async (_id) => {
    AllMachsubject(_id)
      .then((res) => setMachSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [Curriculum, setCurriculum] = useState({
    _id: '',
    name: '',
    level: '',
    year: '',
    time: '',
  });

  const loadCurriculum = async (_id) => {
    ReadCurriculum(_id).then((res) => {
      setCurriculum(res.data);
    });
  };

  useEffect(() => {
    loadDataAllMachsubject(params.curriculum);
    loadCurriculum(params.curriculum);
  }, [params.curriculum]);

  return (
    <PageContainer title="Collapsible Table" description="this is Collapsible Table page">
      <Breadcrumb
        title={
          <>
            คู่เทียบโอน หลักสูตร {Curriculum.name} ({Curriculum.year}) {Curriculum.level}{' '}
            {Curriculum.time} ปี
          </>
        }
      />

      <Paper variant="outlined">
        <TableContainer component={Paper}>
          <Table
            aria-label="collapsible table"
            sx={{
              whiteSpace: {
                xs: 'nowrap',
                sm: 'unset',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width={'5%'} />
                <TableCell align="center">
                  <Typography variant="h6">รหัสวิชา</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">ชื่อวิชา</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">หน่วยกิตทฤษฎี</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">หน่วยกิตปฎิบัติ</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">หน่วยกิตรวม</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="info"
                    component={Link}
                    to={
                      '/manage/machsubject/curriculum/' +
                      params.curriculum +
                      '/structure/' +
                      params.structure_id +
                      '/add'
                    }
                  >
                    <IconCirclePlus size="18" />
                    <Typography variant="h5" marginLeft={1}>
                      เพิ่มคู่เทียบโอนรายวิชา
                    </Typography>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MachSubject.map((row) => (
                <CollapsibleRow key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </PageContainer>
  );
};

export default ListMachSubject;
