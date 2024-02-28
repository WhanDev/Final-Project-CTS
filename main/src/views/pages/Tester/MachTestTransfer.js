import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';
import TextField from '@mui/material/TextField';
import { IconCircleMinus } from '@tabler/icons';
import { list as AllExtraSubject } from '../../../function/extar-subject';

const MachTestTransfer = () => {
  const [ExtraSubject, setExtraSubject] = useState([]);

  const loadDataExtraSubject = async () => {
    AllExtraSubject()
      .then((res) => setExtraSubject(res.data))
      .catch((err) => console.log(err));
  };

  const [selectedExtarSubjectList, setSelectedExtarSubjectList] = useState([]);

  useEffect(() => {
    loadDataExtraSubject();
  }, []);

  return (
    <PageContainer
      title="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
      description="ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน"
    >
      <Container maxWidth="lg">
        <Breadcrumb title={<>ผลการทดลองเทียบโอนหน่วยกิตผลการเรียน</>} />
        <ParentCard title="รายวิชาที่สามารถเทียบโอนได้">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>

            </Grid>
          </Grid>
        </ParentCard>
      </Container>
    </PageContainer>
  );
};

export default MachTestTransfer;
