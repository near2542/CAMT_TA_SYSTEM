import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const status = process.env.NODE_ENV
axios.defaults.baseURL = status === 'production'? process.env.REACT_APP_BASE_URL_PROD: 'http://localhost/Frontend-naja/api';
axios.defaults.withCredentials = true;
export default axios;

