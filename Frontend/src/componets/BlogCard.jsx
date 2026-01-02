import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, setSelectedBlog } from '../redux/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function BlogCard({ blog }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = useSelector((state) => state.auth.user)

  const handleReadMore = () => {
    dispatch(setSelectedBlog(blog))
    navigate(`/blog/${blog._id}`)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/blogs/delete/${blog._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        if (res.data.success) {
          dispatch(deleteBlog(blog._id))
          toast.success('Blog Deleted Successfully')
        }
      } catch (error) {
        console.error(error)
        alert('Failed to delete blog')
      }
    }
  }

  return (
    <div className='bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden'>
      <div
        className='h-48 bg-cover bg-center'
        style={{ backgroundImage: `url(${blog.image})` }}
      />

      <div className='p-4'>
        <span className='text-xs text-indigo-600 uppercase font-medium'>
          {blog.category}
        </span>
        <div className='flex items-center justify-between'>

        <h3 className='text-lg font-bold text-gray-900 mt-2 line-clamp-2'>
          {blog.title}
        </h3>
          <button
            className='text-indigo-600 text-sm font-semibold hover:underline'
            onClick={handleReadMore}
            >
            Read More →
          </button>
          </div>

        <p className='text-gray-600 text-sm mt-2 line-clamp-3'>
          {blog.description}
        </p>

        <div className='flex items-center justify-between mt-4'>
          <span className='text-xs text-gray-500'>
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString()
              : 'Today'}
          </span>


          {user?._id === blog.author?._id ? (
            <div  className='flex gap-3'>
              <button
                onClick={handleDelete}
                className='mt-3 bg-red-500 text-white px-4 py-1 rounded'
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/edit-blog/${blog._id}`)}
                className='mt-3 bg-yellow-500 text-white px-4 py-1 rounded'
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
