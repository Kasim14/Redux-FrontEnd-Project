import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncEditUser } from '../store/actions/userActions'
import InfiniteScroll from 'react-infinite-scroll-component'
import useInfiniteProducts from '../utils/useInfiniteProducts'


const Products = () => {

  const {users} = useSelector((state)=>state.userReducer)
  const dispatch = useDispatch()

  // Use the custom hook
  const { products: data, fetchProducts, hasMore, skip } = useInfiniteProducts()

  const addToCartHandler = (product) =>{
    const copyUser = {...users , cart: [ ...users.cart ]}
    // console.log("Copy User",copyUser)
    const x = copyUser.cart.findIndex((c)=> c?.product?.id==product.id )
    if(x==-1){
      copyUser.cart.push({product,quantity:1})
    }
    else{
      copyUser.cart[x] = {
        product,
        quantity : copyUser.cart[x].quantity + 1
      }
    }
    // console.log(copyUser)
    dispatch(asyncEditUser(users.id, copyUser))
    // const cartItem ={
    //   productId : id,
    //   quantity : 1
    // }
  }

  return data && (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Our Products</h2>
        
        {data.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No products available</div>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchProducts(skip)}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                <p className="text-gray-600 mt-2">Loading more products...</p>
              </div>
            }
            endMessage={
              <p className="text-center text-gray-600 py-8">
                <b>🎉 You have seen all products!</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-teal-600 font-medium uppercase mb-1">{product.category}</p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-bold text-gray-900 mb-2">${product.price}</span>
                      <div className="flex gap-2 w-full">
                        <button 
                          onClick={() => addToCartHandler(product)}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                        >
                          Add to Cart
                        </button>
                        <Link 
                          to={`/product/${product.id}`}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-teal-700 px-4 py-2 rounded-md text-sm font-medium text-center transition-colors duration-300"
                        >
                          More Info.
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default Products
