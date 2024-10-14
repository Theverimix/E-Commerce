import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProductCarousel from '@/components/home/ProductCarousel'
import Banner from '@/components/home/CategoriesGallery'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import CustomHeader from '@/components/home/CustomHeader'
import { Badge } from 'primereact/badge'

export const Component = () => <Home />

export default function Home() {
    const navigate = useNavigate()
    const data = useLoaderData()?.data

    const [products, setProducts] = useState(data)
    const [loading, setLoading] = useState(true)

    const categories = [
        {
            name: 'Suplements',
            url: '/products?category=supplements',
            image: '/img/categories/supplements_portrait.webp',
            description: 'Premium supplements to fuel your fitness journey.',
        },
        {
            name: 'Equipment',
            url: '/products?category=equipment',
            image: '/img/categories/equipment_portrait.webp',
            description: 'High-quality gym equipment for all fitness levels.',
        },
        {
            name: 'Accessories',
            url: '/products?category=accessories',
            image: '/img/categories/accessories_portrait.webp',
            description: 'Essential gym accessories to enhance your workouts.',
        },
        {
            name: 'Clothes',
            url: '/products?category=clothes',
            image: '/img/categories/clothes_portrait.webp',
            description: 'Comfortable and stylish gym wear for every workout.',
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
        <div className='flex flex-column gap-6 py-5'>
            <Banner />
            <div id='categories'>
                <CustomHeader title='Categories' description='Explore our products by category' />
                <div className='grid justify-content-center m-auto p-3 gap-3'>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className='col-12 md:col-5 xl:col align-items-center flex justify-content-center'
                        >
                            <Card className='flex border-round-md w-fit'>
                                <img src={category.image} className='w-full border-round-md' alt={category.name} />
                                <div className='py-3'>
                                    <h3 className='m-0'>{category.name}</h3>
                                    <p className='m-0 py-2 text-gray-300'>{category.description}</p>
                                </div>
                                <Button
                                    className='w-full border-gray-400 border-1 text-white hover:text-primary hover:border-primary'
                                    label='View Products'
                                    outlined
                                    onClick={() => navigate(category.url)}
                                />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* products */}

            <div id='products'>
                <CustomHeader title='Sale Products' description='Browse our wide range of products' />
                <div className='px-3 pb-5'>
                    <ProductCarousel products={products} loading={loading} />
                </div>
            </div>
        </div>
    )
}
