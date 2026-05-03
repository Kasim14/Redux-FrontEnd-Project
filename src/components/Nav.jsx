import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { asyncLogoutUser } from '../store/actions/userActions'

const Nav = () => {

  const user = useSelector((st)=>st.userReducer.users)
  // console.log(user)
   const dispatch = useDispatch()
   const navigate = useNavigate()
  const handleLogout = () =>{
    dispatch(asyncLogoutUser())
    navigate('/')
  }

  const cartCount = user?.cart?.length || 0

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-2xl font-bold hover:text-teal-200 transition duration-300">
              SherShop
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "relative bg-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "relative text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                }
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-teal-900 bg-white rounded-full shadow-md">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              {

                user&&user.isAdmin&&
                <NavLink
                to="/admin/create-product"
                className={({ isActive }) =>
                  isActive
                    ? "bg-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-teal-900 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 bg-white "
                }
              >
                Create Product
              </NavLink>

              }
            </div>
          </div>

          {/* Auth Links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              
              {
                user ?
                
                <>
                <button onClick={handleLogout}
                className="text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  LogOut
                </button> 
                <NavLink
                to="/my-profile"
                className="text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                My Profile
              </NavLink>
                </>
                
                :
                <NavLink
                to="/login"
                className="text-teal-100 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Login
              </NavLink>

              }


              <NavLink
                to="/register"
                className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Register
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="bg-teal-700 inline-flex items-center justify-center p-2 rounded-md text-teal-100 hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-teal-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-teal-100 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "bg-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-teal-100 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "bg-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-teal-100 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/login"
            className="text-teal-100 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-teal-100 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Nav
