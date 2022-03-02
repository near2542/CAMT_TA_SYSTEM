import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// let token = localStorage.getItem('ACCESS_TOKEN') ? JSON.parse(localStorage.getItem('ACCESS_TOKEN')): null;


const status = process.env.NODE_ENV
axios.defaults.baseURL = status === 'production'? process.env.REACT_APP_BASE_URL_PROD: 'http://localhost/Frontend-naja/api';
axios.defaults.withCredentials = true;
export default axios;

