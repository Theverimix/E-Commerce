import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { Button } from 'primereact/button'
import { Stepper } from 'primereact/stepper'
import { Dropdown } from 'primereact/dropdown'
import { StepperPanel } from 'primereact/stepperpanel'
import { superstructResolver } from '@hookform/resolvers/superstruct'

import { createOrder } from '@/apis/order-api'
import { getProductsByIds } from '@/apis/product-api'
import { getCities, getCountries, getStates } from '@/apis/geonames-api'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import CartSummary from '@/components/cart/cartSummary'
import PaypalButton from '@/components/paypal/paypal-button/PaypalButton'
import CreditCardForm from '@/components/credit-card-form/CreditCardForm'
import DropdownWrapper from '@/components/wrappers/DropdownWrapper'
import InputTextWrapper from '@/components/wrappers/InputTextWrapper'
import InputNumberWrapper from '@/components/wrappers/InputNumberWrapper'

import { useProducts } from '@/providers/ProductsProvider'
import { OrderSchema } from '@/types/schemas'
import { extractIdfromToken } from '@/utils/jwt-utils'

export const Component = () => <CheckoutPage />

export default function CheckoutPage() {
    const stepperRef = useRef(null)
    const location = useLocation()
    const shippingCost = location.state?.shippingCost
    const [products, setProducts] = useState([])
    const { allProducts } = useProducts()
    const [isLoading, setIsLoading] = useState(true)

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const productsWithQuantity = useMemo(() => {
        return products.map((product) => {
            const matchedProduct = allProducts.find((p) => p.id === product.id)
            return {
                ...product,
                quantity: matchedProduct ? matchedProduct.amount : 0,
            }
        })
    }, [products, allProducts])

    // Use Form Hook

    const {
        formState: { errors: addressErrors },
        control: addressControl,
        handleSubmit: handleAddressSubmit,
        watch,
        getValues,
    } = useForm({ resolver: superstructResolver(OrderSchema) })

    const getFormErrorMessage = (name) =>
        addressErrors[name] && <small className='p-error'>{addressErrors[name].message}</small>

    const country = watch('country')

    // Geonames API

    useEffect(() => {
        const fetchCountries = async () => setCountries(await getCountries())
        fetchCountries()
    }, [])

    const fetchStates = async ({ geonameId }) => {
        const data = await getStates(geonameId)
        setStates(data)
    }

    const fetchCities = async ({ code: stateCode }) => {
        const { code: countryCode } = country
        const data = await getCities(countryCode, stateCode)
        setCities(data)
    }

    // Stepper

    const continueToPayment = () => {
        stepperRef.current.nextCallback()
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!location.state?.products) {
                    const productsIds = allProducts.map((product) => product.id)

                    if (productsIds.length === 0) {
                        setProducts([])
                        return
                    }

                    const { data } = await getProductsByIds(productsIds)
                    setProducts(data)
                } else {
                    setProducts(location.state.products)
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [allProducts]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCreateOrder = async () => {
        const { firstname, lastname, address, addressDetail, country, state, city, zipCode, optionalComment } =
            getValues() // Get values from useForm

        const order = {
            customerId: extractIdfromToken(),
            fullname: firstname + ' ' + lastname,
            address: address,
            addressDetail: addressDetail,
            addressCountry: country,
            addressState: state,
            addressCity: city,
            zipCode: zipCode,
            optionalComment: optionalComment,
            details: products.map((product) => ({
                productId: product.id,
                amount: product.quantity,
                price: product.price,
            })),
        }

        const response = await createOrder(order)
        return response
    }

    const AddressForm = () => (
        <form onSubmit={handleAddressSubmit(continueToPayment)}>
            <h2>Shipping information</h2>
            <div className='formgrid grid'>
                <div className='field col-12 md:col-6'>
                    <InputTextWrapper control={addressControl} name='firstname' placeholder='Firstname*' />
                </div>
                <div className='field col-12 md:col-6'>
                    <InputTextWrapper control={addressControl} name='lastname' placeholder='Lastname*' />
                </div>
                <div className='field col-12 '>
                    <InputTextWrapper control={addressControl} name='address' placeholder='Address*' />
                </div>
                <div className='field col-12 '>
                    <InputTextWrapper
                        control={addressControl}
                        name='addressDetail'
                        placeholder='Apartment, suite, etc. (optional)'
                    />
                </div>
                <div className='field col-12 '>
                    <InputTextWrapper control={addressControl} name='optionalComment' placeholder='Optional comment' />
                </div>
                <div className='field col-12 '>
                    <InputNumberWrapper control={addressControl} name='zipCode' placeholder='Zip Code*' />
                </div>
                <div className='field col-12 md:col'>
                    <DropdownWrapper
                        control={addressControl}
                        name='country'
                        placeholder='Select a country'
                        options={countries}
                        optionLabel='name'
                        filter
                        onChange={(value) => {
                            fetchStates(value)
                        }}
                    />
                </div>
                <div className='field col-12 md:col'>
                    <DropdownWrapper
                        control={addressControl}
                        name='state'
                        placeholder='Select a state'
                        options={states}
                        optionLabel='name'
                        filter
                        onChange={(value) => {
                            fetchCities(value)
                        }}
                    />
                </div>
                <div className='field col-12 md:col'>
                    <Controller
                        name='city'
                        control={addressControl}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                {...field}
                                id={field.name}
                                filter
                                options={cities}
                                optionLabel='name'
                                placeholder='Select a city'
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                        )}
                    />
                    {getFormErrorMessage('city')}
                </div>
                <Button
                    type='submit'
                    className='w-full font-semibold mt-3'
                    label='Continue to Payment'
                    icon='pi pi-arrow-right'
                    iconPos='right'
                />
            </div>
        </form>
    )

    const PaymentPanel = () => (
        <>
            <div className='flex gap-3'>
                <PaypalButton
                    createOrder={handleCreateOrder}
                    shippingCost={shippingCost}
                    items={products}
                    invoice='Factura #61372'
                />
                <Button className='w-full font-semibold' label='Credit card' icon='pi pi-credit-card' />
            </div>
            <h2>Payment details</h2>
            <CreditCardForm />
            <div className='flex gap-3'>
                <Button
                    className='w-full font-semibold'
                    label='Back to Address'
                    icon='pi pi-arrow-left'
                    outlined
                    onClick={() => stepperRef.current.prevCallback()}
                />
                <Button
                    className='w-full font-semibold'
                    label='Finish order'
                    icon='pi pi-check'
                    onClick={() => alert('Order placed')}
                />
            </div>
        </>
    )

    return (
        <PayPalScriptProvider
            options={{
                'client-id': 'AXB9apXFIcKwWuxuX54S4zJf9-gmQI-_NQP-ILj-cpvgqMbkCSuTprZPma7f-HLVcSnzbYa-buaBebHK',
            }}
        >
            <div className='py-5 min-h-screen'>
                <h1 className='ml-3'>Checkout</h1>
                <div className='w-full h-auto grid m-auto'>
                    <div className='col-12 md:col-6'>
                        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} linear>
                            <StepperPanel header='Address'>
                                <AddressForm />
                            </StepperPanel>
                            <StepperPanel header='Payment'>
                                <PaymentPanel />
                            </StepperPanel>
                        </Stepper>
                    </div>
                    <div className='col-12 md:col-6 xl:col-5 mx-auto justify-content-center text pb-8 md:pb-0 lg:max-w-28rem'>
                        <div className='w-full'>
                            <h2 className='text-center'>Order Summary</h2>
                            <CartSummary products={productsWithQuantity} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    )
}
