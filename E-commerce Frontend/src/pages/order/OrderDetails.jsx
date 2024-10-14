import { useLocation } from 'react-router-dom'
import ProductList from '../../components/product/ProductList'
import CartSummary from '@/components/cart/CartSummary'

export default function OrderDetails({ order }) {
    const location = useLocation()
    const orderFetch = order || location.state.order

    console.log('orderFetch:', orderFetch)
    const getProducts = () =>
        orderFetch.details.map((detail) => {
            return {
                ...detail.product,
                price: detail.price,
                quantity: detail.amount,
            }
        })

    return (
        <>
            <div className='w-25rem'>
                <div className='flex justify-content-between flex-wrap pb-2 text-600'>
                    <span>Order No:</span>
                    <span>{orderFetch.id}</span>
                </div>
                <div className='flex justify-content-between flex-wrap pb-2 text-600'>
                    <span>Client:</span>
                    <span>
                        {orderFetch.customer.firstname} {orderFetch.customer.lastname}
                    </span>
                </div>
                <div className='flex justify-content-between flex-wrap pb-2 text-600'>
                    <span>Address:</span>
                    <span>{orderFetch.address}</span>
                </div>
                <div className='flex justify-content-between flex-wrap pb-2 text-600'>
                    <span>Order date:</span>
                    <span>{orderFetch.createdAt}</span>
                </div>
                <div className='flex justify-content-between flex-wrap pb-2 text-600'>
                    <span>Order status:</span>
                    <span>{orderFetch.status}</span>
                </div>
                <div className='flex justify-content-between flex-wrap pb-4 text-600'>
                    <span>Tracking number:</span>
                    <span>4564648789551</span>
                </div>

                {/* <ProductList products={getProducts()} productQuantity linkeable height='300px' /> */}
                <span className='text-xl font-semibold'> Order Summary</span>
                <div className='w-full pt-3'>
                    <CartSummary products={getProducts()}></CartSummary>
                </div>
            </div>
        </>
    )
}
