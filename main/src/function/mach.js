import axios from 'axios';

export const testTransfer = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/test', data);