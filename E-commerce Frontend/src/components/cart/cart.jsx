import React, { useEffect, useRef, useState } from 'react'
import ProductList from '../product/ProductList'
import { getProducts } from '../../controller/ProductController'

import './cart.css'
import { Link } from 'react-router-dom'
import CartSummary from './cartSummary'

export default function cart() {
    const [products, setProducts] = useState([])
    const [totalElements, setTotalElements] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [cache, setCache] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            if (!(page in cache)) {
                setIsLoading(true)
                console.log('Fetching data for page:', page)
                try {
                    const data = await getProducts(page)
                    setProducts(data.products)

                    setCache((prev) => ({
                        ...prev,
                        [page]: data.products,
                    }))

                    setTotalElements(data.totalElements)
                    // console.log("Fetched products:", data.products);
                } catch (error) {
                    console.error('Error al obtener productos:', error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setProducts(cache[page])
            }
        }

        fetchData()
    }, [page])

    const handlePageChange = (newPage) => {
        setPage(newPage) // Cambia la página para actualizar los datos
    }

    const mapProducts = () =>
        products.map((product) => {
            return {
                ...product,
                amount: 1,
            }
        })

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
                        products={mapProducts()}
                        isLoading={isLoading}
                        removeButton
                        linkeable
                        paginator
                        height='30rem'
                        totalElements={totalElements}
                        onPageChange={handlePageChange}
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
