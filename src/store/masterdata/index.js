import { createSlice } from '@reduxjs/toolkit'


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

