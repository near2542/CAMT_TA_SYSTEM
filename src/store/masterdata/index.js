import { createSlice } from '@reduxjs/toolkit'
import  axios from '../../shared/axios'

const initialState = {
    major: [],
    daywork: [],
    semester: [],

}

export const masterSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        majorReducer: (state, action) => {
            // if(state.major.length < 1) {const {data} = axios.get('/major.php'); state.major= data}
            state.major = action.payload;
        },
        dayworkReducer: (state, action) => {
            state.daywork = action.payload;
        },
        semesterReducer: (state, action) => {
            state.semester = action.payload;
        }
    }
})

export const { majorReducer, dayworkReducer, semesterReducer } = masterSlice.actions;
export default masterSlice.reducer

