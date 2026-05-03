import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const MyProfile = () => {
    const users = useSelector((state)=>state.userReducer.users)
    // console.log(user)
    
    // Extract user properties
    const { 
        id, 
        email, 
        username, 
        name, 
        phone, 
        address,
        firstName,
        lastName 
    } = users || {}
    
    // Handle name from different sources
    const fullName = name 
        ? `${name.firstname} ${name.lastname}` 
        : `${firstName || ''} ${lastName || ''}`.trim() || 'User'
    
    const firstNameVal = name?.firstname || firstName || ''
    const lastNameVal = name?.lastname || lastName || ''
    
    // Handle address properties
    const city = address?.city || ''
    const street = address?.street || ''
    const zipcode = address?.zipcode || ''
    const geolocation = address?.geolocation || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        

        <div className='bg-gradient-to-r from-teal-600 to-teal-800 p-5 mb-5 flex justify-between items-center'>
            <div className="flex items-end">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-teal-100 flex items-center justify-center text-4xl font-bold text-teal-600 shadow-lg">
                  {firstNameVal.charAt(0).toUpperCase()}{lastNameVal.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4 mb-1 flex flex-col gap-3">
                  <h1 className="text-4xl font-bold text-white">{fullName}</h1>
                  <p className="text-teal-100 text-xl bg-teal-100 rounded-full text-teal-700 text-center">
                    {
                        users.isAdmin ? "Admin" : "User"
                    }
                  </p>
                </div>
              </div>
              <div>
                <NavLink to={`/my-profile/edit/${id}`} 
                className="bg-teal-600 text-2xl hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-medium transition duration-300 shadow-md">
                    Edit
                </NavLink>
              </div>
        </div>


        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-teal-500 rounded mr-2"></span>
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">First Name</span>
                <span className="font-medium text-gray-800">{firstNameVal}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Last Name</span>
                <span className="font-medium text-gray-800">{lastNameVal}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-800">{email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-800">{phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">User ID</span>
                <span className="font-medium text-gray-600 text-sm">{id}</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-teal-500 rounded mr-2"></span>
              Address Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">City</span>
                <span className="font-medium text-gray-800">{city || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Street</span>
                <span className="font-medium text-gray-800">{street || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Zipcode</span>
                <span className="font-medium text-gray-800">{zipcode || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Latitude</span>
                <span className="font-medium text-gray-800">{geolocation?.lat || 'Not provided'}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Longitude</span>
                <span className="font-medium text-gray-800">{geolocation?.long || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <NavLink 
            to="/" 
            className="text-teal-600 hover:text-teal-800 font-medium transition duration-300"
          >
            ← Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
