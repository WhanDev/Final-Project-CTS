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
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import CustomCheckbox from '../../../../components/forms/theme-elements/CustomCheckbox';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import ParentCard from '../../../../components/shared/ParentCard';
import { IconTrash } from '@tabler/icons';
import { list } from '../../../../function/extar-subject';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTestTransfer } from '../../../../store/testTransfer';
import Swal from 'sweetalert2';
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

const headCells = [
  {
    id: 'extraSubject_id',
    numeric: false,
    disablePadding: false,
    label: 'รหัสวิชา',
  },
  {
    id: 'extraSubject_nameTh',
    numeric: false,
    disablePadding: false,
    label: 'ชื่อรายวิชา',
  },
  {
    id: 'total_credits',
    numeric: false,
    disablePadding: false,
    label: 'หน่วยกิต',
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
              'aria-label': 'select all desserts',
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
            <Typography variant="h5" align={headCell.label === 'ชื่อรายวิชา' ? 'left' : 'center'}>
              {headCell.label}
            </Typography>
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

const EnhancedTableToolbar = (props) => {
  const { numSelected, setSelected, setExtraSelect, selected } = props; // เพิ่ม selected และ setExtraSelect ในการรับ props

  return (
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
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired, // เพิ่ม PropTypes สำหรับ setSelected
  setExtraSelect: PropTypes.func.isRequired, // เพิ่ม PropTypes สำหรับ setExtraSelect
  selected: PropTypes.array.isRequired, // เพิ่ม PropTypes สำหรับ selected
};

const Select = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('extraSubject_id');
  const [selected, setSelected] = useState([]);
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

  const [extraSelect, setExtraSelect] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.extraSubject_id);
      setSelected(newSelecteds);
      setExtraSelect(newSelecteds);
      return;
    }
    setSelected([]);
    setExtraSelect([]);
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
    setExtraSelect(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExtraSubjects = rows.filter(
    (item) =>
      item.extraSubject_id.includes(searchTerm) ||
      item.extraSubject_nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.extraSubject_nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  const checkUser = async () => {
    try {
      const res = await currentUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const curriculum_id = user.curriculum;

  useEffect(() => {
    checkUser()
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (extraSelect.length !== 0) {
      dispatch(
        setTestTransfer({
          curriculum: curriculum_id,
          extraSubject: extraSelect,
        }),
      );
      navigate('/student/check');
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเลือกรายวิชา',
      });
    }
  };

  return (
    <PageContainer title="เทียบโอนเบื้องต้น" description="this is Enhanced Table page">
      
        <Breadcrumb title="เทียบโอนเบื้องต้น" />
        
        <ParentCard title="เลือกรายวิชาที่เคยศึกษามาแล้ว (รายวิชาในใบ รบ.)">
          <Paper variant="outlined">
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
              <EnhancedTableToolbar
                numSelected={selected.length}
                setSelected={setSelected}
                setExtraSelect={setExtraSelect}
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
                    {stableSort(filteredExtraSubjects, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.extraSubject_id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.extraSubject_id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.extraSubject_id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                color="primary"
                                checked={isItemSelected}
                                onClick={(event) => handleClick(event, row.extraSubject_id)}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell width={'15%'}>
                              <Typography align="center" color="textSecondary">
                                {row.extraSubject_id}
                              </Typography>
                            </TableCell>
                            <TableCell width={'80%'}>
                              <Typography>
                                {row.extraSubject_nameTh}
                                <Typography color="primary">({row.extraSubject_nameEn})</Typography>
                              </Typography>
                            </TableCell>
                            
                            <TableCell width={'5%'}>
                              <Typography align="center">{row.total_credits}</Typography>
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
            <Grid item xs={12} sm={12} lg={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="end" m={2}>
                <Stack spacing={1} direction="row">
                  <Button variant="contained" color="success" onClick={handleSubmit}>
                    ถัดไป
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Paper>
        </ParentCard>
      
    </PageContainer>
  );
};

export default Select;
