import React, { useEffect, useRef, useState } from 'react'
import ProductList from '../product/ProductList'
import { useProducts } from '../../providers/ProductsProvider'

import './cart.css'
import { Link } from 'react-router-dom'
import CartSummary from './cartSummary'
import { all } from 'axios'

export default function cart() {
    const { allProducts, removeProduct } = useProducts()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cache, setCache] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                setProducts(allProducts)
            } catch (error) {
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [allProducts])

    const handleRemoveProduct = (product) => {
        removeProduct(product.id)
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
                        products={products}
                        isLoading={isLoading}
                        removeButton
                        linkeable
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
