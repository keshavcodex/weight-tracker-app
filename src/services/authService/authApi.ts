import axios from 'axios';
import {baseUrl} from '@env';

interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const login = async (body: UserInfo) => {
  try {
    const response: any = await axios.post(`${baseUrl}/login`, body);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const register = async (body: string) => {
  try {
    const response: any = await axios.post(`${baseUrl}/register`, body);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
