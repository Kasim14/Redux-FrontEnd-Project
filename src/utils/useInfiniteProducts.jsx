import React from 'react'
import axios from '../api/axiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { loadLazyProduct, loadProduct } from '../store/reducers/productSlice'


const useInfiniteProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.productReducer.products)
    const [skip, setSkip] = React.useState(0)
    const [hasMore, setHasMore] = React.useState(true)


    const fetchProducts = React.useCallback(async (skipValue = 0) => {
        try {
            const response = await axios.get(`/products?_limit=5&_start=${skipValue}`)
            console.log("Products response", response)

            if(skipValue === 0){
                dispatch(loadProduct(response.data))
            } else {
                dispatch(loadLazyProduct(response.data))
            }

            // Check if there are fewer products than requested (means we reached the end)
            if(response.data.length < 5){
                setHasMore(false)
            }

            setSkip(skipValue + 5)
        }
        catch (error) {
            console.error('Error fetching products:', error)
            setHasMore(false)
        }
    }, [dispatch])

    React.useEffect(() => {
        fetchProducts(0)
    }, [fetchProducts])


    return { products, fetchProducts, hasMore, skip }
}

export default useInfiniteProducts
