import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as Yup from 'yup'


export default function Signup() {
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/signup',
        values,
      )
      console.log(res)
      if (res.data.success) {
        navigate('/login');
        toast.success("Signup Successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    })
  })

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Signup Here</h1>

      <div className='p-6 bg-white shadow-lg rounded-lg w-full max-w-md'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='name' className='block mb-1 font-medium'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {formik.touched.name && formik.errors.name && (
            <p className='text-red-500 text-sm'>{formik.errors.name}</p>
          )}
          </div>

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
            <p className='text-red-500 text-sm'>{formik.errors.email}</p>
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
            <p className='text-red-500 text-sm'>{formik.errors.password}</p>
          )}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center text-sm mt-4'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-blue-600 font-medium hover:underline'
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
