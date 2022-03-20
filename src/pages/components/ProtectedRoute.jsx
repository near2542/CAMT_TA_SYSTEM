import React, { useEffect,useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useHistory, Route, Navigate,useNavigate,Outlet, useLocation} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import { resetAccess } from '../../store/auth';
import ResponsiveDrawer from './sidebar';
export default function ProtectedRoute({children,...rest}) {
    // const navigate = useNavigate();
    let {auth,checkTokenExp} = useAuth();
     
    let location = useLocation()
    
   
    return auth.user_id ? (
    <ResponsiveDrawer>
    <Outlet/></ResponsiveDrawer> ): (<Navigate to='/auth' state={{from:location}} replace/>)
    
}
