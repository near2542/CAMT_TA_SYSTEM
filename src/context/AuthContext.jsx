import { createContext, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useContext } from 'react'
// import { Logout } from '../pages/logout'
import { useNavigate,Navigate } from 'react-router-dom'
import { useEffect } from 'react'
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    let navigate = useNavigate();
    const [auth, setAuth] = useState({
    });

    const LoginUser = async (id, password) => {
        const { status, data } = await axios.post('/login.php', { username: id, password });
        console.log(status)
        console.log(data)
        if (status === 401) return false
        console.log(data.ACCESS_TOKEN)
        let decode = jwtDecode(data.ACCESS_TOKEN)
        localStorage.setItem('TAcamt-Auth', JSON.stringify(data.ACCESS_TOKEN))
        let user_id = decode.id
        let username = decode.username
        let role = decode.role
        let exp = decode.exp
        let isSignin = !!decode

        setAuth(state => { return { user_id, username, role, exp, isSignin } })
        console.log(auth)
        return true
    }

    const checkTokenExp = () => {
        console.log(auth.exp)
        console.log(Date.now())
        if (auth.exp < Date.now()) {
            return true;
        }
        localStorage.removeItem('TAcamt-Auth');
        return false;
    }

    const LogoutUser = () =>
    {
        localStorage.removeItem('TAcamt-Auth');
        return ;
    }

    useEffect(() => {
        if (!auth.isSignin) {
            let storage = localStorage.getItem('TAcamt-Auth');
            if(!storage) {console.log('test') ; return <Navigate to='/auth'  replace/> }
            let ACCESS_TOKEN = JSON.parse(storage);
            console.log(ACCESS_TOKEN)
            let decode = jwtDecode(ACCESS_TOKEN)
            let exp = decode.exp
            console.log(exp)
            if (!(decode.exp > Date.now())) {
                let user_id = decode.id
                let username = decode.username
                let role = decode.role
                let isSignin = !!decode
                setAuth(state => { return {...state,user_id, username, role, exp, isSignin } })
                console.log('test cant go register')
                return navigate('/home')
            }
            else { console.log('here in false');localStorage.removeItem('TAcamt-Auth');return navigate('/auth') }
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, LoginUser, checkTokenExp,LogoutUser }}

        >{children}</AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}