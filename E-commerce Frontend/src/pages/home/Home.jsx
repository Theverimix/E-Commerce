import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProductCarousel from '@/components/carousel/ProductCarousel'
import CategoriesGallery from '@/components/gallery/CategoriesGallery'

export const Component = () => <Home />

export default function Home() {
    const navigate = useNavigate()
    const data = useLoaderData()?.data

    const [products, setProducts] = useState(data)
    const [loading, setLoading] = useState(true)

    const categories = [
        {
            name: 'SUPPLEMENTS',
            url: '/products?category=supplements',
            image: '/img/categories/supplements_portrait.webp',
        },
        {
            name: 'EQUIPMENT',
            url: '/products?category=equipment',
            image: '/img/categories/equipment_portrait.webp',
        },
        {
            name: 'ACCESSORIES',
            url: '/products?category=accessories',
            image: '/img/categories/accessories_portrait.webp',
        },
        {
            name: 'CLOTHES',
            url: '/products?category=clothes',
            image: '/img/categories/clothes_portrait.webp',
        },
    ]

    useEffect(() => {
        if (!data) return
        data.then((data) => {
            const products = data.data.products
            setProducts(products)
            setLoading(false)
        })
    }, [data])

    return (
        <>
            <div className='mt-3'>
                <CategoriesGallery />
            </div>

            <div className='flex justify-content-center align-items-center flex-column mt-5'>
                <p className='pt-6 text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold'>CATEGORIES</p>
            </div>

            <div className='grid justify-content-center m-auto my-3 gap-3'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className='box xl:col-2 lg:col-2 md:col-4 sm:col-4 col-5 p-4 fadein animation-duration-500 cursor-pointer surface-hover border-round-md'
                        onClick={() => navigate(category.url)}
                    >
                        <div className='mb-4 text-center p-0 xl:p-2'>
                            <img src={category.image} className='w-full' alt={category.name} />
                        </div>

                        <div className='flex align-items-center mb-4 justify-content-center'>
                            <div className='block font-semibold mb-1' onClick={() => navigate(category.url)}>
                                {category.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* products */}

            <div className='flex justify-content-center align-items-center flex-column'>
                <p className='text-5xl sm:text-5xl md:text-6xl lg:text-6xl mb-0 pt-6 font-bold'>SALE PRODUCTS</p>
            </div>

            <div className='carousel m-5'>
                <ProductCarousel products={products} loading={loading} />
            </div>
        </>
    )
}
