import React from 'react'
import { Redirect,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children}) {
    const state = useSelector((state) => state.auth);
    return state.auth?(
        <>
            {children}
        </>
    ) :    <Redirect to="/auth"/>
}
