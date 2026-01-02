import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='h-full max-w-7xl bg-white shadow-2xl rounded-full flex justify-around items-center p-2 mx-auto'>
      <div className='w-[10%] flex  items-center justify-center gap-2'>
        <img
          src='https://images.icon-icons.com/1945/PNG/512/iconfinder-blog-4661578_122455.png'
          alt='logo'
          className='h-10 w-10  border-2 border-amber-600  bg-gray-600 p-1 rounded-full'
        />
        <h1 className='text-2xl font-bold '>Blog</h1>
      </div>
      <div className='w-[80%] flex justify-center gap-50 items-center '>
        <Link to={'/'} className='font-bold hover:underline cursor-pointer '>
          Home
        </Link>
        <Link
          to={'/blogs'}
          className='font-bold hover:underline cursor-pointer '
        >
          Blogs
        </Link>
        <Link
          to={'/about'}
          className='font-bold hover:underline cursor-pointer '
        >
          About
        </Link>
      </div>
    </div>
  )
}
