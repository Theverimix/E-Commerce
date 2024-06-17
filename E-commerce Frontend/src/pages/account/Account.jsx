import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'

export default function Account() {
    const toast = useRef(null)

    const items = [
        {
            template: () => {
                return <span className='mx-2 font-medium text-2xl font-semibold'>My account</span>
            },
        },
        {
            separator: true,
        },
        {
            label: 'Shop',
            items: [
                {
                    label: 'Orders',
                    icon: 'pi pi-shopping-bag',
                    command: () => (window.location.href = '/orders'),
                },
            ],
        },
        {
            label: 'User',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                },
            ],
        },
    ]

    return (
        <div className='flex  w-full '>
            <div className='align-items-top '>
                <Toast ref={toast} />
                <Menu
                    model={items}
                    className='py-8 w-full md:w-15rem border-none border-noround'
                    style={{ minHeight: '800px', maxHeight: '300px' }}
                />
            </div>

            <div className='mx-8 my-8 w-full'>
                <Card className='px-5 mb-3'>
                    <div className='flex gap-5'>
                        <Avatar label='UN' size='xlarge' shape='circle' />
                        <div className='flex flex-column align'>
                            <span className=' font-medium text-2xl font-semibold'>User Name</span>
                            <span className='text-l font-normal'>@email</span>
                        </div>
                    </div>
                </Card>
                <Card className='w-full'>
                    <div className='flex px-5  justify-content-between cursor-pointer'>
                        <div className='flex  gap-2'>
                            <Avatar icon='pi pi-id-card' size='large' shape='circle' />
                            <div className='flex flex-column justify-content-end'>
                                <span className=' font-medium text-base font-semibold'>Personal information</span>
                                <span className='text-l font-normal'>
                                    Information about your firstname, lastname, email, country, phone number.
                                </span>
                            </div>
                        </div>
                        <div className='flex align-items-center justify-content-end'>
                            <i className='pi pi-angle-right'></i>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
