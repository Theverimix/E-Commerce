import Home from '@/pages/home/Home'

import { PublicPaths } from './constants/paths'
import { getProducts } from '@/apis/product-api'
import { defer, Route } from 'react-router-dom'

const PublicRoutes = () => (
    <>
        <Route
            index
            element={<Home />}
            loader={async () => {
                return defer({ data: getProducts(0) })
            }}
        />
        <Route path={PublicPaths.CATALOG} lazy={() => import('@/pages/products/ProductCatalog')} />
        <Route path={PublicPaths.PRODUCT} lazy={() => import('@/pages/products/ProductPage')} />
        <Route path={PublicPaths.CART} lazy={() => import('@/components/cart/cart')} />
    </>
)

export default PublicRoutes
