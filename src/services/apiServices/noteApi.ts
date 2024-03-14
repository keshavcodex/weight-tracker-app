import axios from 'axios';
import { baseUrl } from '@env';

const getService = async (route: string) => {
  try {
    const response = await axios.get(route);
    return response?.data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};

export const getNote = async (id: string) => {
  return await getService(`${baseUrl}/getNote/${id}`);
};
export const getAllNotes = async (id: string) => {
  return await getService(`${baseUrl}/getAllNote/${id}`);
};
export const getAllNotesFromDB = async () => {
  return await getService(`${baseUrl}/getAllNote`);
};
