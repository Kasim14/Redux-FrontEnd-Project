import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncEditUser } from '../store/actions/userActions';


const Cart = () => {
  const {users} = useSelector((item)=>item.userReducer)
  const {carts} = useSelector((item)=>item.cartReducer)
  const dispatch = useDispatch()  


  const handleAdd = (index,product) =>{
    const copyUser = {...users,cart:[...users.cart]}
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      // quantity : copyUser.cart[index].quantity + 1
      quantity : copyUser.cart[index].quantity + 1
    }
    // console.log("this is index",product)
    dispatch(asyncEditUser(copyUser.id,copyUser))
  }

  const handleSub = (index,product) =>{
    const copyUser = {...users,cart:[...users.cart]}
    if(users.cart[index].quantity>0){
        copyUser.cart[index] = {
          ...copyUser.cart[index],
          quantity : copyUser.cart[index].quantity - 1
      }
    }
    else{
      copyUser.cart.splice(index,1)
    }
    // console.log("this is index",product)
    dispatch(asyncEditUser(copyUser.id,copyUser))
  }


  // Get cart from either users object or cart reducer
  const cart = users?.cart || carts || []
  console.log(cart)

  // Calculate total price
  const subtotal = cart.reduce((total, item) => {
    const price = item?.price || item?.product?.price || 0;
    const quantity = item?.quantity || 1;
    return total + (price * quantity);
  }, 0);

  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal + shipping;

  const cartItems = cart.map((prod,index) => {
    // Handle different possible property names for product data
    const productTitle = prod?.title || prod?.name || prod?.product?.title || "Product Name";
    const productImage = prod?.image || prod?.imageUrl || prod?.product?.image || "https://via.placeholder.com/80";
    const productPrice = prod?.price || prod?.product?.price || "999";
    const productDesc = prod?.description || prod?.desc || prod?.product?.description || "Short product description goes here.";
    const productQuantity = prod?.quantity || 1;
    const productId = prod?.id || Math.random();

    return (
      <div key={productId} className="flex flex-col md:flex-row items-center py-4 gap-4">
        <img
          src={productImage}
          alt={productTitle}
          className="w-20 h-20 rounded-lg object-cover border"
        />
        <div className="flex-1 w-full md:w-auto">
          <div className="font-semibold text-gray-800">{productTitle}</div>
          {/* <div className="text-gray-500 text-sm">
            {productDesc}
          </div> */}
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button onClick={()=>handleSub(index,prod)} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-l">
            -
          </button>
          <span className="px-3">{productQuantity}</span>
          <button onClick={()=>handleAdd(index,prod)} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-r">
            +
          </button>
        </div>
        <div className="font-semibold text-teal-700 w-20 text-right">
          ₹{productPrice}
        </div>
        <button className="ml-2 text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>
    );
  });

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Items</h3>
            {cart.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {cartItems}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Your cart is empty</div>
            )}
          </div>
          {/* Cart Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Subtotal ({cart.length} items)</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between py-2 mt-2 text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium shadow-md transition duration-300 text-lg">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
