import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Root from './Root.jsx'
import AuthPage from './pages/auth/AuthPage.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Home from './pages/home/Home.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import ProductPage from './pages/products/ProductPage.jsx'
import OrderPage from './pages/order/OrderPage.jsx'
import ShopCart from './pages/cart/ShopCart.jsx'
import Catalog from './pages/products/ProductCatalog.jsx'
import Profile from './pages/profile/Profile.jsx'
import CheckoutPage from './pages/checkout/CheckoutPage.jsx'
import Account from './pages/account/Account.jsx'
import PersonalData from './pages/account/PersonalData.jsx'
import CustomerAddresses from './pages/account/CustomerAddresses.jsx'
import ProfileCard from './pages/account/ProfileCard.jsx'
import AdminPage from './pages/admin/AdminPage.jsx'
import ProductAdminPage from './pages/admin/product/ProductAdminPage.jsx'
import ProductPanel from './pages/admin/product/ProductPanel.jsx'
import ProductTable from './pages/admin/product/ProductTable.jsx'

import PrivateRoutes from './apis/PrivateRoutes.jsx'

import '../src/styles/appWeb.css'
import CustomerAdminPage from './pages/admin/customers/CustomerAdminPage.jsx'
import CustomerTable from './pages/admin/customers/CustomerTable.jsx'
import CustomerPanel from './pages/admin/customers/CustomerPanel.jsx'

const AppWeb = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Root />}>
                <Route path='' element={<Home />} />
                <Route path='products' element={<Catalog />} />
                <Route path='products/:id' element={<ProductPage />} />
                <Route path='cart' element={<ShopCart />} />
                <Route path='search' element={<ProductPage />} />
                <Route path='terms' element={<></>} />
                <Route path='contact' element={<></>} />

                {/* Private Routes */}
                <Route element={<PrivateRoutes />}>
                    <Route path='checkout' element={<CheckoutPage />} />
                    <Route element={<Account />}>
                        <Route element={<ProfileCard />}>
                            <Route path='account/profile' element={<Profile />} />
                            <Route path='account/data' element={<PersonalData />} />
                            <Route path='account/addresses' element={<CustomerAddresses />} />
                        </Route>
                        <Route path='account/orders' element={<OrderPage />} />
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<PrivateRoutes isAdmin />}>
                    <Route path='admin' element={<AdminPage />}>
                        <Route path='products' element={<ProductAdminPage />}>
                            <Route path='' element={<ProductTable />} />
                            <Route path='new' element={<ProductPanel />} />
                            <Route path=':id' element={<ProductPanel editMode />} />
                        </Route>
                        <Route path='customers' element={<CustomerAdminPage />}>
                            <Route path='' element={<CustomerTable />} />
                            {/* <Route path='new' element={<CustomerPanel />} /> */}
                            <Route path=':id' element={<CustomerPanel />} />
                        </Route>
                        <Route path='orders' element={<ProductAdminPage />}>
                            <Route path='' element={<ProductTable />} />
                            <Route path=':id' element={<ProductPanel />} />
                        </Route>
                        <Route path='sales' element={<ProductAdminPage />}>
                            <Route path='' element={<ProductTable />} />
                            <Route path='new' element={<ProductPanel />} />
                            <Route path=':id' element={<ProductPanel />} />
                        </Route>
                        <Route path='categories' element={<ProductAdminPage />}>
                            <Route path='' element={<ProductTable />} />
                            <Route path='new' element={<ProductPanel />} />
                            <Route path=':id' element={<ProductPanel />} />
                        </Route>
                    </Route>
                </Route>

                {/* Auth Routes */}
                <Route element={<AuthPage />}>
                    <Route path='auth/login' element={<Login />} />
                    <Route path='auth/signup' element={<Register />} />
                </Route>
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
)

export default AppWeb
