import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    title: '',
}

export const titleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        title: (state, action) => {
            state.title = action.payload.title;
        },


    }
})

export const { title } = titleSlice.actions;
export default titleSlice.reducer
