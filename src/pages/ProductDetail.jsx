
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncDeleteProduct, asyncUpdateProduct } from '../store/actions/productAction';
// useForm

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.products);
  const prod = products.find((prod) => String(prod.id) === String(id));
  const user = useSelector((state)=>state.userReducer.users)
  console.log(user)

  const { register, handleSubmit, reset,formState: { errors } } = useForm(
    {defaultValues :{
      image: prod?.image,
      title: prod?.title,
      description: prod?.description,
      price: prod?.price,
      category: prod?.category
    }}
  )
    const dispatch = useDispatch()
  
    const handleUpdate = (product) =>{
      dispatch(asyncUpdateProduct(id,product))
    }
    
    const DeleteHandler = () =>{
      dispatch(asyncDeleteProduct(id))
      navigate('/products')
    }


  // Loading state if products are not loaded yet
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-500 animate-pulse">Loading product details...</div>
      </div>
    );
  }

  if (!prod) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-2xl font-bold text-red-500 mb-4">Product Not Found</div>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col gap-8 from-teal-50 to-teal-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8 border border-gray-200">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={prod.image || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={prod.title}
            className="w-full max-w-xs h-auto rounded-lg object-contain border"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{prod.title}</h2>
            <p className="text-teal-700 font-semibold uppercase text-xs mb-2">{prod.category}</p>
            <p className="text-gray-700 mb-4 text-base">{prod.description}</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <div className="text-2xl font-bold text-gray-900">${prod.price}</div>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md text-lg font-medium transition-colors duration-300"
              // onClick={handleAddToCart}
              disabled
            >
              Add to Cart (Demo)
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-base font-medium transition-colors duration-300"
              onClick={() => navigate(-1)}
            >
              Back to Products
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-base font-medium transition-colors duration-300"
              onClick={DeleteHandler}
            >
              Delete Product
            </button>
            
          </div>
        </div>
      </div>
      <div>
        {user && user.isAdmin &&
        <div className="bg-white py-8 px-8 shadow-xl rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            
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
                Update Product
              </button>
            </div>
          </form> 
        </div>}
      </div>

    </div>
  );
};

export default ProductDetail;
