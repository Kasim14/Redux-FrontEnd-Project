import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { lazy } from 'react'
import { useSelector } from 'react-redux'

// import Home from '../pages/Home'
const Home = React.lazy(()=>import('../pages/Home'))
// import Cart from '../pages/Cart'
const Cart = React.lazy(()=>import('../pages/Cart'))
// import Products from '../pages/Products'
const Products = React.lazy(()=>import('../pages/Products'))
// import Login from '../pages/Login'
const Login = React.lazy(()=>import('../pages/Login'))
// import Register from '../pages/Register'
const Register = React.lazy(()=>import('../pages/Register'))
// import CreateProduct from '../pages/admin/CreateProduct'
const CreateProduct = React.lazy(()=>import('../pages/admin/CreateProduct'))
import UpdateProduct from '../pages/admin/UpdateProduct'
// const UpdateProduct = React.lazy(()=>import('../pages/admin/UpdateProduct'))
import ProductDetail from '../pages/ProductDetail'
// const ProductDetail = React.lazy(()=>import('../pages/ProductDetail'))
import MyProfile from '../pages/MyProfile'
// const MyProfile = lazy(()=>import('../pages/MyProfile'))
import EditProfile from '../pages/EditProfile'
// const EditProfile = lazy(()=>import('../pages/EditProfile'))
import PageNotFound from '../pages/PageNotFound'
// const PageNotFound = lazy(()=>import('../pages/PageNotFound'))
import AuthWrapper from './AuthWrapper'
// const AuthWrapper = lazy(()=>import('./AuthWrapper'))




const Mainroutes = () => {
  const {users} = useSelector((st)=>st.userReducer)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route path='/admin/create-product' element={<AuthWrapper><CreateProduct /></AuthWrapper>}></Route>
        <Route path="/product/:id" element={<AuthWrapper><ProductDetail /></AuthWrapper>}/>
        <Route path="/my-profile" element={<AuthWrapper><MyProfile /></AuthWrapper>}/>
        <Route path="/my-profile/edit/:id" element={<AuthWrapper><EditProfile /></AuthWrapper>}/>

        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default Mainroutes
