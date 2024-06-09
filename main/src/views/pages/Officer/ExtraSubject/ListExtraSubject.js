import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Typography,
  Stack,
  TextField,
} from '@mui/material';
import { IconEditCircle, IconCircleMinus } from '@tabler/icons';
import Swal from 'sweetalert2';
import DialogExtraSubject from './DialogExtraSubject';
import {
  list,
  read as readExtraSubject,
  remove as removeExtraSubject,
} from '../../../../function/extar-subject';
import { currentUser } from '../../../../function/auth';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="h5" align="center">
            รหัสวิชา
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5">ชื่อวิชา</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5" align="center">
            หน่วยกิต
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5" align="center">
            เพิ่มเติม
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ListExtraSubject = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('extraSubject_id');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await list();
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExtraSubjects = rows.filter(
    (item) =>
      (item.extraSubject_id && item.extraSubject_id.includes(searchTerm)) ||
      (item.extraSubject_nameTh &&
        item.extraSubject_nameTh.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.extraSubject_nameEn &&
        item.extraSubject_nameEn.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const token = localStorage.getItem('token');
  const [user, setUser] = useState([]);

  const CheckUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  const handleRemove = async (_id) => {
    try {
      const result = await Swal.fire({
        title: 'ต้องการลบข้อมูลนี้ใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      });
  
      if (result.isConfirmed) {
        const extrasubject = await readExtraSubject(_id);
        if (extrasubject.data.createBy === user.curriculum) {
          await removeExtraSubject(_id);
          Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
          fetchData();
        } else if (user.curriculum === '0000000') {
          await removeExtraSubject(_id);
          Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
          fetchData();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ลบข้อมูลไม่สำเร็จ',
            text: 'ต้องเป็นในหลักสูตรเดียวกับกับผู้เพิ่มรายวิชานี้เท่านั้น',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.response.data.message,
      });
      console.error(error);
    }
  };
  

  return (
    <>
      <Typography variant="h6" mx={2} mt={3}>
        ค้นหารายวิชา
      </Typography>
      <Stack
        spacing={1}
        direction={{ sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        mx={2}
      >
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          onChange={handleSearch}
          value={searchTerm}
          placeholder="กรอกรหัสวิชา/ชื่อวิชา"
        />
      </Stack>
      <Box mb={2} sx={{ mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(filteredExtraSubjects, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.extraSubject_id}>
                      <TableCell width={'15%'}>
                        <Typography align="center" color="textSecondary">
                          {row.extraSubject_id}
                        </Typography>
                      </TableCell>
                      <TableCell width={'50%'}>
                        <Typography>
                          {row.extraSubject_nameTh}
                          <Typography color="primary">({row.extraSubject_nameEn})</Typography>
                        </Typography>
                      </TableCell>

                      <TableCell width={'15%'}>
                        <Typography align="center">{row.total_credits}</Typography>
                      </TableCell>
                      <TableCell width={'20%'} align="center">
                        <DialogExtraSubject _id={row._id} />
                        <IconButton
                          component={Link}
                          to={`/officer/manage/extrasubject/edit/${row._id}`}
                          color="warning"
                        >
                          <IconEditCircle size="25" />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(row._id)} color="error">
                          <IconCircleMinus size="25" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default ListExtraSubject;
