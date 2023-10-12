import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import NavBar from '../components/NavBar'

const Home = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div>
      <NavBar />
      {user.user?.firstName}
    </div>
  )
}

export default Home