// import React, { useEffect } from 'react'
// import BlogCard from '../componets/BlogCard'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import useGetAllBlogs from '../hooks/useGetAllBlogs'
// import socket from '../socket'
// import { addBlog, deleteBlog, updateBlog } from '../redux/blogSlice'

// export default function Blogs() {
//   const { blogs } = useSelector((store) => store.blog)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   // Load all blogs from API on mount
//   useGetAllBlogs()

//   useEffect(() => {
//   console.log('Redux blogs updated', blogs)
// }, [blogs])

//   useEffect(() => {
//     // New blog added (via API or cron)
//     socket.on('blog_added', (blog) => {
//       dispatch(addBlog(blog))
//     })

//     // Blog updated (cron publishes scheduled blog)
//     socket.on('blog_updated', (blog) => {
//       dispatch(updateBlog(blog))
//     })

//     // Blog deleted
//     socket.on('blog_deleted', (blogId) => {
//       dispatch(deleteBlog(blogId))
//     })

//     return () => {
//       socket.off('blog_added')
//       socket.off('blog_updated')
//       socket.off('blog_deleted')
//     }
//   }, [dispatch])

//   return (
//     <div>
//       <div className="flex justify-end p-5 m-5">
//         <div className="mr-20">
//           <button
//             className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//             onClick={() => navigate('/add-blog')}
//           >
//             Add Blog
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>
//     </div>
//   )
// }

import React, { useEffect } from 'react'
import BlogCard from '../componets/BlogCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllBlogs from '../hooks/useGetAllBlogs'
import socket from '../socket'
import { addBlog, deleteBlog, updateBlog } from '../redux/blogSlice'

export default function Blogs() {
  const { blogs } = useSelector((store) => store.blog)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useGetAllBlogs()

  useEffect(() => {
    socket.on('blog_added', (blog) => dispatch(addBlog(blog)))
    socket.on('blog_updated', (blog) => dispatch(updateBlog(blog)))
    socket.on('blog_deleted', (blogId) => dispatch(deleteBlog(blogId)))

    return () => {
      socket.off('blog_added')
      socket.off('blog_updated')
      socket.off('blog_deleted')
    }
  }, [dispatch])

  return (
    <div>
      <div className='flex justify-end p-5 m-5'>
        <div className='mr-20'>
          <button
            className='bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700'
            onClick={() => navigate('/add-blog')}
          >
            Add Blog
          </button>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
