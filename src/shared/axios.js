import axios from 'axios';
const status = process.env.NODE_ENV
axios.defaults.baseURL = status === 'production'? 'https://ta-system.camt.cmu.ac.th/api' :'http://localhost/ta_sys';
//ta-system -> ta-camt
axios.defaults.withCredentials = true;
export default axios;

