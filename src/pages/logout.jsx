import {Redirect} from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux';
// import axios from 'axios';
import {removeAuth} from '../store/auth'
export const Logout = () =>
{
  const dispatch = useDispatch();   
  dispatch(removeAuth());
    return(
        <Redirect to="/auth" />
    )
}