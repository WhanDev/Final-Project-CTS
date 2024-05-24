import axios from 'axios';

export const testTransfer = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/test', data);

export const SaveTransfer = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer', data);

export const UploadFile = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/upload', data);

export const TransferListAdmin = async () =>
  await axios.get(process.env.REACT_APP_API + '/transfer');

export const TransferRead = async (id) =>
  await axios.get(process.env.REACT_APP_API + '/transfer/' + id);

export const TransferUpdate = async (id, data) =>
  await axios.put(process.env.REACT_APP_API + '/transfer/' + id, data);

export const TransferConfirmPath1 = async (id,data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/stutusPath1/' + id,data);

export const TransferConfirmPath2 = async (id,data) =>
  await axios.post(process.env.REACT_APP_API + '/transfer/stutusPath2/' + id,data);

export const TransferDelete = async (id) =>
  await axios.delete(process.env.REACT_APP_API + '/transfer/' + id);
