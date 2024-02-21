import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  TableContainer,
  Container,
} from '@mui/material';
import { IconListSearch } from '@tabler/icons';

import PageContainer from '../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import { list as AllCurriculum } from '../../../function/curriculum';

const ShowMachSubject = () => {
  const [Curriculum, setAllCurriculum] = useState([]);

  useEffect(() => {
    loadAllCurriculum();
  }, []);

  const loadAllCurriculum = async () => {
    AllCurriculum()
      .then((res) => setAllCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer title="คู่เทียบโอนรายวิชา" description="คู่เทียบโอนรายวิชา">
      <Container maxWidth="lg">
        <Breadcrumb title="คู่เทียบโอนรายวิชา" />
        <ChildCard>
          <Box mt={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6">ลำดับ</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">รหัสหลักสูตร</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6">ชื่อหลักสูตร</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">ระดับการศึกษา</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">หลักสูตรปี พ.ศ</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">ระยะเวลาการศึกษา</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">จัดการข้อมูล</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Curriculum.length > 0 ? (
                    Curriculum.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{item._id}</TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="center">{item.level}</TableCell>
                        <TableCell align="center">{item.year}</TableCell>
                        <TableCell align="center">{item.time} ปี</TableCell>
                        <TableCell align="center">
                          <IconButton
                            component={Link}
                            to={'/machsubject/curriculum/' + item._id + '/structure/CS-' + item._id}
                            color="info"
                          >
                            <IconListSearch size="18" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Box>
                          <Typography align="center">ไม่มีข้อมูลหลักสูตร</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </ChildCard>
      </Container>
    </PageContainer>
  );
};

export default ShowMachSubject;
