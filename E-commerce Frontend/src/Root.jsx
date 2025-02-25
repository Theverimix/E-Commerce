import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import { ToastProvider } from './providers/ToastProvider'
import { ProductsProvider } from './providers/ProductsProvider'
import { PrimeReactProvider } from 'primereact/api'
import TokenExpirationAlert from './components/TokenExpirationAlert/TokenExpirationAlert'

const pt = {
    global: {
        css: `body { margin: 0; background-color: #1a1a1a; } #root { z-index: 99; }`,
    },
}

const Root = () => {
    return (
        <>
            <PrimeReactProvider value={{ pt }}>
                <ProductsProvider>
                    <Header />
                    <ToastProvider maxToasts={1}>
                        <TokenExpirationAlert
                            onRenew={() => {
                                console.log('onRenew')
                            }}
                        />
                        <div id='content' className='flex justify-content-center w-full'>
                            <div className='w-full sm:w-full lg:w-9'>
                                <Outlet />
                            </div>
                        </div>
                    </ToastProvider>
                    <Footer />
                </ProductsProvider>
            </PrimeReactProvider>
        </>
    )
}

export default Root
