import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useProducts } from '../../../providers/ProductsProvider'

import { updateOrderStatus } from '../../../apis/order-api'

const PaypalButton = ({ items, invoice, shippingCost, createOrder }) => {
    const [invoiceId, setInvoiceId] = useState(null)
    const navigate = useNavigate()
    const showToast = useToast()
    const { clearAllProducts } = useProducts()

    // Calcula el subtotal sumando el precio * cantidad de cada item
    const calculateSubtotal = () => {
        return items
            .reduce((sum, item) => {
                return sum + parseFloat(item.price) * parseInt(item.quantity)
            }, 0)
            .toFixed(2)
    }

    const subtotal = calculateSubtotal()
    const total = (parseFloat(subtotal) + parseFloat(shippingCost)).toFixed(2)

    const handleCreateOrder = async () => {
        try {
            const result = await createOrder()
            setInvoiceId(result)
            return result
        } catch (error) {
            console.error('Error al crear la orden:', error)
            throw error
        }
    }

    return (
        <PayPalButtons
            className='w-full flex justify-content-center align-items-center mx-2'
            style={{
                layout: 'horizontal',
                color: 'silver',
                label: 'paypal',
                tagline: false,
                shape: 'rect',
                height: 40,
            }}
            createOrder={async (data, actions) => {
                await handleCreateOrder()
                return actions.order.create({
                    purchase_units: [
                        {
                            // description: 'NAAAAAAAAAAAAAAAAAAAAAAAAAHE',
                            amount: {
                                currency_code: 'USD',
                                value: total,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: subtotal,
                                    },
                                    shipping: {
                                        currency_code: 'USD',
                                        value: shippingCost,
                                    },
                                },
                            },
                            items: items.map((item) => ({
                                name: item.name,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: item.price,
                                },
                                quantity: item.quantity,
                            })),
                        },
                    ],
                })
            }}
            onApprove={async (data, actions) => {
                try {
                    const order = await actions.order.capture()
                    console.log(order)

                    await new Promise((resolve) => {
                        setInvoiceId((currentInvoiceId) => {
                            updateOrderStatus(currentInvoiceId, 'Approved')
                                .then(() => {
                                    console.log('Orden actualizada exitosamente')
                                    resolve()
                                })
                                .catch((error) => {
                                    console.error('Error al actualizar la orden:', error)
                                    resolve()
                                })
                            return currentInvoiceId
                        })
                    })

                    showToast('success', 'Purchase Operation Result', 'Purchase approved successfully')
                    clearAllProducts()
                    navigate('/')
                } catch (error) {
                    console.error('Error en onApprove:', error)
                    showToast('error', 'Purchase Operation Error', 'There was an error processing your purchase')
                }
            }}
            onCancel={() => {
                setInvoiceId((currentInvoiceId) => {
                    deleteOrder(currentInvoiceId)
                    return currentInvoiceId
                })
                showToast('error', 'Purchase Operation Result', 'Purchase canceled')
            }}
        />
    )
}

export default PaypalButton
