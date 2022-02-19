import { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {resetAccess} from "../../store/auth"
import jwtDecode from 'jwt-decode';
// import { checkStorage } from '../../shared/auth';
const Authlayer = ({ children }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!auth.isSignin) 
        {   
            let storage = localStorage.getItem('TAcamt-Auth');
            return dispatch(resetAccess(JSON.parse(storage)))  
        }
       
    }, [auth])
    
    return (
        <>{children}</>
    )
}

export default Authlayer