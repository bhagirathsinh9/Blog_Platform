import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
  selectedBlog: null,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setAllBlogs(state, action) {
      state.blogs = action.payload
    },

    addBlog(state, action) {
      const exists = state.blogs.find((blog) => blog._id === action.payload._id)
      if (!exists) state.blogs.unshift(action.payload)
    },

    updateBlog(state, action) {
      const index = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id,
      )
      if (index !== -1) state.blogs[index] = action.payload
    },

    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload)
    },

    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload
    },
  },
})

export const { setAllBlogs, addBlog, updateBlog, deleteBlog, setSelectedBlog } =
  blogSlice.actions

export default blogSlice.reducer
