import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const Home = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div>{user.user?.firstName}</div>
  )
}

export default Home