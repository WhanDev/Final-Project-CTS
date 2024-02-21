import axios from 'axios';

export const create = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/subject', data);

export const list = async () => {
  return await axios.get(process.env.REACT_APP_API + '/subject');
};

export const listByStructure = async (structure_id) => {
  return await axios.get(process.env.REACT_APP_API + '/structure/subject/' + structure_id);
};

export const read = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/subject/' + id);
};

export const readSubject_id = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/subject/subject_id/' + id);
};

export const update = async (id, data) => {
  return await axios.put(process.env.REACT_APP_API + '/subject/' + id, data);
};

export const remove = async (id) =>
  await axios.delete(process.env.REACT_APP_API + '/subject/' + id);
