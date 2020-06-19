import axios from 'axios';
import StorageService from './StorageService';

const requestExecutor = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

requestExecutor.interceptors.request.use(async (config) => {
  const token = await StorageService.getKey('JWT-Token');

  config.headers.Authorization =
    'Bearer ' +
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgLSBBbGxDb29sIiwic3ViIjoiYWZmYjk4NjktNjFiMy00MTAwLWJhZmQtZGY3Y2Y0' +
    'NmVmMzQxIiwiaWF0IjoxNTkyNTI5NzIzfQ.3nldVRiacftOGTKdRjAWPwbvDIH81GJk7pqksNq6W4M';

  // if (token) {
  //   config.headers.Authorization = 'Bearer ' + token;
  // }

  return config;
});

export default requestExecutor;
