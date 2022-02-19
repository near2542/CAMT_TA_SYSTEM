import React, { useEffect } from 'react'
import { Redirect, useHistory, useNavigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UnprotectedRoute({children,...rest}) {
    const { auth } = useSelector(state => state)
    const history = useHistory();
    useEffect(()=>
    {
        if(!auth.isSignin){
            if (
                history.pathname.includes("/auth") ||
                history.pathname.includes("/register") ||
                history.pathname.includes("/forget-password")
              )
              {
                  return;
              }
             return history.push('/auth',{replace:true})
        }
        return history.push('./',{replace:true})
    },[auth])

    return (<Route {...rest} render={() => {
        return auth.isSignin ? <Redirect to="/home" replace /> : children
    }} />)
}
