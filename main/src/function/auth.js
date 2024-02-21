import axios from 'axios';

export const loginStudent = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/student/login', data);

export const currentUser = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-user',
    {},
    {
      headers: { authtoken },
    },
  );

export const loginAdmin = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/admin/login', data);

export const currentAdmin = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-admin',
    {},
    {
      headers: { authtoken },
    },
  );

export const currentOfficer = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-officer',
    {},
    {
      headers: { authtoken },
    },
  );

export const currentLecturer = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-lecturer',
    {},
    {
      headers: { authtoken },
    },
  );

export const currentStudent = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + '/current-student',
    {},
    {
      headers: { authtoken },
    },
  );
