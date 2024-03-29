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
export const getWeight = async (id: String) => {
  return await getService(`${baseUrl}/getweight/${id}`);
};
export const getAllWeight = async (id: String) => {
  return await getService(`${baseUrl}/getAllWeight/${id}`);
};
export const getAllWeightFromDB = async () => {
  return await getService(`${baseUrl}/getAllWeight`);
};
