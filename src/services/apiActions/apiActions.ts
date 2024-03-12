import axios from 'axios';
import { baseUrl } from '@env';

export const addWeight = async (body: any) => {
  try {
    return await axios.post(`${baseUrl}/addWeight`, body);
  } catch (error) {
    console.log(error);
  }
};
export const addNote = async (body: any) => {
  try {
    return await axios.post(`${baseUrl}/addNote`, body);
  } catch (error) {
    console.log(error);
  }
};

export const deleteWeight = async (id: string) => {
  return await axios.delete(`${baseUrl}/deleteWeight/${id}`);
};
