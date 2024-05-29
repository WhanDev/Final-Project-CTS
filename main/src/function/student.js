import axios from 'axios';

export const create = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/student', data);

export const list = async () => {
  return await axios.get(process.env.REACT_APP_API + '/student');
};

export const listYear = async () => {
  return await axios.get(process.env.REACT_APP_API + '/student/year');
};

export const listCurriculumAndYear = async (curriculum, year) => {
  return await axios.get(
    process.env.REACT_APP_API + '/student/curriculum/' + curriculum + '/year/' + year,
  );
};

export const read = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/student/' + id);
};

export const update = async (id, data) => {
  return await axios.put(process.env.REACT_APP_API + '/student/' + id, data);
};

export const updatedStudent = async (data) => {
  return await axios.put(process.env.REACT_APP_API + '/student/',data);
};

export const remove = async (id) =>
  await axios.delete(process.env.REACT_APP_API + '/student/' + id);

export const importExcel = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/student/upload', data);

export const changePassword = async (id,data) =>
  await axios.post(process.env.REACT_APP_API + '/student/'+ id + '/changePassword/',data)

export const dataDashboard = async (id) =>
  await axios.get(process.env.REACT_APP_API + '/student/data/dashboard/'+ id);

