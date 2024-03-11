import axios from 'axios';
import { baseUrl } from '@env';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export const login = async (body: any) => {
  try {
    const response: any = await axios.post(`${baseUrl}/login`, body);
    return response?.data;
  } catch (error: any) {
    console.log('err\n\n', JSON.stringify(error.message));
    return error;
  }
};

export const register = async (body: UserInfo) => {
  try {
    const response: any = await axios.post(`${baseUrl}/register`, body);
    return response?.data;
  } catch (error) {
    return error;
  }
};
