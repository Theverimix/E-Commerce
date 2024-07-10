import React, { useMemo } from 'react'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'primereact/skeleton'
import { calculateDiscountedPrice } from '../../utils/ProductUtils'

export default function cartSummary({ products, isLoading, cupon = false, continueBtn = false }) {
    const navigate = useNavigate()

    const shippingCost = 10

    const { subtotal, total } = useMemo(() => {
        const subtotal = products.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)

        const total = subtotal + shippingCost

        return { subtotal, total }
    }, [products])

    return (
        <div className='w-full px-7'>
            {isLoading ? (
                <>
                    <Skeleton className='w-full mb-4' height='2.5rem' />
                    <Skeleton width='100%' className='mb-2' height='1rem' />
                    <Skeleton width='100%' className='mb-2' height='1rem' />
                    <Divider></Divider>
                    <Skeleton width='100%' className='mb-2' height='1rem' />
                    <Skeleton width='100%' className='mt-4' height='2.5rem' />
                </>
            ) : products.length > 0 ? (
                <>
                    {cupon && <InputText className='w-full mb-3' placeholder='Enter coupon code here'></InputText>}

                    {products.map((product, index) => (
                        <div key={index} className='flex justify-content-between flex-wrap mb-2 text-600'>
                            <span>
                                {product.name} x {product.quantity}
                            </span>
                            {/* <span>${(product.price * product.quantity).toFixed(2)}</span> */}
                            <span>
                                $
                                {(calculateDiscountedPrice(product.price, product.sales) * product.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <Divider></Divider>
                    <div className='flex justify-content-between flex-wrap mb-2 text-600'>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-content-between flex-wrap text-600'>
                        <span>Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>

                    <Divider></Divider>
                    <div className='flex justify-content-between flex-wrap'>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    {continueBtn && (
                        <Button
                            className='w-full mt-4 font-medium'
                            label='Continue to Shipping'
                            onClick={() =>
                                navigate('/checkout', { state: { shippingCost: shippingCost, products: products } })
                            }
                        ></Button>
                    )}
                </>
            ) : (
                <>
                    <p className='text-center text-600'>You have not added any product in yout Shopping Cart.</p>
                    <Button
                        className='w-full mt-3 font-medium'
                        label='Continue Shopping'
                        onClick={() => navigate('/products')}
                    ></Button>
                </>
            )}
        </div>
    )
}
