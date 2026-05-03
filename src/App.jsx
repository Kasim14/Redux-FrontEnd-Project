import React, { Suspense } from 'react'
import axios from './api/axiosConfig';
import { useEffect } from 'react';
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav';
import { useDispatch } from 'react-redux';
import { asyncLoadProducts } from './store/actions/productAction';
import { asyncGetUser } from './store/actions/userActions';


const App = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetUser())
    // dispatch(asyncLoadProducts())
  }, [])

  return (
    <div>
      <Nav/>
      <Suspense fallback={<div className="text-center py-10"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div><p className="text-gray-600 mt-2">Loading...</p></div>}>
        <Mainroutes/>
      </Suspense>
    </div>
  )
}

export default App
