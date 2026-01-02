import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllBlogs } from '../redux/blogSlice'

export default function useGetAllBlogs() {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blog)

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs')

        if (res.data.success) {
          dispatch(setAllBlogs(res.data.data))
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error.message)
      }
    }

    fetchAllBlogs()
  }, [dispatch, blogs])
}
