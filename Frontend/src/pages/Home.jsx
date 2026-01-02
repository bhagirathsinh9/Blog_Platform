import { useSelector } from 'react-redux'
import HomeBlogDemo from '../componets/Home/HomeBlogDemo'
import HomeHeader from '../componets/Home/HomeHeader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const user = useSelector((store) => store.auth.user)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className='my-5'>
      <HomeHeader />
      <HomeBlogDemo />
    </div>
  )
}
