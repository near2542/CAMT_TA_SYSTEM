import { useNavigate,Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
export const Logout = () =>
{
  const {LogoutUser,setAuth} = useAuth()
  setAuth(null)
  LogoutUser()
  const navigate = useNavigate();
  
  return <Navigate to="/auth" replace />
}