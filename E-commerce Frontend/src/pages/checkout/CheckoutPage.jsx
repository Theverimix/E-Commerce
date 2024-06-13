import React, { useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { CascadeSelect } from 'primereact/cascadeselect'
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm'

export default function CheckoutPage() {
    const stepperRef = useRef(null)

    return (
        <div>
            <h1>Checkout</h1>
            <div className='w-full h-screen grid '>
                <div className='col'>
                    <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                        <StepperPanel header='Address'>
                            <h2>Shipping information</h2>
                            <div className='flex mb-3 gap-3'>
                                <InputText className='w-full' placeholder='Firstname'></InputText>
                                <InputText className='w-full' placeholder='Lastname'></InputText>
                            </div>
                            <InputText className='w-full mb-3' placeholder='Address'></InputText>
                            <InputText
                                className='w-full mb-3'
                                placeholder='Apartment, suite, etc. (optional)'
                            ></InputText>
                            <div className='flex mb-3 gap-3'>
                                <CascadeSelect className='w-full' placeholder='State'></CascadeSelect>
                                <CascadeSelect className='w-full' placeholder='City'></CascadeSelect>
                                <InputText className='w-full' placeholder='Zipcode'></InputText>
                            </div>
                            <InputText className='w-full' placeholder='Optional'></InputText>
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
                                <Button className='w-full flex justify-content-center bg-white hover:bg-bluegray-400 border-bluegray-700'>
                                    <a
                                        href='https://www.paypal.com/in/webapps/mpp/paypal-popup'
                                        title='How PayPal Works'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            window.open(
                                                'https://www.paypal.com/in/webapps/mpp/paypal-popup',
                                                'WIPaypal',
                                                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700',
                                            )
                                        }}
                                    >
                                        <img
                                            alt='PayPal Logo'
                                            src='https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png'
                                            className='h-10'
                                        />
                                    </a>
                                </Button>
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
