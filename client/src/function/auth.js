import axios from 'axios';

export const loginStudent = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/student/login', data);

export const loginAdmin = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/admin/login', data);

export const currentUser = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-user',
    {},
    {
      headers: { authtoken },
    },
  );
