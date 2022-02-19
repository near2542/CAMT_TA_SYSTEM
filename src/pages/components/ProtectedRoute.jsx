import React, { useEffect,useState } from 'react'
import { useHistory, Route, Redirect} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import { resetAccess } from '../../store/auth';
export default function ProtectedRoute({children,...rest}) {
    // const navigate = useNavigate();
    let {auth} = useSelector((state) => state)  
    let dispatch = useDispatch()
    let location = useHistory()
    console.log(auth)
    useEffect(() => {
      if (!auth.isSignin) 
      {   
          let storage = localStorage.getItem('TAcamt-Auth');
          if(!storage) return location.push('/auth',{replace:true})
            dispatch(resetAccess(JSON.parse(storage)))
      }
     
  }, [auth])
   
    return  <Route {...rest} render={()=>{
        return auth.isSignin ? children :  null
    }}/>
}
