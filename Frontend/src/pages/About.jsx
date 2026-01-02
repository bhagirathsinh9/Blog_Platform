import React from 'react'

export default function About() {
  return (
    <div className='my-8 px-4'>
      <div className='text-center border-2 rounded-2xl max-w-xl mx-auto bg-violet-400 p-6'>
        <h1 className='text-2xl md:text-3xl font-bold'>
          Welcome to About Page
        </h1>
        <p className='text-white mt-2'>No. 1 Blogging Platform</p>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-10 my-10 max-w-6xl mx-auto'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <div className='border-2 border-amber-600 bg-gray-600 p-6 rounded-full'>
            <img
              src='https://images.icon-icons.com/1945/PNG/512/iconfinder-blog-4661578_122455.png'
              alt='Blog Logo'
              className='w-48 md:w-64 h-auto'
            />
          </div>
        </div>

        <div className='w-full md:w-1/2'>
          <ul className='space-y-6 text-gray-800'>
            <li className='text-base md:text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              sequi consectetur quaerat exercitationem nesciunt earum id
              corporis debitis.
            </li>
            <li className='text-base md:text-lg'>
              Voluptatem, aperiam corporis! Omnis placeat consequatur rem
              necessitatibus non facilis deleniti nihil suscipit reprehenderit.
            </li>
            <li className='text-base md:text-lg'>
              Cupiditate sed non ut deserunt eveniet numquam totam, vitae
              aliquid est voluptates ea cum voluptas amet facilis!
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
