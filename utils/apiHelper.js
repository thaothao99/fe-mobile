import axios from 'axios';
import { AsyncStorage } from 'react-native';
const API_URL = 'http://sonnguy3n.info:4000'

const instance = axios.create({
  baseURL: API_URL,
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
