import axios from 'axios';
import {baseUrl} from '@env';

export const deleteWeight = async (id: string) => {
  return await axios.delete(`${baseUrl}/deleteWeight/${id}`);
};
