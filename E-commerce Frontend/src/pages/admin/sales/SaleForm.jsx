import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { getSaleById, saveSale, updateSale } from '../../../apis/sale-api'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { convertToDate } from '../../../utils/date-utils'
import { Dropdown } from 'primereact/dropdown'

function SaleForm({ edit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const showToast = useToast()

    const saleCached = useLocation().state?.sale || null

    const [sale, setSale] = useState({
        name: saleCached?.name || '',
        startAt: saleCached?.startAt ? convertToDate(saleCached?.startAt) : null,
        endAt: saleCached?.endAt ? convertToDate(saleCached?.endAt) : null,
        discountType: saleCached?.discountType || null,
        discountValue: saleCached?.discountValue || 0,
    })

    const discountTypes = [
        { label: 'Percentage', value: 'PERCENTAGE' },
        { label: 'Cash', value: 'CASH' },
    ]

    useEffect(() => {
        if (edit && !saleCached) {
            const fetchSaleData = async () => {
                const { data } = await getSaleById(id)
                setSale({
                    name: data.name,
                    startAt: convertToDate(data.startAt),
                    endAt: convertToDate(data.endAt),
                    discountType: data.discountType,
                    discountValue: data.discountValue,
                })
            }
            fetchSaleData()
        }
    }, [edit, id, saleCached])

    const handleSubmit = async () => {
        if (edit) {
            const response = await updateSale(id, sale)
            const { message, success } = response
            showToast(success ? 'success' : 'error', 'Sale operation result', message)
            if (success) navigate('/admin/sales')
        } else {
            const response = await saveSale(sale)
            const { message, success } = response
            showToast(success ? 'success' : 'error', 'Sale operation result', message)
            if (success) navigate('/admin/sales')
        }
    }

    // PrimeReact

    const cardTitle = () => <h2 className='text-center'>{edit ? 'Edit Sale' : 'Create Sale'}</h2>

    const cardSubTitle = () => <h3 className='text-center'>{edit ? 'Edit this sale' : 'Create a new sale'}</h3>

    return (
        <div>
            <div className='card flex justify-content-center align-items-center'>
                <Card title={cardTitle} subTitle={cardSubTitle}>
                    <div className='flex justify-content-center align-items-center w-full p-5'>
                        <div className='flex flex-column gap-5 w-30rem'>
                            <span className='p-float-label'>
                                <InputText
                                    id='name'
                                    minLength={3}
                                    value={sale.name}
                                    onChange={(e) => setSale({ ...sale, name: e.target.value })}
                                    className='w-full'
                                />
                                <label htmlFor='name'>Sale name</label>
                            </span>
                            <span className='p-float-label'>
                                <Calendar
                                    value={sale.startAt}
                                    className='w-full'
                                    onChange={(e) => setSale({ ...sale, startAt: e.value })}
                                    dateFormat='dd/mm/yy'
                                    showTime
                                    hourFormat='24'
                                />
                                <label htmlFor='name'>Sale start date</label>
                            </span>
                            <span className='p-float-label'>
                                <Calendar
                                    value={sale.endAt}
                                    className='w-full'
                                    onChange={(e) => setSale({ ...sale, endAt: e.value })}
                                    dateFormat='dd/mm/yy'
                                    showTime
                                    hourFormat='24'
                                />
                                <label htmlFor='name'>Sale end date</label>
                            </span>

                            <span className='p-float-label'>
                                <Dropdown
                                    value={sale.discountType}
                                    onChange={(e) => setSale({ ...sale, discountType: e.value })}
                                    options={discountTypes}
                                    optionLabel='label'
                                    optionValue='value'
                                    className='w-full'
                                />
                                <label htmlFor='name'>Discount type</label>
                            </span>
                            <span className='p-float-label'>
                                <InputNumber
                                    id='discount-value'
                                    value={sale.discountValue}
                                    onChange={(e) => setSale({ ...sale, discountValue: e.value })}
                                    className='w-full'
                                />
                                <label htmlFor='name'>Discount value</label>
                            </span>
                            <div className='flex justify-content-end gap-3'>
                                <Button
                                    onClick={() => navigate('/admin/sales')}
                                    className='w-full'
                                    label='Cancel'
                                    icon='pi pi-times'
                                    outlined
                                />
                                <Button
                                    onClick={handleSubmit}
                                    className='w-full'
                                    label={edit ? 'Save Changes' : 'Create Sale'}
                                    icon={edit ? 'pi pi-pencil' : 'pi pi-plus'}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SaleForm
