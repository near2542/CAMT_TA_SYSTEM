import React from 'react'
import {Redirect} from 'react-router-dom';
export default function ReturnToAuth() {
    return (
       <>
       <Redirect to="/auth" />
       </>
    )
}
