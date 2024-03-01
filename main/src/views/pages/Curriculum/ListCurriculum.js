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
import { IconListSearch } from '@tabler/icons';
import { list as listCurriculum } from '../../../function/curriculum';

const ListCurriculum = () => {
  const [curriculum, setCurriculum] = useState([]);

  const loadDataCurriculum = async () => {
    listCurriculum()
      .then((res) => setCurriculum(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataCurriculum();
  }, []);

  return (
    <Box mt={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" align="center">
                  ลำดับ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  รหัสหลักสูตร
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="left">
                  ชื่อหลักสูตร
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  ระดับการศึกษา
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  หลักสูตรปี พ.ศ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  ระยะเวลาการศึกษา
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {curriculum.length > 0 ? (
              curriculum.map((item, index) => (
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
                      to={'/curriculum/' + item._id + '/structure/CS-' + item._id}
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
  );
};

export default ListCurriculum;
