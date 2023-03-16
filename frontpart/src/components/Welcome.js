// Global import
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// local import


const Welcome = ({changeAuth}) => {
  const navigate = useNavigate()

  const isAuth = useSelector(state => state.user.isAuth);

  useEffect(() => {
    if(!isAuth) navigate('/login');
    else {
      changeAuth()
      navigate('/home')
    }
  }, [isAuth])
  return (
    <div>Welcome</div>
  )
}

export default Welcome