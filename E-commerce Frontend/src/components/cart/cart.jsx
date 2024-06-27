import { useEffect, useRef, useState } from 'react'
import ProductList from '../product/ProductList'
import { useProducts } from '../../providers/ProductsProvider'

import './cart.css'
import { Link } from 'react-router-dom'
import CartSummary from './cartSummary'
import { all } from 'axios'

import { getProductsByIds } from '../../controller/ProductController'
import { Button } from 'primereact/button'

export default function cart() {
    const { allProducts, removeProduct, updateProductAmount } = useProducts()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cache, setCache] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const productsIds = allProducts.map((product) => product.id)
                const response = await getProductsByIds(productsIds)
                const productsWithQuantity = response.map((product) => {
                    const matchedProduct = allProducts.find((p) => p.id === product.id)
                    return {
                        ...product,
                        quantity: matchedProduct ? matchedProduct.amount : 0,
                    }
                })
                setProducts(productsWithQuantity)
                console.log('products: ', products)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [allProducts])

    const handleRemoveProduct = (product) => {
        removeProduct(product.id)
    }

    const handleUpdateProductAmount = (productId, newAmount) => {
        updateProductAmount(productId, newAmount)
    }

    return (
        <div>
            <h1 className='cart-title'>Your Cart</h1>
            <p className='cart-subtitle'>
                Not ready to checkout?{' '}
                <Link style={{ textDecoration: 'none' }} to='/'>
                    Continue Shopping
                </Link>
            </p>
            <div className='grid m-auto mb-6'>
                <div className='col'>
                    <ProductList
                        handleRemoveProduct={handleRemoveProduct}
                        handleUpdateProductAmount={handleUpdateProductAmount}
                        products={products}
                        isLoading={isLoading}
                        removeButton
                        linkeable
                        quantity
                        height='30rem'
                    />
                </div>
                <div className='col-4 justify-content-center text'>
                    <h2 className='text-center'>Order Summary</h2>
                    <CartSummary />
                </div>
            </div>
        </div>
    )
}
