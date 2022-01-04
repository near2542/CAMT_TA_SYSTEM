import React from 'react'
import {Redirect} from 'react-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children}) {
    const state = useSelector((state) => state.auth);
    console.log(state)    
    return (
        <>
            {!state.auth && <Redirect to='/auth'/>}
            {children}
        </>
    )
}
