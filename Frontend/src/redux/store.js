import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import blogSlice from './blogSlice.js'

export const store = configureStore({
  reducer: {
    auth: userSlice,
    blog: blogSlice,
  },
})
