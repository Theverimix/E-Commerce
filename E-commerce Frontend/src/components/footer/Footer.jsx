import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <hr className='border-bottom-2 border-solid border-primary m-0' />
            <footer className='py-6 md:py-12 surface-hover flex justify-content-center'>
                <div className='mx-auto grid sm:gap-4 md:gap-4 lg:gap-4 xl:gap-8 px-4 md:px-6'>
                    <div className='flex flex-column sm:col-12 md:col-12 lg:col-12 xl:col justify-content-start gap-4'>
                        <Link href='#' className='flex justify-content-center gap-2' prefetch={false}>
                            <img
                                alt='logo'
                                className='sm:w-12rem md:w-12rem lg:w-8rem'
                                src='/icons/Brutal_black_bottomless.png'
                            />
                        </Link>
                        <p className='text-center text-800'>Discover the best products for your home and lifestyle.</p>
                    </div>
                    <div className='sm:col-6 md:col-4 lg:col '>
                        <h4 className='font-semibold sm:text-3xl md:text-3xl lg:text-2xl mb-3 mt-0'>Navigation</h4>
                        <nav className='flex flex-column gap-1'>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                                to={'/'}
                            >
                                Home
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                            >
                                About
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                to={'/products'}
                                prefetch={false}
                            >
                                Products
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div className='sm:col-5 md:col-3 lg:col'>
                        <h4 className='font-semibold sm:text-3xl md:text-3xl lg:text-2xl mb-3 mt-0'>Categories</h4>
                        <nav className='flex flex-column gap-1'>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                                to={'/products?category=supplements'}
                            >
                                Supplements
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                                to={'/products?category=accessories'}
                            >
                                Accesories
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                                to={'/products?category=clothes'}
                            >
                                Clothes
                            </Link>
                            <Link
                                href='#'
                                className='col sm:text-lg md:text-lg lg:text-base text-800 no-underline hover:text-primary py-1 px-0'
                                prefetch={false}
                                to={'/products?category=equipment'}
                            >
                                Equipment
                            </Link>
                        </nav>
                    </div>
                    <div className=' sm:col-12 md:col-4 lg:col'>
                        <h4 className='font-semibold sm:text-3xl md:text-3xl lg:text-2xl mb-3 mt-0'>Contact</h4>
                        <div className='flex flex-column gap-1 text-800 sm:text-lg md:text-lg lg:text-base'>
                            <p className='col m-0 py-1 py-1 px-0'>123 Main Street</p>
                            <p className='col m-0 py-1 py-1 px-0'>Anytown, USA 12345</p>
                            <p className='col m-0 py-1 py-1 px-0'>Phone: (555) 555-5555</p>
                            <p className='col m-0 py-1 py-1 px-0'>Email: info@acmestore.com</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
