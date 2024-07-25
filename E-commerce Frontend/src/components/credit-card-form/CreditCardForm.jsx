import { useState } from 'react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { usePaymentInputs } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'
import { InputText } from 'primereact/inputtext'

const CreditCardForm = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const { getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps, meta } = usePaymentInputs()

    const handleInputChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const handleInputChangeExpiry = (e) => {
        setExpiry(e.target.value)
    }

    const handleInputChangeCVC = (e) => {
        setCvc(e.target.value)
    }
    return (
        <div className='mb-3'>
            <InputText
                className='w-full'
                placeholder='Cardholder name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            ></InputText>
            <div className='my-3 flex align-items-center gap-2'>
                <IconField iconPosition='right' className='flex align-items-center gap-2 w-full'>
                    <InputIcon>
                        <svg {...getCardImageProps({ images })} />
                    </InputIcon>
                    <InputText
                        className='w-full'
                        {...getCardNumberProps({ onChange: handleInputChangeNumber })}
                        value={number}
                    />
                </IconField>
            </div>
            <div className='my-3 flex align-items-center gap-2 w-full'>
                <InputText
                    className='w-full'
                    {...getExpiryDateProps({ onChange: handleInputChangeExpiry })}
                    value={expiry}
                />
                <InputText className='w-full' {...getCVCProps({ onChange: handleInputChangeCVC })} value={cvc} />
            </div>
            {meta.isTouched && meta.error && <span className='text-red-500'>{meta.error}</span>}
        </div>
    )
}

export default CreditCardForm
