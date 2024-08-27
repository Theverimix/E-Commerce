import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from 'primereact/skeleton'
import { ProductSchema } from '../../../types/schemas'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { Controller, useForm } from 'react-hook-form'
import { MultiSelect } from 'primereact/multiselect'
import { getStates } from '../../../apis/state-api'
import { getCategories } from '../../../apis/category-api'
import { getProductById, saveProduct, updateProduct } from '../../../apis/product-api'
import { useToast } from '../../../providers/ToastProvider'

export const ProductForm = ({ edit = false }) => {
    const { id } = useParams()
    const productCached = useLocation().state?.product

    const navigate = useNavigate()

    const showToast = useToast()

    const [loading, setLoading] = useState(true)
    const [statesList, setStates] = useState([])
    const [categoriesList, setCategories] = useState([])

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
    } = useForm({ resolver: superstructResolver(ProductSchema) })

    useEffect(() => {
        const fetchRequiredData = async () => {
            const { data: categories } = await getCategories()
            const { data: states } = await getStates()

            setCategories(categories)
            setStates(states)

            setLoading(false)
        }
        fetchRequiredData()
    }, []) // eslint-disable-line

    useEffect(() => {
        const fetchProductData = async () => {
            if (!edit) return
            if (productCached) {
                reset({
                    name: productCached.name,
                    description: productCached.description,
                    price: productCached.price,
                    stock: productCached.stock,
                    state: productCached.state.id,
                    visible: productCached.visible,
                    images: '',
                    categories: productCached.categories.map((category) => category.id),
                })
                return
            }

            getProductById(id).then((response) => {
                const { success, data } = response
                if (!success) {
                    navigate('/admin/products')
                    return
                }
                reset({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    state: data.state.id,
                    visible: data.visible,
                    images: '',
                    categories: data.categories.map((category) => category.id),
                })
            })
        }

        fetchProductData()
    }, [productCached]) // eslint-disable-line

    const onSubmit = (data) => {
        const response = edit ? updateProduct(id, data) : saveProduct(data)
        response.then(({ message, success }) => {
            showToast(success ? 'success' : 'error', 'Product operation result', message)
            if (success && !edit) navigate('/admin/products')
        })
    }

    const cardTitle = () => <h2 className='text-center'>{edit ? 'Edit Product' : 'Create Product'}</h2>

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    const FormSkeletons = () => (
        <div className='flex flex-column gap-5 w-30rem'>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='2.25rem' />
            </div>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='3rem' />
            </div>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='2.25rem' />
            </div>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='2.25rem' />
            </div>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='2.25rem' />
            </div>
            <div>
                <Skeleton width='20%' height='1rem' className='mb-1' />
                <Skeleton width='100%' height='2.25rem' />
            </div>
            <div className='flex align-items-center'>
                <Skeleton borderRadius='20px' width='15%' height='2.25rem' />
                <Skeleton width='20%' height='1rem' className='ml-1' />
            </div>
            <div>
                <Skeleton width='50%' height='2.25rem' />
                <Skeleton width='50%' height='2.25rem' />
            </div>
        </div>
    )

    const FormBody = () => (
        <div className='flex flex-column gap-3 w-30rem'>
            <div className='field'>
                <Controller
                    name='name'
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputText
                                {...field}
                                id={field.name}
                                autoComplete='off'
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                            <label htmlFor='name'>Product name</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('name')}
            </div>
            <div className='field'>
                <Controller
                    name='description'
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputTextarea
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                autoResize
                            />
                            <label htmlFor={field.name}>Product description</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('description')}
            </div>
            <div className='field'>
                <Controller
                    name='price'
                    control={control}
                    defaultValue={0.0}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputNumber
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                onChange={(e) => field.onChange(e.value)}
                                min={0}
                                mode='currency'
                                currency='USD'
                                locale='en-US'
                            />
                            <label htmlFor={field.name}>Product price</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('price')}
            </div>
            <div className='field'>
                <Controller
                    name='stock'
                    control={control}
                    defaultValue={0}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <InputNumber
                                {...field}
                                id={field.name}
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                onChange={(e) => field.onChange(e.value)}
                                min={0}
                            />
                            <label htmlFor={field.name}>Product stock</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('stock')}
            </div>
            <div className='field'>
                <Controller
                    name='state'
                    control={control}
                    defaultValue={{}}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <Dropdown
                                {...field}
                                id={field.name}
                                options={statesList}
                                optionLabel='name'
                                optionValue='id'
                                className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                            />
                            <label htmlFor={field.name}>Product state</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('state')}
            </div>
            <div className='field'>
                <Controller
                    name='categories'
                    control={control}
                    defaultValue={[]}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label'>
                            <MultiSelect
                                id={field.name}
                                value={field.value}
                                options={categoriesList}
                                optionLabel='name'
                                optionValue='id'
                                display='chip'
                                maxSelectedLabels={4}
                                onChange={(e) => field.onChange(e.value)}
                                className='w-full'
                            />
                            <label htmlFor={field.name}>Product categories</label>
                        </span>
                    )}
                />
                {getFormErrorMessage('categories')}
            </div>
            <div className='field'>
                <Controller
                    name='visible'
                    defaultValue={true}
                    control={control}
                    render={({ field, fieldState }) => (
                        <span className='p-float-label flex align-items-center'>
                            <InputSwitch
                                {...field}
                                id={field.name}
                                value={true}
                                checked={field.value}
                                className={`${fieldState.error ? 'p-invalid' : ''}`}
                                onChange={(e) => field.onChange(e.value)}
                            />
                            <p className='ml-3'>Product visibility</p>
                        </span>
                    )}
                />
                {getFormErrorMessage('visible')}
            </div>
            <div className='flex gap-3'>
                <Button
                    onClick={() => navigate('/admin/products')}
                    className='w-full'
                    label='Cancel'
                    icon='pi pi-times'
                    outlined
                />
                <Button type='submit' className='w-full' label='Save' icon={edit ? 'pi pi-pencil' : 'pi pi-plus'} />
            </div>
        </div>
    )

    return (
        <div className='card flex justify-content-center align-items-center'>
            <Card title={cardTitle}>
                <div className='flex justify-content-center align-items-center w-full p-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>{loading ? <FormSkeletons /> : <FormBody />}</form>
                </div>
            </Card>
        </div>
    )
}
