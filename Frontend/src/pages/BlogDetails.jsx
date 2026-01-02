import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

export default function BlogDetails() {
  const blog = useSelector((state) => state.blog.selectedBlog)
  const user = useSelector((state) => state.auth.user)

  const socketRef = useRef(null)
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: '', comment: '' })

  useEffect(() => {
    socketRef.current = io('http://localhost:5000')

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!blog) return

    socketRef.current.emit('join_blog', blog._id)

    socketRef.current.on('load_comments', (data) => {
      setComments(data)
    })

    socketRef.current.on('receive_comment', (comment) => {
      setComments((prev) => [...prev, comment])
    })

    return () => {
      socketRef.current.off('load_comments')
      socketRef.current.off('receive_comment')
    }
  }, [blog])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.comment) return

    const newComment = {
      name: form.name,
      comment: form.comment,
      time: new Date().toLocaleString(),
    }

    socketRef.current.emit('new_comment', {
      blogId: blog.id,
      comment: newComment,
    })

    setForm({ name: '', comment: '' })
  }

  if (!blog) return <p className='text-center mt-10'>No blog selected</p>

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <span className='text-indigo-600 text-sm font-semibold uppercase'>
        {blog.category}
      </span>

      <h1 className='text-3xl md:text-4xl font-bold mt-2'>{blog.title}</h1>

      <p className='text-gray-500 text-sm mt-2'>
      {blog.date} · By {blog.author?.name || 'Admin'}
      </p>

      <img
        src={blog.image}
        alt={blog.title}
        className='w-full h-72 object-cover rounded-lg mt-6'
      />

      <p className='text-gray-700 text-lg leading-relaxed mt-6 whitespace-pre-wrap'>
        {blog.description}
      </p>

      <hr className='my-10' />

      <h2 className='text-2xl font-bold mb-4'>Comments ({comments.length})</h2>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow rounded-lg p-4 space-y-4 mb-6'
      >
        <input
          type='text'
          name='name'
          value={form.name || user?.name || ''}
          onChange={handleChange}
          placeholder='Your Name'
          className='w-full border px-3 py-2 rounded'
          required
        />

        <textarea
          name='comment'
          value={form.comment}
          onChange={handleChange}
          placeholder='Write a comment...'
          rows='4'
          className='w-full border px-3 py-2 rounded'
          required
        />

        <button
          type='submit'
          className='bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700'
        >
          Add Comment
        </button>
      </form>

      <div className='space-y-4'>
        {comments.length === 0 ? (
          <p className='text-gray-500'>No comments yet. Be the first!</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className='bg-gray-100 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <h4 className='font-semibold'>{c.name}</h4>
                <span className='text-xs text-gray-500'>{c.time}</span>
              </div>
              <p className='text-gray-700 mt-2'>{c.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
