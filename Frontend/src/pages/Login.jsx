import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        values,
      )

      if (res.data.success) {
        localStorage.setItem('token', res.data?.data?.token)
        dispatch(setAuthUser(res.data?.data?.user))
        toast.success('Login Successfully')
        navigate('/')
      }
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
  })

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Login Here</h1>

      <div className='p-6 bg-white shadow-lg rounded-lg w-full max-w-md'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='email' className='block mb-1 font-medium'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
             {formik.touched.email && formik.errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='password' className='block mb-1 font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
             {formik.touched.password && formik.errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {formik.errors.password}
              </p>
            )}
          </div>

           <button
            type='submit'
            disabled={formik.isSubmitting}
            className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50'
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-center text-sm mt-4'>
          Don’t have an account?{' '}
          <Link
            to='/signup'
            className='text-blue-600 font-medium hover:underline'
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  )
}
