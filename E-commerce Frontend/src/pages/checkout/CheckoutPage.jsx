import React, { useEffect, useMemo, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm'
import PaypalButton from '../../components/Paypal/PaypalButton/PaypalButton'
import { useLocation } from 'react-router-dom'
import { extractIdfromToken } from '../../utils/JwtUtils'
import { createOrder } from '../../controller/OrderController'
import CartSummary from '../../components/cart/cartSummary'
import { getProductsByIds } from '../../controller/ProductController'
import { useProducts } from '../../providers/ProductsProvider'
import LocationForm from '../../components/LocationForm/LocationForm'
import { useToast } from '../../providers/ToastProvider'

export default function CheckoutPage() {
    const stepperRef = useRef(null)
    const location = useLocation()
    const shippingCost = location.state?.shippingCost
    const [products, setProducts] = useState([])
    const { allProducts } = useProducts()
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useToast()
    const [Firstname, setFirstname] = useState('')
    const [Lastname, setLastname] = useState('')
    const [Address, setAddress] = useState('')
    const [AddressDetail, setAddressDetail] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [ZipCode, setZipCode] = useState('')
    const [OptionalComment, setOptionalComment] = useState('')

    const productsWithQuantity = useMemo(() => {
        return products.map((product) => {
            const matchedProduct = allProducts.find((p) => p.id === product.id)
            return {
                ...product,
                quantity: matchedProduct ? matchedProduct.amount : 0,
            }
        })
    }, [products, allProducts])

    const [validationErrors, setValidationErrors] = useState({
        Firstname: false,
        Lastname: false,
        Address: false,
        ZipCode: false,
        selectedCountry: false,
        selectedState: false,
        selectedCity: false,
    })

    const validateForm = () => {
        const errors = {
            Firstname: Firstname.trim() === '',
            Lastname: Lastname.trim() === '',
            Address: Address.trim() === '',
            ZipCode: ZipCode.trim() === '',
            selectedCountry: selectedCountry === null,
            selectedState: selectedState === null,
            selectedCity: selectedCity === null,
        }
        setValidationErrors(errors)
        return !Object.values(errors).some((error) => error === true)
    }

    const handleContinueToPayment = () => {
        if (validateForm()) {
            stepperRef.current.nextCallback()
        } else {
            showToast('error', 'Error', 'Please fill in all required fields')
        }
    }
    const handleContinueToPayment2 = () => {
        if (validateForm()) {
            stepperRef.current.nextCallback()
        } else {
            showToast('error', 'Error', 'NASHE')
        }
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

                    const response = await getProductsByIds(productsIds)

                    setProducts(response)
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
    }, [allProducts])

    const handleCountryChange = (country) => {
        setSelectedCountry(country)
        setSelectedState(null)
        setSelectedCity(null)
    }

    const handleStateChange = (state) => {
        setSelectedState(state)
        setSelectedCity(null)
    }

    const handleCityChange = (city) => {
        setSelectedCity(city)
    }

    const handleCreateOrder = async () => {
        const order = {
            customerId: extractIdfromToken(),
            address: Address,
            addressDetail: AddressDetail,
            fullname: Firstname + ' ' + Lastname,
            // addressCountry: selectedCountry,
            addressState: selectedState,
            addressCity: selectedCity,
            zipCode: ZipCode,
            optionalComment: OptionalComment,
            details: products.map((product) => ({
                productId: product.id,
                amount: product.quantity,
                price: product.price,
            })),
        }

        const response = await createOrder(order)
        return response
    }

    return (
        <div>
            <h1 className='ml-3'>Checkout</h1>
            <div className='w-full h-screen grid gap-3'>
                <div className='col'>
                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} linear>
                        <StepperPanel header='Address'>
                            <h2>Shipping information</h2>
                            <div className='flex mb-3 gap-3'>
                                <InputText
                                    className='w-full'
                                    placeholder='Firstname*'
                                    value={Firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    invalid={validationErrors.Firstname}
                                />
                                <InputText
                                    className='w-full'
                                    placeholder='Lastname*'
                                    value={Lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    invalid={validationErrors.Lastname}
                                />
                            </div>
                            <InputText
                                className='w-full mb-3'
                                placeholder='Address*'
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                                invalid={validationErrors.Address}
                            />
                            <InputText
                                className='w-full mb-3'
                                placeholder='Apartment, suite, etc. (optional)'
                                value={AddressDetail}
                                onChange={(e) => setAddressDetail(e.target.value)}
                            />
                            <LocationForm
                                onCountryChange={handleCountryChange}
                                onStateChange={handleStateChange}
                                onCityChange={handleCityChange}
                                validationErrors={validationErrors}
                            />
                            <InputText
                                className='w-full my-3'
                                placeholder='Zipcode*'
                                value={ZipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                invalid={validationErrors.ZipCode}
                            />
                            <InputText
                                className='w-full'
                                placeholder='Optional comment'
                                value={OptionalComment}
                                onChange={(e) => setOptionalComment(e.target.value)}
                            />
                            <Button
                                className='w-full font-semibold mt-3'
                                label='Continue to Payment'
                                icon='pi pi-arrow-right'
                                iconPos='right'
                                onClick={handleContinueToPayment}
                            />
                            <Button
                                className='w-full font-semibold mt-3'
                                label='Continue to Payment'
                                icon='pi pi-arrow-right'
                                iconPos='right'
                                onClick={handleContinueToPayment2}
                            />
                        </StepperPanel>
                        <StepperPanel header='Payment'>
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
                        </StepperPanel>
                    </Stepper>
                </div>
                <div className='col-4 justify-content-center text'>
                    <h2 className='text-center'>Order Summary</h2>
                    <CartSummary products={productsWithQuantity} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}
