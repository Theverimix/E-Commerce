import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import { ToastProvider } from './providers/ToastProvider'
import { ProductsProvider } from './providers/ProductsProvider'

const Root = () => {
    return (
        <>
            <ProductsProvider>
                <Header />
                <ToastProvider maxToasts={1}>
                    <div id='content' className='flex justify-content-center w-full'>
                        <div className='sm:w-full lg:w-9'>
                            <Outlet />
                        </div>
                    </div>
                </ToastProvider>
                <Footer />
            </ProductsProvider>
        </>
    )
}

export default Root
