import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, defer } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage.jsx'
import PrivateRoutes from './routes/PrivateRoutes.jsx'
import AdminPage from './pages/admin/AdminPage.jsx'
import ProfileCard from './pages/account/ProfileCard.jsx'
import Account from './pages/account/Account.jsx'
import { PublicPaths } from './routes/constants/paths.js'
import Home from './pages/home/Home.jsx'
import { getProducts } from './apis/product-api.jsx'
import Root from './Root.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root />}>
            <Route
                index
                element={<Home />}
                loader={async () => {
                    return defer({ data: getProducts(0) })
                }}
            />
            <Route path={PublicPaths.CATALOG} lazy={() => import('./pages/products/ProductCatalog.jsx')} />
            <Route path={PublicPaths.PRODUCT} lazy={() => import('./pages/products/ProductPage.jsx')} />
            <Route path={PublicPaths.CART} lazy={() => import('./pages/cart/ShopCart.jsx')} />
            <Route path={PublicPaths.SEARCH} lazy={() => import('./pages/products/ProductPage.jsx')} />

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
                <Route path='checkout' lazy={() => import('./pages/checkout/CheckoutPage.jsx')} />
                <Route element={<Account />}>
                    <Route element={<ProfileCard />}>
                        <Route path='account/profile' lazy={() => import('./pages/profile/Profile.jsx')} />
                        <Route path='account/data' lazy={() => import('./pages/account/PersonalData.jsx')} />
                        <Route path='account/addresses' lazy={() => import('./pages/account/CustomerAddresses.jsx')} />
                        <Route
                            path='account/createAddress'
                            lazy={() => import('./pages/account/AddressRegistrationForm.jsx')}
                        />
                        <Route
                            path='account/updateAddress/:id'
                            lazy={() => import('./pages/account/AddressUpdateForm.jsx')}
                        />
                        <Route path='account/security' lazy={() => import('./pages/account/Security.jsx')} />
                    </Route>
                    <Route path='account/orders' lazy={() => import('./pages/order/OrderPage.jsx')} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<PrivateRoutes isAdmin />}>
                <Route element={<AdminPage />}>
                    <Route element={<ProfileCard isAdmin />}>
                        <Route path='admin/profile' lazy={() => import('./pages/profile/Profile.jsx')} />
                        <Route path='admin/data' lazy={() => import('./pages/account/PersonalData.jsx')} />
                    </Route>

                    <Route path='admin/products'>
                        <Route index lazy={() => import('./pages/admin/products/ProductTable.jsx')} />
                        <Route path='new' lazy={() => import('./pages/admin/products/ProductForm.jsx')} />
                        <Route path=':id' lazy={() => import('./pages/admin/products/ProductForm.jsx')} />
                    </Route>
                    <Route path='admin/customers'>
                        <Route index lazy={() => import('./pages/admin/customers/CustomerTable.jsx')} />
                        <Route path=':id' lazy={() => import('./pages/admin/customers/CustomerPanel.jsx')} />
                    </Route>
                    <Route path='admin/orders'>
                        <Route index lazy={() => import('./pages/admin/orders/OrderTable.jsx')} />
                        <Route path=':id' lazy={() => import('./pages/order/OrderDetails.jsx')} />
                    </Route>
                    <Route path='admin/sales'>
                        <Route index lazy={() => import('./pages/admin/sales/SaleTable.jsx')} />
                        <Route path='new' lazy={() => import('./pages/admin/sales/SaleForm.jsx')} />
                        <Route path=':id' lazy={() => import('./pages/admin/sales/SaleForm.jsx')} />
                    </Route>
                    <Route path='admin/categories'>
                        <Route index lazy={() => import('./pages/admin/categories/CategoryTable.jsx')} />
                        <Route path='new' lazy={() => import('./pages/admin/categories/CategoryForm.jsx')} />
                        <Route path=':id' lazy={() => import('./pages/admin/categories/CategoryForm.jsx')} />
                    </Route>
                </Route>
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthPage />}>
                <Route path='auth/login' lazy={() => import('./pages/auth/Login.jsx')} />
                <Route path='auth/signup' lazy={() => import('./pages/auth/Register.jsx')} />
            </Route>

            {/* Fallback Route */}
            <Route path='*' lazy={() => import('./pages/error/ErrorPage.jsx')} />
        </Route>,
    ),
)

const AppWeb = () => <RouterProvider router={router} />

export default AppWeb
