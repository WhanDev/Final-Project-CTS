import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Grid,
  Button,
  MenuItem,
} from '@mui/material';
import CustomCheckbox from '../../../../components/forms/theme-elements/CustomCheckbox';
import { IconTrash } from '@tabler/icons';
import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import {
  listYear as AllStudentYear,
  listCurriculumAndYear as AllStudentCurriculumAndYear,
} from '../../../../function/student';
import { currentUser } from '../../../../function/auth';

import axios from 'axios';

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

const headCells = [
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'รหัสนักศึกษา',
  },
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    label: 'ชื่อ-สกุล',
  },
  {
    id: 'institution',
    numeric: false,
    disablePadding: false,
    label: 'สถาบันเดิม',
  },
  {
    id: 'branch',
    numeric: false,
    disablePadding: false,
    label: 'สาขาวิชา',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all students',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Typography variant="h5">{headCell.label}</Typography>
          </TableCell>
        ))}
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

const EnhancedTableToolbar = ({ numSelected, setSelected, setExtraSelect, selected }) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
        เลือก {numSelected} รายการ
      </Typography>
    ) : null}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            setExtraSelect([]);
            setSelected([]);
          }}
          disabled={selected.length === 0}
        >
          <IconTrash width={18} />
        </IconButton>
      </Tooltip>
    ) : null}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  setExtraSelect: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

const Select = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('_id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [loadAllStudentYear, setLoadAllStudentYear] = useState([]);
  const [selectedStudentYear, setSelectedStudentYear] = useState('');

  const token = localStorage.getItem('token');

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setSelectedCurriculum(res.data.curriculum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const fetchData = async (curriculum, year) => {
    try {
      const response = await AllStudentCurriculumAndYear(curriculum, year);
      const filteredRows = response.data.filter((row) => row.status === 'ยืนยันการเทียบโอนถูกต้อง');
      setRows(filteredRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedCurriculum && selectedStudentYear) {
      fetchData(selectedCurriculum, selectedStudentYear);
    }
  }, [selectedCurriculum, selectedStudentYear]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    const loadDataAllStudentYear = async () => {
      try {
        const res = await AllStudentYear();
        setLoadAllStudentYear(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadDataAllStudentYear();
  }, []);

  const handleStudentYearSelected = (e) => {
    setSelectedStudentYear(e.target.value);
  };

  console.log(selected);

  const handleGeneratePdfPath1 = async (id) => {
    const data = {
      students: selected,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/reportPath1S/', data, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      const fileName = 'ส่วนที่ 1 ใบคำร้องขอเทียบโอนผลการเรียน.pdf';

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  const handleGeneratePdfPath2 = async (id) => {
    const data = {
      students: selected,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/reportPath2S/', data, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      const fileName = 'ส่วนที่ 2 ใบคำร้องขอเทียบโอนผลการเรียน.pdf';

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  return (
    <>
      <Grid item xs={12} sm={12} lg={12}>
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">รุ่น</Typography>
          <CustomSelect
            style={{ width: '100%' }}
            labelId="student"
            id="student"
            name="student"
            value={selectedStudentYear}
            onChange={handleStudentYearSelected}
            required
          >
            {loadAllStudentYear.map((item) => (
              <MenuItem key={item} value={item}>
                รุ่น {item}
              </MenuItem>
            ))}
          </CustomSelect>
        </Stack>
      </Grid>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setSelected={setSelected}
          selected={selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.fullname}</TableCell>
                      <TableCell>{row.institution}</TableCell>
                      <TableCell>{row.branch}</TableCell>
                    </TableRow>
                  );
                })}
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
      <Grid item xs={12} sm={12} lg={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" m={2}>
          <Stack spacing={1} direction="row">
          <Button
              variant={!selected.length > 0 ? 'outlined' : 'contained'}
              color={!selected.length > 0 ? 'error' : 'primary'}
              onClick={handleGeneratePdfPath1}
              disabled={!selected.length > 0}
            >
              <Typography
                fontSize={20}
                fontWeight={400}
                color={!selected.length > 0 ? 'error' : null}
              >
                ใบคำร้องขอเทียบโอนผลการเรียน ส่วนที่ 1
              </Typography>
            </Button>
            <Button
              variant={!selected.length > 0 ? 'outlined' : 'contained'}
              color={!selected.length > 0 ? 'error' : 'primary'}
              onClick={handleGeneratePdfPath2}
              disabled={!selected.length > 0}
            >
              <Typography
                fontSize={20}
                fontWeight={400}
                color={!selected.length > 0 ? 'error' : null}
              >
                ใบคำร้องขอเทียบโอนผลการเรียน ส่วนที่ 2
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default Select;
