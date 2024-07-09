import axios from 'axios';

export const create = async (data) =>
  await axios.post(process.env.REACT_APP_API + '/machsubject', data);

export const list = async () => {
  return await axios.get(process.env.REACT_APP_API + '/machsubject');
};

export const listByCurriculum = async (curriculum) => {
  return await axios.get(process.env.REACT_APP_API + '/curriculum/machsubject/' + curriculum);
};

export const read = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/machsubject/' + id);
};

export const update = async (id, data) => {
  return await axios.put(process.env.REACT_APP_API + '/machsubject/' + id, data);
};

export const remove = async (id) =>
  await axios.delete(process.env.REACT_APP_API + '/machsubject/' + id);
