import { createSlice } from '@reduxjs/toolkit'


const initialState =localStorage.getItem('TAcamt-Auth')? 
                    JSON.parse(localStorage.getItem('TAcamt-Auth')) : 
                    {
                        id : '',
                        auth: false,
                        username: '',
                        role:'',
                    }

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        checkAuth: (state,action) =>{
            localStorage.setItem('TAcamt-Auth',JSON.stringify(action.payload));
            state.id = action.payload.id
            state.username = action.payload.username
            state.role = action.payload.role
            state.auth = action.payload.auth
        },
        removeAuth:(state)=>
        {
            localStorage.removeItem('TAcamt-Auth');
            state.id = '';
            state.auth = false;
            state.username = '';
            state.role = '';
         }

    }
})

export const { checkAuth,removeAuth } = authSlice.actions; 
export default authSlice.reducer
