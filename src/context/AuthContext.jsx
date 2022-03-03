import {createContext,useState} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useContext } from 'react'
import { Logout } from '../pages/logout'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>
{

    let navigate= useNavigate();
    const [auth,setAuth] = useState({
    });

    
    
    const LoginUser = async (id,password) =>
{
    const {status,data} = await axios.post('/login.php',{username:id,password});
    console.log(status)
    console.log(data)
    if(status === 401) return false
    console.log(data.ACCESS_TOKEN)
    let decode = jwtDecode(data.ACCESS_TOKEN)
    localStorage.setItem('TAcamt-Auth',JSON.stringify(decode))
    let user_id = decode.id
    let username = decode.username
    let role = decode.role
    let exp = decode.exp
    let isSignin = !!decode
  
     setAuth(state => {return {user_id,username,role,exp,isSignin}})
     console.log(auth)
    return true
}

    const checkTokenExp = () =>
    {
        if(auth.exp < Date.now()) localStorage.removeItem('TAcamt-Auth');
        return <Logout/>
        }

    return (
        <AuthContext.Provider
        value={{auth,setAuth,LoginUser,checkTokenExp}}
        
        >{children}</AuthContext.Provider>
    )

}

export const useAuth = () =>
{
   return useContext(AuthContext)
}