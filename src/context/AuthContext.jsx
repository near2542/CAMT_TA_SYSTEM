import {createContext,useState} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useContext } from 'react'
import { Logout } from '../pages/logout'
const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>
{
    const [auth,setAuth] = useState({
    });
    
    const LoginUser = async (id,password) =>
{
    const {status,data} = await axios.post('/login.php',{id,password});
    if(status.response.status === 401) return false

    let decode = jwtDecode(data.ACCESS_TOKEN)
    localStorage.setItem('TAcamt-Auth',JSON.stringify(decode))

    let user_id = decode.id
    let username = decode.id
    let role = decode.id
    let exp = decode.exp
    let isSignin = !!decode

    return setAuth({user_id,username,role,exp,isSignin})
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