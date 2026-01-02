// import React from 'react'
// import Navbar from '../componets/shared/Navbar'
// import { Outlet } from 'react-router-dom'

// export default function MainLayout() {
//   return (
//     <div className='h-screen'>
//       <div className='bg-gray-100 h-screen w-full'>
//         <div className='p-3'>
//           <Navbar />
//         </div>

//         <Outlet />
//       </div>
//     </div>
//   )
// }

import React from 'react'
import Navbar from '../componets/shared/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <div className='p-3'>
        <Navbar />
      </div>

      <main className='flex-1 p-3'>
        <Outlet />
      </main>
    </div>
  )
}
