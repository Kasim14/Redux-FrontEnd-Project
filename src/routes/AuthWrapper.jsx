import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



function AuthWrapper(props) {
    const {users} = useSelector((state)=>state.userReducer)
    console.log(users)
    return users && Object.keys(users).length > 0 
  ? props.children 
  : <Navigate to='/login' />
}

export default AuthWrapper
