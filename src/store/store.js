import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth'
import titleSlice from './title'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    title:titleSlice
  }
})

// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch