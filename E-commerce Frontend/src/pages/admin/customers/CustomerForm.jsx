import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

export const CustomerForm = ({ customer = {}, onSubmit }) => {
    const [customerData, setCustomerData] = useState({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        state: customer.state,
        role: customer.role,
        country: customer.country,
        phone: customer.phone,
    })

    useEffect(() => {
        if (customer) {
            setCustomerData({
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                state: customer.state,
                role: customer.role,
                country: customer.country,
                phone: customer.phone,
            })
        }
    }, [customer])

    const handleSubmit = () => {
        onSubmit(customerData)
    }

    const cardTitle = <h2 className='text-center'>Edit Customer</h2>

    const cardSubtitle = <div className='text-center'>Edit the customer details</div>

    const roleList = [
        { name: 'Admin', value: 'ADMINISTRATOR' },
        { name: 'Customer', value: 'CUSTOMER' },
    ]

    const stateList = [
        { name: 'Active', value: 'ACTIVE' },
        { name: 'Inactive', value: 'INACTIVE' },
        { name: 'Closed', value: 'CLOSED' },
    ]

    return (
        <div>
            <div className='card flex justify-content-center align-items-center'>
                <Card title={cardTitle} subTitle={cardSubtitle}>
                    <div className='flex justify-content-center align-items-center w-full p-5'>
                        <div className='flex flex-column gap-5 w-30rem'>
                            <span className='p-float-label'>
                                <InputText
                                    id='firstname'
                                    minLength={3}
                                    value={customerData.firstname}
                                    onChange={(e) => setCustomerData({ ...customerData, firstname: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='firstname'>FirstName</label>
                            </span>
                            <span className='p-float-label'>
                                <InputText
                                    id='lastname'
                                    minLength={3}
                                    value={customerData.lastname}
                                    onChange={(e) => setCustomerData({ ...customerData, lastname: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='lastname'>LastName</label>
                            </span>
                            <span className='p-float-label'>
                                <InputText
                                    id='email'
                                    minLength={3}
                                    value={customerData.email}
                                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='email'>Email</label>
                            </span>
                            <span className='p-float-label'>
                                <InputText
                                    id='phone'
                                    minLength={3}
                                    value={customerData.phone}
                                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='phone'>Phone</label>
                            </span>
                            <span className='p-float-label'>
                                <InputText
                                    id='country'
                                    minLength={3}
                                    value={customerData.country}
                                    onChange={(e) => setCustomerData({ ...customerData, country: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='country'>Country</label>
                            </span>
                            <span className='p-float-label'>
                                <Dropdown
                                    id='state'
                                    value={customerData.state}
                                    options={stateList}
                                    onChange={(e) => setCustomerData({ ...customerData, state: e.value })}
                                    optionLabel='name'
                                    className='w-full'
                                />
                                <label htmlFor='state'>State</label>
                            </span>
                            <Button
                                onClick={handleSubmit}
                                className='w-full'
                                label='Update customer'
                                icon='pi pi-pencil'
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
