import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { CascadeSelect } from 'primereact/cascadeselect'
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm'
import PaypalButton from '../../components/Paypal/PaypalButton/PaypalButton'
import { useLocation } from 'react-router-dom'

import { extractIdfromToken } from '../../utils/JwtUtils'
import { createOrder } from '../../controller/OrderController'

export default function CheckoutPage() {
    const stepperRef = useRef(null)
    const location = useLocation()
    const shippingCost = location.state?.shippingCost
    const products = location.state?.products

    const [Firstname, setFirstname] = useState('')
    const [Lastname, setLastname] = useState('')
    const [Address, setAddress] = useState('')
    const [AddressDetail, setAddressDetail] = useState('')
    const [AddressState, setAddressState] = useState('')
    const [AddressCity, setAddressCity] = useState('')
    const [ZipCode, setZipCode] = useState('')
    const [OptionalComment, setOptionalComment] = useState('')

    const handleCreateOrder = async () => {
        const order = {
            customerId: extractIdfromToken(),
            address: Address,
            addressDetail: AddressDetail,
            fullname: Firstname + ' ' + Lastname,
            // addressState: AddressState,
            addressState: 'AddressState',
            // addressCity: AddressCity,
            addressCity: 'AddressCity',
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

    // TODO : Solucionar los cascade de city y state ademas de agregar el de country

    // const cities = [
    //     {
    //         label: 'USA',
    //         code: 'USA',
    //         items: [
    //             { label: 'New York', code: 'NY' },
    //             { label: 'Los Angeles', code: 'LA' },
    //         ],
    //     },
    //     {
    //         label: 'Germany',
    //         code: 'DE',
    //         items: [
    //             { label: 'Berlin', code: 'BE' },
    //             { label: 'Munich', code: 'MU' },
    //         ],
    //     },
    // ]

    // const handleCityChange = (e) => {
    //     setAddressCity(e.value)
    // }

    // const countries = [
    //     {
    //         label: 'USA',
    //         code: 'USA',
    //         items: [
    //             {
    //                 label: 'California',
    //                 code: 'CA',
    //                 items: [
    //                     { label: 'Los Angeles', code: 'LA' },
    //                     { label: 'San Francisco', code: 'SF' },
    //                 ],
    //             },
    //             {
    //                 label: 'New York',
    //                 code: 'NY',
    //                 items: [
    //                     { label: 'New York City', code: 'NYC' },
    //                     { label: 'Buffalo', code: 'BF' },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         label: 'Germany',
    //         code: 'DE',
    //         items: [
    //             {
    //                 label: 'Bavaria',
    //                 code: 'BY',
    //                 items: [
    //                     { label: 'Munich', code: 'MU' },
    //                     { label: 'Nuremberg', code: 'NU' },
    //                 ],
    //             },
    //             {
    //                 label: 'Berlin',
    //                 code: 'BE',
    //                 items: [{ label: 'Berlin', code: 'BL' }],
    //             },
    //         ],
    //     },
    // ]

    // const handleStateChange = (e) => {
    //     setAddressState(e.value)
    // }

    return (
        <div>
            <h1>Checkout</h1>
            <div className='w-full h-screen grid '>
                <div className='col'>
                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                        <StepperPanel header='Address'>
                            <h2>Shipping information</h2>
                            <div className='flex mb-3 gap-3'>
                                <InputText
                                    className='w-full'
                                    placeholder='Firstname'
                                    value={Firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                ></InputText>
                                <InputText
                                    className='w-full'
                                    placeholder='Lastname'
                                    value={Lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                ></InputText>
                            </div>
                            <InputText
                                className='w-full mb-3'
                                placeholder='Address'
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></InputText>
                            <InputText
                                className='w-full mb-3'
                                placeholder='Apartment, suite, etc. (optional)'
                                value={AddressDetail}
                                onChange={(e) => setAddressDetail(e.target.value)}
                            ></InputText>
                            <div className='flex mb-3 gap-3'>
                                <CascadeSelect
                                    className='w-full'
                                    placeholder='State'
                                    value={AddressState}
                                    // options={countries}
                                    // onChange={handleStateChange}
                                ></CascadeSelect>
                                <CascadeSelect
                                    className='w-full'
                                    placeholder='City'
                                    value={AddressCity}
                                    // options={cities}
                                    // onChange={handleCityChange}
                                ></CascadeSelect>
                                <InputText
                                    className='w-full'
                                    placeholder='Zipcode'
                                    value={ZipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                ></InputText>
                            </div>
                            <InputText
                                className='w-full'
                                placeholder='Optional'
                                value={OptionalComment}
                                onChange={(e) => setOptionalComment(e.target.value)}
                            ></InputText>
                            <Button
                                className='w-full font-semibold mt-3'
                                label='Continue to Payment'
                                icon='pi pi-arrow-right'
                                iconPos='right'
                                onClick={() => stepperRef.current.nextCallback()}
                            ></Button>
                        </StepperPanel>
                        <StepperPanel header='Payment'>
                            <div className='flex gap-3'>
                                <PaypalButton
                                    createOrder={handleCreateOrder}
                                    shippingCost={shippingCost}
                                    items={products}
                                    invoice='Factura #61372'
                                ></PaypalButton>
                                <Button
                                    className='w-full font-semibold'
                                    label='Credit card'
                                    icon='pi pi-credit-card'
                                ></Button>
                            </div>
                            <h2>Payment details</h2>
                            <CreditCardForm></CreditCardForm>
                            <div className='flex gap-3'>
                                <Button
                                    className='w-full font-semibold'
                                    label='Back to Address'
                                    icon='pi pi-arrow-left'
                                    outlined
                                    onClick={() => stepperRef.current.prevCallback()}
                                ></Button>
                                <Button
                                    className='w-full font-semibold'
                                    label='Finish order'
                                    icon='pi pi-check'
                                    onClick={() => alert('Order placed')}
                                ></Button>
                            </div>
                        </StepperPanel>
                    </Stepper>
                </div>
                <div className='col'></div>
                <h1>Shipping information</h1>
            </div>
        </div>
    )
}
