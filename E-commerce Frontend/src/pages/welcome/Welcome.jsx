import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Carousel } from 'primereact/carousel'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import bannerImage from '../../assets/img/ec-banner-definitive.gif'

import './welcome.css'
import { getProducts } from '../../controller/ProductController'

import SaveCartToLocalStorage from '../../components/cart/saveToCart'

//Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
import imgProducts1 from '../../assets/img/products/bcaa-12000.png'
import imgProducts2 from '../../assets/img/products/nitro-bcaa-250.png'
import imgProducts3 from '../../assets/img/products/muscle-builder-7lb-gn.png'
import imgProducts4 from '../../assets/img/products/nobooster-sn.png'

export default function Welcome() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productList = await getProducts(0) // Aquí pasas el número de página que deseas obtener
                console.log('Productos recibidos:', productList) // Aquí verificas los datos recibidos en la consola
                setProducts(productList)
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }

        fetchData()
    }, []) // Se ejecuta solo una vez al montar el componente

    //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE

    // Array of products with attributes: image, name and price
    // const products = [
    //   {
    //     image: imgProducts1,
    //     name: 'Producto 1',
    //     desc: 'Description 1',
    //     stock: 'INSTOCK',
    //     price: 19.99
    //   },
    //   {
    //     image: imgProducts2,
    //     name: 'Producto 2',
    //     desc: 'Description 2',
    //     stock: 'INSTOCK',
    //     price: 29.99
    //   },
    //   {
    //     image: imgProducts3,
    //     name: 'Producto 3',
    //     desc: 'Description 3',
    //     stock: 'LOWSTOCK',
    //     price: 39.99
    //   },
    //   {
    //     image: imgProducts4,
    //     name: 'Producto 4',
    //     desc: 'Description 4',
    //     stock: 'OUTOFSTOCK',
    //     price: 49.99
    //   },
    //   // Add more objects as needed
    // ];

    //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
    // Responsive options for the Carousel component
    const responsiveOptions = [
        {
            breakpoint: '600px',
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: '600px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1,
        },
    ]

    const getSeverity = (product) => {
        switch (product.stock) {
            case 'INSTOCK':
                return 'success'

            case 'LOWSTOCK':
                return 'warning'

            case 'OUTOFSTOCK':
                return 'danger'

            default:
                return null
        }
    }

    //Provisional code to see results. ENABLED TO DELETE IN THE FUTURE
    // Template for each element of the Carousel
    const productTemplate = (product) => {
        return (
            <div className='box p-4 fadein animation-duration-500'>
                <Button icon='pi pi-star' rounded text outlined />
                <div className='surface-card mb-4 w-full text-center p-5'>
                    <img src={product.images[0]} alt={product.name} className='w-10 shadow-2' />
                </div>

                <div className='flex align-items-center mb-4'>
                    <div className='flex flex-column'>
                        <span className='block font-semibold mb-1'>{product.name}</span>
                        <Tag
                            value={product.stock}
                            severity={getSeverity(product)}
                            className='text-secondary text-sm'
                        ></Tag>
                        {/* <span className="text-secondary text-sm">{product.desc}</span> */}
                    </div>
                    <span className='font-medium text-xl ml-auto'>${product.price.toFixed(2)}</span>
                </div>
                <div className='mt-5 flex flex-wrap gap-2 justify-content-center'>
                    <Button
                        label='Add to cart'
                        icon='pi pi-shopping-cart'
                        outlined
                        badgeClassName='p-badge-danger'
                        className='w-full p-button p-component p-button-outlined'
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <SaveCartToLocalStorage></SaveCartToLocalStorage>
        </>
    )
}
