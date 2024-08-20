import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Skeleton } from 'primereact/skeleton'
import { DataView } from 'primereact/dataview'
import { Card } from 'primereact/card'
import { useToast } from '../../providers/ToastProvider'
import { useNavigate } from 'react-router-dom'
import { extractIdfromToken } from '../../utils/jwt-utils'
import { BreadCrumb } from 'primereact/breadcrumb'
import { getAddresses, deleteAddress } from '../../apis/address-api'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Paginator } from 'primereact/paginator'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'

export default function CustomerAddresses() {
    const showToast = useToast()
    const navigate = useNavigate()
    const customerId = extractIdfromToken()
    const menuRight = useRef(null)

    const [addresses, setAddresses] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [first, setFirst] = useState(0)
    const [activeAddressId, setActiveAddressId] = useState(null)

    const items = [{ label: 'Addresses' }]
    const home = { label: 'Profile', command: () => navigate('/account/profile') }

    const fetchAddresses = useCallback(
        async (page) => {
            setIsLoading(true)
            const data = await getAddresses(customerId, page)
            setAddresses(data.content)
            setTotalElements(data.totalElements || 0)
            setIsLoading(false)
        },
        [customerId],
    )

    useEffect(() => {
        fetchAddresses(0)
    }, [fetchAddresses])

    const handlePageChange = (event) => {
        setFirst(event.first)
        fetchAddresses(event.first / 9)
    }

    const handleDelete = async (addressId) => {
        const response = await deleteAddress(customerId, addressId)
        const { success } = response
        showToast(success ? 'success' : 'error', 'Address operation result', 'Address deleted successfully')
    }

    const showConfirmDialog = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => handleDelete(id),
            reject: () => {},
        })
    }

    const itemsAddresses = [
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => navigate(`/account/updateAddress/${activeAddressId}`),
        },

        { separator: true },

        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => showConfirmDialog(activeAddressId),
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
                            width='2rem'
                            height='2rem'
                            className='m-auto w-2rem h-2rem sm:w-3rem sm:h-3rem xl:w-2rem xl:h-2rem'
                        />
                        <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                            <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                                <Skeleton width='10rem' height='2rem' />
                                <Skeleton width='15rem' height='1.5rem' />
                                <Skeleton width='7rem' height='1rem' />
                            </div>
                            <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                                <Skeleton width='3rem' height='3rem' />
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
                    <Button
                        icon='pi pi-ellipsis-v text-lg'
                        aria-label='Filter'
                        rounded
                        text
                        onClick={(event) => {
                            setActiveAddressId(address.id)
                            menuRight.current.toggle(event)
                        }}
                        aria-controls='popup_menu_right'
                        aria-haspopup
                    />
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
            return <div className='w-full'>{Array.from({ length: 1 }, (_, index) => itemTemplate(null, index))}</div>
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
            <ConfirmDialog />
            <Card title='Addresses'>
                <div>
                    <DataView value={addresses} listTemplate={listTemplate} rows={9} />
                </div>
                {/* <Paginator first={first} rows={9} totalRecords={totalElements} onPageChange={handlePageChange} /> */}
                <div className='text-center mt-5'>
                    <Button
                        onClick={() => navigate('/account/createAddress')}
                        label='Agregar domicilio'
                        className='border-transparent py-2 text-left px-6 border-round-md transition-color transition-duration-300 hover:border-primary w-full'
                        outlined
                        icon='pi pi-chevron-right'
                        iconPos='right'
                    />
                </div>
            </Card>
        </div>
    )
}
