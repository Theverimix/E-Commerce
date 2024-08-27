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
import ProductTable from './pages/admin/products/ProductTable.jsx'
import AddressRegistrationForm from './pages/account/AddressRegistrationForm.jsx'
import AddressUpdateForm from './pages/account/AddressUpdateForm.jsx'

import PrivateRoutes from './routes/PrivateRoutes.jsx'

import CustomerAdminPage from './pages/admin/customers/CustomerAdminPage.jsx'
import CustomerTable from './pages/admin/customers/CustomerTable.jsx'
import CustomerPanel from './pages/admin/customers/CustomerPanel.jsx'
import SaleTable from './pages/admin/sales/SaleTable.jsx'
import SaleForm from './pages/admin/sales/SaleForm.jsx'
import OrderTable from './pages/admin/orders/OrderTable.jsx'
import OrderDetails from './pages/order/OrderDetails.jsx'
import CategoryTable from './pages/admin/categories/CategoryTable.jsx'
import CategoryForm from './pages/admin/categories/CategoryForm.jsx'
import Security from './pages/account/Security.jsx'
import { ProductForm } from './pages/admin/products/ProductForm.jsx'

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
                            <Route path='account/createAddress' element={<AddressRegistrationForm />} />
                            <Route path='account/updateAddress/:id' element={<AddressUpdateForm />} />
                            <Route path='account/security' element={<Security />} />
                        </Route>
                        <Route path='account/orders' element={<OrderPage />} />
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<PrivateRoutes isAdmin />}>
                    <Route element={<AdminPage />}>
                        <Route element={<ProfileCard isAdmin />}>
                            <Route path='admin/profile' element={<Profile isAdmin />} />
                            <Route path='admin/data' element={<PersonalData isAdmin />} />
                        </Route>

                        <Route path='admin/products'>
                            <Route path='' element={<ProductTable />} />
                            <Route path='new' element={<ProductForm />} />
                            <Route path=':id' element={<ProductForm edit />} />
                        </Route>
                        <Route path='admin/customers' element={<CustomerAdminPage />}>
                            <Route path='' element={<CustomerTable />} />
                            <Route path=':id' element={<CustomerPanel />} />
                        </Route>
                        <Route path='admin/orders'>
                            <Route path='' element={<OrderTable />} />
                            <Route path=':id' element={<OrderDetails />} />
                        </Route>
                        <Route path='admin/sales'>
                            <Route path='' element={<SaleTable />} />
                            <Route path='new' element={<SaleForm />} />
                            <Route path=':id' element={<SaleForm edit />} />
                        </Route>
                        <Route path='admin/categories'>
                            <Route path='' element={<CategoryTable />} />
                            <Route path='new' element={<CategoryForm />} />
                            <Route path=':id' element={<CategoryForm edit />} />
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
