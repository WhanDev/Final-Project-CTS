import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Stack,
  MenuItem,
  Typography,
  TableHead,
  Box,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Table,
} from '@mui/material';
import {
  IconFileSpreadsheet,
  IconTableImport,
  IconEditCircle,
  IconCircleMinus,
  IconCirclePlus,
} from '@tabler/icons';

import CustomSelect from '../../../../components/forms/theme-elements/CustomSelect';
import Swal from 'sweetalert2';

import {
  listYear as AllStudentYear,
  listCurriculumAndYear as AllStudentCurriculumAndYear,
  remove as removeStudent,
  importExcel,
} from '../../../../function/student';
import { currentUser } from '../../../../function/auth';

import * as XLSX from 'xlsx';

const ListStudent = () => {
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

  const [selectedCurriculum, setSelectedCurriculum] = useState('');

  const [loadAllStudentYear, setLoadAllStudentYear] = useState([]);

  const loadDataAllStudentYear = async () => {
    AllStudentYear()
      .then((res) => setLoadAllStudentYear(res.data))
      .catch((err) => console.log(err));
  };

  const addCurrentYearToStudentYears = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 544;
    const nextYearStr = nextYear.toString();
    if (!loadAllStudentYear.includes(nextYearStr)) {
      setLoadAllStudentYear([...loadAllStudentYear, nextYearStr]);
    }
  };

  addCurrentYearToStudentYears();

  const [selectedStudentYear, setSelectedStudentYear] = useState('');

  const handleStudentYearSelected = (e) => {
    setSelectedStudentYear(e.target.value);
  };

  const [select, setselect] = useState([]);

  const loadDataAllStudentCurriculumAndYear = async (curriculum, year) => {
    AllStudentCurriculumAndYear(curriculum, year)
      .then((res) => setselect(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataAllStudentYear();
    loadDataAllStudentCurriculumAndYear(selectedCurriculum, selectedStudentYear);
  }, [selectedCurriculum, selectedStudentYear]);

  const handledownloadTemplate = async () => {
    const response = await fetch(`http://localhost:5000/api/student/template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        curriculum: selectedCurriculum || 'รหัสหลักสูตร',
        year: selectedStudentYear || 'รุ่น',
      }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRemove = async (_id) => {
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
        removeStudent(_id)
          .then((res) => {
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            loadDataAllStudentYear();
            loadDataAllStudentCurriculumAndYear(selectedCurriculum, selectedStudentYear);
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'ลบข้อมูลไม่สำเร็จ',
              text: error.response.data.message,
            });
          });
      }
    });
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;

        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        showExcelDataAlert(jsonData.slice(1));
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  const generateTableHtml = (jsonData, customHeaders) => {
    const headersHtml = customHeaders.map((header) => `<th>${header}</th>`).join('');

    const rowsHtml = jsonData
      .map(
        (row) => `<tr>${row.map((cell) => `<td style="padding: 15px">${cell}</td>`).join('')}</tr>`,
      )
      .join('');

    const tableHtml = `<hr><table><thead><tr>${headersHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;

    return tableHtml;
  };

  const showExcelDataAlert = (jsonData) => {
    const customHeaders = [
      'รหัสนักศึกษา',
      'รหัสผ่าน',
      'ชื่อ-นามสกุล',
      'สถาบันเดิม',
      'สาขาวิชาเดิม',
    ];

    const tableHtml = generateTableHtml(jsonData, customHeaders);

    Swal.fire({
      title: 'ต้องการบันทึกข้อมูลนี้ใช่หรือไม่?',
      html: tableHtml,
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      padding: 10,
      width: 1000,
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const studentData = {
            curriculum: selectedCurriculum,
            year: selectedStudentYear,
            studentsData: jsonData,
          };

          await importExcel(studentData);
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          });
          window.location.reload();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: error.response.data,
          });
          console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
        }
      } else {
      }
    });
  };

  return (
    <>
      <Grid item xs={12} sm={12} lg={12}>
        <Stack mb={2} spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="end">
          <Button
            variant="outlined"
            color="primary"
            onClick={handledownloadTemplate}
            startIcon={<IconFileSpreadsheet width={25} />}
          >
            template
          </Button>
          <div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<IconTableImport width={25} />}
              onClick={handleFileUpload}
            >
              Import
            </Button>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={'/lecturer/manage/student/add'}
            startIcon={<IconCirclePlus width={25} />}
          >
            เพิ่มข้อมูลนักศึกษา
          </Button>
        </Stack>
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
      <Box mt={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={'15%'} align="center">
                  <Typography variant="h6">รหัสนักศึกษา</Typography>
                </TableCell>
                <TableCell width={'30%'} align="left">
                  <Typography variant="h6">ชื่อ-สกุล</Typography>
                </TableCell>
                <TableCell width={'20%'} align="center">
                  <Typography variant="h6">สถาบันเดิม</Typography>
                </TableCell>
                <TableCell width={'20%'} align="center">
                  <Typography variant="h6">สาขาวิชา</Typography>
                </TableCell>
                <TableCell width={'15%'} align="center">
                  <Typography variant="h6">จัดการข้อมูล</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {select.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" width={'100%'}>
                    <Typography>ไม่ข้อมูลนักศึกษา</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                select.map((item) => (
                  <TableRow>
                    <TableCell width={'15%'} align="center">
                      <Typography>{item._id}</Typography>
                    </TableCell>
                    <TableCell width={'30%'} align="left">
                      <Typography>{item.fullname}</Typography>
                    </TableCell>
                    <TableCell width={'20%'} align="center">
                      <Typography>{item.institution}</Typography>
                    </TableCell>
                    <TableCell width={'20%'} align="center">
                      <Typography>{item.branch}</Typography>
                    </TableCell>
                    <TableCell width={'15%'} align="center">
                      <IconButton
                        component={Link}
                        to={'/lecturer/manage/student/edit/' + item._id}
                        color="warning"
                      >
                        <IconEditCircle size="25" />
                      </IconButton>
                      <IconButton color="error">
                        <IconCircleMinus size="25" onClick={() => handleRemove(item._id)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ListStudent;
