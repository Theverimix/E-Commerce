import Gallery from '../../components/Galleria/Galleria'
import { Button } from 'primereact/button'

import Carousel from '../../components/homeCarousel/homeCarousel'

import './HomeStyle.css'
import '../../styles/appWeb.css'
import '../welcome/welcome.css'

import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    const categories = [
        {
            name: 'SUPPLEMENTS',
            url: '/products?category=supplements',
            image: '/img/categories/supplements_portrait.png',
        },
        {
            name: 'EQUIPMENT',
            url: '/products?category=equipment',
            image: '/img/categories/equipment_portrait.png',
        },
        {
            name: 'ACCESSORIES',
            url: '/products?category=accessories',
            image: '/img/categories/accessories_portrait.png',
        },
        {
            name: 'CLOTHES',
            url: '/products?category=clothes',
            image: '/img/categories/clothes_portrait.png',
        },
    ]

    return (
        <>
            <div>
                <div className='galleryMain mt-3'>
                    <Gallery />
                </div>

                <div className='flex justify-content-center align-items-center flex-column'>
                    <h1 className='mb-1'>CATEGORIES</h1>
                    <p className='text-center max-w-30rem'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consectetur non fugiat dicta ab
                        nulla commodi quas voluptatibus cum sint accusantium soluta, tenetur officia delectus accusamus
                        dolore expedita eum aliquam.
                    </p>
                    <Button
                        label='All Products'
                        className='my-3 font-semibold'
                        onClick={() => {
                            navigate(`/products`)
                        }}
                    ></Button>
                </div>

                {/* <div className='grid m-auto max-w-15rem my-3 gap-3'>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className='box col p-4 fadein animation-duration-500 cursor-pointer surface-hover border-round-md'
                            onClick={() => navigate(category.url)}
                        >
                            <div className='surface-card mb-4 w-full text-center p-5'>
                                <img src={category.image} className='w-10' alt={category.name} />
                            </div>

                            <div className='flex align-items-center mb-4 justify-content-center'>
                                <div className='block font-semibold mb-1' onClick={() => navigate(category.url)}>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className='grid justify-content-center m-auto my-3 gap-3'>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className='box xl:col-2 lg:col-2 md:col-4 sm:col-4 col-4 p-4 fadein animation-duration-500 cursor-pointer surface-hover border-round-md'
                            onClick={() => navigate(category.url)}
                        >
                            <div className=' mb-4 w-full text-center p-0 xl:p-2'>
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
                    <h1 className='mb-1'>BEST PRODUCTS</h1>
                    <p className='text-center max-w-30rem'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consectetur non fugiat dicta ab
                        nulla commodi quas voluptatibus cum sint accusantium soluta, tenetur officia delectus accusamus
                        dolore expedita eum aliquam.
                    </p>
                    <Button
                        label='All Products'
                        className='mt-2 font-semibold'
                        onClick={() => {
                            navigate(`/products`)
                        }}
                    ></Button>
                </div>

                <div className='carousel'>
                    <Carousel />
                </div>
            </div>
        </>
    )
}
