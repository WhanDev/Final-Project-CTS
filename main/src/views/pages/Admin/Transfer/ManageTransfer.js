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
} from '@mui/material';
import { IconFileDescription } from '@tabler/icons';

import PageContainer from '../../../../components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

import { TransferListAdmin } from '../../../../function/transfer';
import { list as AllStudent } from '../../../../function/student';
import { list as AllCurriculum } from '../../../../function/curriculum';

const ManageTransfer = () => {
  const [transfer, setTransfer] = useState([]);

  const loadAllTransfer = async () => {
    TransferListAdmin()
      .then((res) => setTransfer(res.data))
      .catch((err) => console.log(err));
  };

  const [allStudent, setAllStudent] = useState([]);

  const loadAllStudent = async () => {
    AllStudent()
      .then((res) => setAllStudent(res.data))
      .catch((err) => console.log(err));
  };

  const [allCurriculum, setAllCurriculum] = useState([]);

  const loadAllCurriculum = async () => {
    AllCurriculum()
      .then((res) => setAllCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllTransfer();
    loadAllStudent();
    loadAllCurriculum();
  }, []);

  console.log(allCurriculum);

  return (
    <PageContainer title="จัดการข้อมูลเทียบโอน" description="จัดการข้อมูลเทียบโอน">
      <Breadcrumb title="จัดการข้อมูลเทียบโอน" />
      <ChildCard>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">นักศึกษา</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">หลักสูตร</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">ว/ด/ป</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">ผลเทียบโอน</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">เพิ่มเติม</Typography>
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {transfer.length > 0 ? (
                  transfer.map((item, index) => (
                    <TableRow key={index} hover>
                      {allStudent.map((student) =>
                        student._id === item._id ? (
                          <React.Fragment key={student._id}>
                            <TableCell align="center">{student.fullname}</TableCell>
                            {allCurriculum.map((curriculum) =>
                              curriculum._id === student.curriculum ? (
                                <TableCell key={curriculum._id} align="center">
                                  {curriculum.name}
                                </TableCell>
                              ) : null,
                            )}
                          </React.Fragment>
                        ) : null,
                      )}
                      <TableCell align="center">{item.date}</TableCell>
                      <TableCell align="center">{item.result}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          component={Link}
                          to={`/admin/manage/transfer/${item._id}`}
                          color="warning"
                        >
                          <IconFileDescription size="18" />
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
    </PageContainer>
  );
};

export default ManageTransfer;
