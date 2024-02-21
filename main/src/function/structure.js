import axios from 'axios';

export const create = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/structure', data);

export const list = async () => {
  return await axios.get(process.env.REACT_APP_API + '/structure');
};

export const listByCurriculm = async (curriculum) => {
  return await axios.get(process.env.REACT_APP_API + '/curriculum/structure/' + curriculum);
};

export const listByGroup = async (group_id) => {
  return await axios.get(process.env.REACT_APP_API + '/structure/group/' + group_id);
};

export const read = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/structure/' + id);
};

export const update = async (id, data) => {
  return await axios.put(process.env.REACT_APP_API + '/structure/' + id, data);
};

export const remove = async (id) =>
  await axios.delete(process.env.REACT_APP_API + '/structure/' + id);
