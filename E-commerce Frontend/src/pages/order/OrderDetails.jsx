import { useLocation } from 'react-router-dom'
import ProductList from '../../components/product/ProductList'

export default function OrderDetails({ order }) {
    const location = useLocation()
    const orderFetch = order || location.state.order

    console.log('orderFetch:', orderFetch)
    const getProducts = () =>
        orderFetch.details.map((detail) => {
            return {
                ...detail.product,
                price: detail.price,
                amount: detail.amount,
            }
        })

    return (
        <>
            <div>
                <h2>Order Details</h2>
                <h3>Order No: {orderFetch.id}</h3>
                <h3>
                    Client: {orderFetch.customer.firstname} {orderFetch.customer.lastname}
                </h3>
                <h3>Address: {orderFetch.address}</h3>
                <h3>Order date: {orderFetch.createdAt}</h3>
                <h3>Order status: {orderFetch.status}</h3>

                <h4>Tracking number: 4564648789551</h4>

                <ProductList products={getProducts()} linkeable height='300px' />
            </div>
        </>
    )
}
