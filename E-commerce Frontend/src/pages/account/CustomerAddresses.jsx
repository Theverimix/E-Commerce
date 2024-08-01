import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Skeleton } from 'primereact/skeleton'
import { DataView } from 'primereact/dataview'
import { Card } from 'primereact/card'
import { useToast } from '../../providers/ToastProvider'
import { useNavigate } from 'react-router-dom'
import { extractIdfromToken } from '../../utils/jwt-utils'
import { BreadCrumb } from 'primereact/breadcrumb'
import { getAddresses } from '../../apis/Address-api'
import { Paginator } from 'primereact/paginator'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'

export default function CustomerAddresses() {
    const toast = useToast()
    const navigate = useNavigate()
    const userId = extractIdfromToken()
    const menuRight = useRef(null)

    const [addresses, setAddresses] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [first, setFirst] = useState(0)

    const items = [{ label: 'Addresses' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    const fetchAddresses = useCallback(
        async (page) => {
            setIsLoading(true)
            const data = await getAddresses(userId, page)
            console.log(data)
            setAddresses(data.content)
            setTotalElements(data.totalElements || 0)
            setIsLoading(false)
        },
        [userId],
    )

    useEffect(() => {
        fetchAddresses(0)
    }, [fetchAddresses])

    const handlePageChange = (event) => {
        setFirst(event.first)
        fetchAddresses(event.first / 9)
    }

    const itemsAddresses = [
        {
            label: 'Edit address',
        },

        { separator: true },

        {
            label: 'Delete address',
        },
    ]

    const itemTemplate = (address, index) => {
        if (isLoading) {
            return (
                <div className='col-12' key={index}>
                    <div
                        className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', {
                            'border-top-1 surface-border': index !== 0,
                        })}
                    >
                        <Skeleton
                            shape='rectangle'
                            className='m-auto w-9 sm:w-16rem xl:w-10rem xl:h-10rem sm:h-16rem'
                        />
                        <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                            <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                                <Skeleton width='11rem' height='2rem' />
                                <Skeleton width='7rem' height='1rem' />
                            </div>
                            <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                                <Skeleton width='5rem' height='2rem' />
                                <Skeleton width='4rem' height='1rem' />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div key={address.id} className='border-solid border-1 border-round-md border-primary p-3 mb-3 '>
                <div className='flex justify-content-between align-items-center mb-3'>
                    <div>
                        <i className='pi pi-map-marker text-2xl mr-3'></i>
                        <span className='text-xl font-semibold'>{address.addressLine}</span>
                    </div>
                    <Menu model={itemsAddresses} popup ref={menuRight} id='popup_menu_right' popupAlignment='right' />
                    <i
                        className='pi pi-ellipsis-v text-xl cursor-pointer'
                        onClick={(event) => menuRight.current.toggle(event)}
                        aria-controls='popup_menu_right'
                        aria-haspopup
                    ></i>
                </div>
                <div className='mx-6'>
                    <div className='mb-2'>
                        {address.country} - {address.city}
                    </div>
                    <div className='mb-2'>
                        {address.fullName} - {address.phone}
                    </div>
                </div>
            </div>
        )
    }

    const listTemplate = (items) => {
        if (isLoading) {
            return <div className='w-full'>{Array.from({ length: 5 }, (_, index) => itemTemplate(null, index))}</div>
        }

        if (!items || items.length === 0) {
            return (
                <div className='w-full flex justify-content-center'>
                    <h1 className='text-center text-500'>No addresses found.</h1>
                </div>
            )
        }

        return <div className='w-full'>{items.map((address, index) => itemTemplate(address, index))}</div>
    }

    return (
        <div className='w-full'>
            <div>
                <BreadCrumb model={items} home={home} className='border-none mb-3' />
            </div>

            <Card title='Addresses'>
                <div>
                    <DataView value={addresses} listTemplate={listTemplate} rows={9} />
                </div>
                {/* <Paginator first={first} rows={9} totalRecords={totalElements} onPageChange={handlePageChange} /> */}
                <div className='text-center mt-5'>
                    <Button
                        onClick={() => navigate('#')}
                        label='Agregar domicilio'
                        className='border-none py-2 text-left px-6 border-round-md transition-color transition-duration-100 bg-primary-reverse hover:bg-primary border-200 w-full'
                        icon='pi pi-chevron-right'
                        iconPos='right'
                    />
                </div>
            </Card>
        </div>
    )
}
