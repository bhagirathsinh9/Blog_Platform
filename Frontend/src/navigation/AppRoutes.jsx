import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import MainLayout from '../layout/MainLayout'
import Blogs from '../pages/Blogs'
import AddBlog from '../pages/AddBlog'
import BlogDetails from '../pages/BlogDetails'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import EditBlog from '../pages/EditBlog'

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'blogs',
        element: <Blogs />,
      },
      {
        path: 'add-blog',
        element: <AddBlog />,
      },
      {
        path: '/blog/:id',
        element: <BlogDetails />,
      },
      {
        path:"/edit-blog/:id" ,
        element:<EditBlog />  
      }
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default AppRouter
