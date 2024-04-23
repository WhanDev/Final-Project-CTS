import axios from 'axios';

export const testTransfer = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/test', data);

export const SaveTransfer = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer', data);