import axios from 'axios';
// import {baseUrl} from '@env';
import { baseUrl } from '../../../env-file';

const getService = async (route: string) => {
  try {
    const response = await axios.get(route);
    return response?.data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export const getWeight = async (id: string) => {
  console.log(baseUrl);
  return await getService(`${baseUrl}/getweight/${id}`);
};
export const getAllWeight = async () => {
  console.log(baseUrl);
  return await getService(`${baseUrl}/getAllWeight`);
};
