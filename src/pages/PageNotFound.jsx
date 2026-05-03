import React from 'react'


const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <div className="text-8xl font-extrabold text-teal-600 mb-2">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="mt-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium shadow-md hover:bg-teal-700 transition duration-300">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound
