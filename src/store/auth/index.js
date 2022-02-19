import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
const initialState ={
    id:null,
    username:null,
    role:null,
    exp:null,
    isSignin:false,
    

}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        LoginAction: (state,action) =>{
            
            localStorage.setItem('TAcamt-Auth',JSON.stringify(action.payload));
            let token =  JSON.parse(localStorage.getItem('TAcamt-Auth'))
           
            let decoded = jwtDecode(token.ACCESS_TOKEN)
            const {id,username,role,exp} = decoded;
            state.id = id
            state.username = username
            state.role = role
            state.exp = exp
            state.isSignin = true
            return ;

           
        },

        resetAccess : (state,action) =>
        {
            let decoded = jwtDecode(action.payload.ACCESS_TOKEN)
            console.log(decoded.exp)
            console.log(Date.now())
            const {id,username,role,exp} = decoded;
            if( Date.now()+5 >  exp ) return localStorage.removeItem('TAcamt-Auth');
            state.id = id
            state.username = username
            state.role = role
            state.exp = exp
            state.isSignin = true

        },
        // checkStorage: (state) =>
        // {
        //     if (!localStorage.getItem('TAcamt-Auth')) { 
        //         localStorage.removeItem('TAcamt-Auth'); 
        //         return false; }
        
        //     const storage = JSON.stringify(localStorage.getItem('TAcamt-Auth'))
        
        //     const { ACCESS_TOKEN } = storage;
        
        //     try{
        //     const { id, username, role, exp } = jwtDecode(ACCESS_TOKEN)
        //     if (exp > Date.now() + 5) {
        //         state.id = id
        //         state.username = username
        //         state.role = role
        //         state.exp = exp
        //         state.isSignIn = true
        //         return true
        //     }
        //     else throw('JWT token timeout')
        //     }

        //     catch(err)
        //     {
        //         localStorage.removeItem('TAcamt-Auth');
        //         return false
        //     }
        
        // },
        removeAuth: (state)=>
        {
            localStorage.removeItem('TAcamt-Auth');
            state.id = ''
            state.username = ''
            state.role = ''
            state.exp = ''
         },

    }
})

export const { LoginAction,removeAuth,resetAccess } = authSlice.actions; 
export default authSlice.reducer
