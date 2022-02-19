import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let token = localStorage.getItem('ACCESS_TOKEN') ? JSON.parse(localStorage.getItem('ACCESS_TOKEN')): null;


const status = process.env.NODE_ENV
<<<<<<< HEAD
axios.defaults.withCredentials = true;

axios.defaults.baseURL = status === 'production'? process.env.REACT_APP_BASE_URL_PROD: process.env.REACT_APP_BASE_URL_DEV;

axios.interceptors.request.use((config)=>
{
    if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
    
      return config;
})

axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (token) {
        if (error.response.status === 401) {
          const access_token = await refreshAccessToken().data.ACCESS_TOKEN;

          axios.defaults.headers.common["Authorization"] ="Bearer " + access_token;
          return axios(error.response);
        } else if (error.response.status === 400) {
          return Promise.reject(error);
        }
      } else return Promise.reject(error);
    }
  );


  async function refreshAccessToken()
  {
    return await axios.get('/refresh_token')
  }

=======
axios.defaults.baseURL = status === 'production'? process.env.REACT_APP_BASE_URL_PROD: 'http://localhost/Frontend-naja/api';
axios.defaults.withCredentials = true;
>>>>>>> 4f2492c81cb50f8a7bf9f12e0f034c6ee2c28638
export default axios;

