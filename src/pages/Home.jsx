import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl border border-gray-200 p-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-700 mb-4 text-center drop-shadow">Welcome to Sheriyans Store</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center max-w-2xl">
          Discover the best products at unbeatable prices. Shop electronics, clothing, books, home essentials, sports gear, and more. Enjoy a seamless shopping experience with secure checkout and fast delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/products" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg text-lg text-center transition duration-300 shadow-md">
            Shop Now
          </Link>
          <Link to="/register" className="w-full sm:w-auto bg-white border border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold py-3 px-8 rounded-lg text-lg text-center transition duration-300 shadow-md">
            Create Account
          </Link>
        </div>
        <div className="mt-10 w-full">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" alt="Online Shopping" className="rounded-lg w-full object-cover max-h-72 shadow" />
        </div>
      </div>
    </div>
  )
}

export default Home
