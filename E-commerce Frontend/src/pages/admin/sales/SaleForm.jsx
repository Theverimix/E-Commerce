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
import { Controller, useForm } from 'react-hook-form'
import { superstructResolver } from '@hookform/resolvers/superstruct'

import { Sale } from '../../../types/Types'

function SaleForm({ edit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const showToast = useToast()

    const saleCached = useLocation().state?.sale || null

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
        watch,
    } = useForm({ resolver: superstructResolver(Sale) })

    const onSubmit = async (data) => {
        if (edit) {
            const response = await updateSale(id, data)
            const { message, success } = response
            showToast(success ? 'success' : 'error', 'Sale operation result', message)
            if (success) navigate('/admin/sales')
        } else {
            const response = await saveSale(data)
            const { message, success } = response
            showToast(success ? 'success' : 'error', 'Sale operation result', message)
            if (success) navigate('/admin/sales')
        }
    }

    // TODO: Refactor this
    useEffect(() => {
        if (edit && !saleCached) {
            const fetchSaleData = async () => {
                const { data } = await getSaleById(id)
                reset({
                    name: data.name,
                    startAt: convertToDate(data.startAt),
                    endAt: convertToDate(data.endAt),
                    discountType: data.discountType,
                    discountValue: data.discountValue,
                })
                setMinDate(new Date(data.startAt))
                setMaxDate(new Date(data.endAt))
            }
            fetchSaleData()
        } else if (saleCached) {
            reset({
                name: saleCached.name,
                startAt: convertToDate(saleCached.startAt),
                endAt: convertToDate(saleCached.endAt),
                discountType: saleCached.discountType,
                discountValue: saleCached.discountValue,
            })
            setMinDate(new Date(saleCached.startAt))
            setMaxDate(new Date(saleCached.endAt))
        }
    }, [edit, saleCached, id]) // eslint-disable-line react-hooks/exhaustive-deps

    // Control min and max date for startAt and endAt fields

    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const startAt = watch('startAt')
    const endAt = watch('endAt')

    useEffect(() => {
        if (startAt) setMinDate(new Date(startAt))
        if (endAt) setMaxDate(new Date(endAt))
    }, [startAt, endAt])

    // PrimeReact

    const cardTitle = () => <h2 className='text-center'>{edit ? 'Edit Sale' : 'Create Sale'}</h2>

    const cardSubTitle = () => <h3 className='text-center'>{edit ? 'Edit this sale' : 'Create a new sale'}</h3>

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    return (
        <div className='card flex justify-content-center align-items-center'>
            <Card title={cardTitle} subTitle={cardSubTitle}>
                <div className='flex justify-content-center align-items-center w-full p-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-column w-30rem gap-3'>
                            <div className='field'>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <span className='p-float-label'>
                                            <InputText
                                                autoFocus
                                                {...field}
                                                id={field.name}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                            />
                                            <label htmlFor='name'>Sale name</label>
                                        </span>
                                    )}
                                />
                                {getFormErrorMessage('name')}
                            </div>
                            <div className='field'>
                                <Controller
                                    name='startAt'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <span className='p-float-label'>
                                            <Calendar
                                                {...field}
                                                id={field.name}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                                dateFormat='dd/mm/yy'
                                                showTime
                                                hourFormat='24'
                                                maxDate={maxDate}
                                            />
                                            <label htmlFor='name'>Start date</label>
                                        </span>
                                    )}
                                />
                                {getFormErrorMessage('startAt')}
                            </div>
                            <div className='field'>
                                <Controller
                                    name='endAt'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <span className='p-float-label'>
                                            <Calendar
                                                {...field}
                                                id={field.name}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                                dateFormat='dd/mm/yy'
                                                showTime
                                                hourFormat='24'
                                                minDate={minDate}
                                            />
                                            <label htmlFor='name'>End date</label>
                                        </span>
                                    )}
                                />
                                {getFormErrorMessage('startAt')}
                            </div>
                            <div className='field'>
                                <Controller
                                    name='discountType'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <span className='p-float-label'>
                                            <Dropdown
                                                {...field}
                                                id={field.name}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                                options={[
                                                    { label: 'Percentage', value: 'PERCENTAGE' },
                                                    { label: 'Fixed', value: 'CASH' },
                                                ]}
                                                optionLabel='label'
                                                optionValue='value'
                                            />
                                            <label htmlFor='name'>Discount type</label>
                                        </span>
                                    )}
                                />
                                {getFormErrorMessage('discountType')}
                            </div>
                            <div className='field'>
                                <Controller
                                    name='discountValue'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <span className='p-float-label'>
                                            <InputNumber
                                                {...field}
                                                id={field.name}
                                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                                onChange={(e) => field.onChange(e.value)}
                                            />
                                            <label htmlFor='name'>Discount value</label>
                                        </span>
                                    )}
                                />
                                {getFormErrorMessage('discountValue')}
                            </div>
                            <div className='flex justify-content-end gap-3'>
                                <Button
                                    onClick={() => navigate('/admin/sales')}
                                    className='w-full'
                                    label='Cancel'
                                    icon='pi pi-times'
                                    outlined
                                />
                                <Button
                                    type='submit'
                                    className='w-full'
                                    label={edit ? 'Save Changes' : 'Create Sale'}
                                    icon={edit ? 'pi pi-pencil' : 'pi pi-plus'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default SaleForm
