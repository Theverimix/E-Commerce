import { Suspense, useRef, lazy } from 'react'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '/node_modules/primeflex/primeflex.css'
import '../src/styles/appWeb.css'
import '/node_modules/primeflex/primeflex.css'
import '../src/styles/appWeb.css'

import { ToastProvider } from './providers/ToastProvider.jsx'
import { ProductsProvider } from './providers/ProductsProvider.jsx'
import { AuthPage } from './pages/auth/AuthPage.jsx'
import { ProductPanel } from './pages/admin/product/ProductPanel.jsx'
import { ProductTable } from './pages/admin/product/ProductTable.jsx'
import { ProductAdminPage } from './pages/admin/product/ProductAdminPage.jsx'

const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))

const Home = lazy(() => import('./pages/home/Home.jsx'))
const Welcome = lazy(() => import('./pages/welcome/Welcome.jsx'))
const ErrorPage = lazy(() => import('./pages/Error/ErrorPage.jsx'))

const ProductPage = lazy(() => import('./pages/productsPage/ProductPage.jsx'))
const OrderPage = lazy(() => import('./pages/order/OrderPage.jsx'))
const ShopCart = lazy(() => import('./pages/shopCart/ShopCart.jsx'))
const Catalog = lazy(() => import('./pages/productsPage/ProductCatalog.jsx'))
const Profile = lazy(() => import('./pages/profile/Profile.jsx'))
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage.jsx'))

function AppWeb() {
    const toastRef = useRef(null)

    const showToast = (severity, summary, detail) => {
        toastRef.current.show({ severity, summary, detail })
    }

    return (
        <>
            <ToastProvider>
                <ProductsProvider>
                    <BrowserRouter>
                        <Header />
                        <div id='content' className='flex justify-content-center w-full'>
                            <div className='sm:w-full md:w-10 lg:w-9'>
                                <Suspense>
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route path='/home' element={<Home />} />
                                        <Route path='/products' element={<Catalog />} />
                                        <Route path='/products/:id' element={<ProductPage />} />
                                        <Route path='/cart' element={<ShopCart />} />
                                        <Route path='/checkout' element={<CheckoutPage />} />
                                        <Route path='/confirmation' element={<ProductPage />} />
                                        <Route path='/orders' element={<OrderPage />} />
                                        <Route path='/profile' element={<Profile />} />
                                        <Route path='/search' element={<ProductPage />} />
                                        <Route path='/terms' element={<ProductPage />} />
                                        <Route path='/contact' element={<ProductPage />} />
                                        <Route path='/pruebas' element={<Welcome />} />
                                        <Route path='/admin/products' element={<ProductAdminPage />}>
                                            <Route path='list' element={<ProductTable />} />
                                            <Route path='new' element={<ProductPanel />} />
                                            <Route path=':id' element={<ProductPanel />} />
                                        </Route>
                                        <Route path='/auth' element={<AuthPage />}>
                                            <Route path='login' element={<Login />} />
                                            <Route path='signup' element={<Register />} />
                                        </Route>
                                        <Route path='/error' element={<ErrorPage />} />
                                    </Routes>
                                </Suspense>
                            </div>
                        </div>
                        <Footer />
                    </BrowserRouter>
                </ProductsProvider>
            </ToastProvider>
        </>
    )
}

export default AppWeb
