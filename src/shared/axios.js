import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const status = process.env.NODE_ENV
axios.defaults.baseURL = status === 'production'? process.env.REACT_APP_API_URL_DEV_PROD: process.env.REACT_APP_API_URL_DEV;
axios.defaults.withCredentials = true;
export default axios;

