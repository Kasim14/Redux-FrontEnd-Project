import { nanoid } from 'nanoid'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncCreateProduct } from '../../store/actions/productAction'

const CreateProduct = () => {
  const { register, handleSubmit, reset,formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (product) => {
    product.id = nanoid()
    // console.log(product)
    dispatch(asyncCreateProduct(product))
    navigate("/products")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create New Product
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add a new product to your inventory
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white py-8 px-8 shadow-xl rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input 
                type="text" 
                {...register("title", { required: "Title is required" })} 
                placeholder="Enter product title"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition duration-300"
              />
              {errors.title && <span className="text-red-500 text-sm mt-1 block">{errors.title.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })} 
                  placeholder="0.00"
                  className="appearance-none rounded-md relative block w-full pl-8 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition duration-300"
                />
              </div>
              {errors.price && <span className="text-red-500 text-sm mt-1 block">{errors.price.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                {...register("description", { required: "Description is required" })} 
                placeholder="Enter product description"
                rows="4"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition duration-300 resize-none"
              />
              {errors.description && <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                {...register("category", { required: "Category is required" })}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition duration-300 bg-white"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
              </select>
              {errors.category && <span className="text-red-500 text-sm mt-1 block">{errors.category.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input 
                type="text" 
                {...register("image", { required: "Image URL is required" })} 
                placeholder="https://example.com/image.jpg"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition duration-300"
              />
              {errors.image && <span className="text-red-500 text-sm mt-1 block">{errors.image.message}</span>}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
