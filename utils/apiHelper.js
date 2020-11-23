import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  err => {
    return Promise.reject(err);
  }
);
export default instance;
