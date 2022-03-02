import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
export const Logout = () =>
{

  const navigate = useNavigate();
  
  navigate('/auth',{replace:true})
}