import axios from 'axios';
import StorageService from './StorageService';

//Genymotion - 10.0.3.2
//Android Studio - 10.0.2.2
const requestExecutor = axios.create({
  baseURL: 'http://10.0.2.2:8080',
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
