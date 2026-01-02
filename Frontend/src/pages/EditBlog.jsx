import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog } from '../redux/blogSlice'

export default function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const blog = useSelector((state) =>
    state.blog.blogs.find((b) => b._id === id)
  )

  const [form, setForm] = useState({
    title: blog?.title || '',
    category: blog?.category || '',
    image: blog?.image || '',
    description: blog?.description || '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `http://localhost:5000/api/blogs/update/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (res.data.success) {
        dispatch(updateBlog(res.data.data))
        navigate('/')
      }
    } catch (err) {
      console.log('Failed to update blog',err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Category"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Image URL"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="w-full border p-2 rounded"
          placeholder="Description"
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  )
}
