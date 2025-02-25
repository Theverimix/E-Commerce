import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ProductSchema } from '@/types/schemas'
import { useToast } from '@/providers/ToastProvider'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'

import { getProductById, saveProduct, updateProduct } from '@/apis/product-api'
import { getCategories } from '@/apis/category-api'
import { getStates } from '@/apis/state-api'

import InputTextWrapper from '@/components/wrappers/InputTextWrapper'
import InputAreaWrapper from '@/components/wrappers/InputAreaWrapper'
import InputNumberWrapper from '@/components/wrappers/InputNumberWrapper'
import DropdownWrapper from '@/components/wrappers/DropdownWrapper'
import MultiSelectWrapper from '@/components/wrappers/MultiSelectWrapper'
import InputSwitchWrapper from '@/components/wrappers/InputSwitchWrapper'
import { FileUpload } from 'primereact/fileupload'
import { customResolvers } from '@/types/CustomResolvers'

export const Component = () => <ProductForm />

const ProductForm = ({ edit = false }) => {
    const { id } = useParams()
    const productCached = useLocation().state?.product
    const [images, setImages] = useState([])

    const navigate = useNavigate()

    const showToast = useToast()

    const [loading, setLoading] = useState(true)
    const [statesList, setStates] = useState([])
    const [categoriesList, setCategories] = useState([])

    const { control, handleSubmit, reset } = useForm({ resolver: customResolvers(ProductSchema) })

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
        const product = {
            ...data,
            images: images,
        }
        const response = edit ? updateProduct(id, product) : saveProduct(product)
        response.then(({ message, success }) => {
            showToast(success ? 'success' : 'error', 'Product operation result', message)
            if (success && !edit) navigate('/admin/products')
        })
    }

    const cardTitle = () => <h2 className='text-center'>{edit ? 'Edit Product' : 'Create Product'}</h2>

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

    const handleUpload = async ({ files }) => {
        const [file] = files
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = function () {
            setImages((prev) => [...prev, fileReader.result])
        }
    }

    const FormBody = () => (
        <div className='flex flex-column gap-3 w-30rem'>
            <InputTextWrapper name='name' control={control} label='Product name' />
            <InputAreaWrapper name='description' control={control} label='Product description' autoResize />
            <InputNumberWrapper
                name='price'
                control={control}
                defaultValue={0.0}
                label='Product price'
                min={0}
                mode='currency'
                currency='USD'
                locale='en-US'
            />
            <InputNumberWrapper name='stock' control={control} defaultValue={0} label='Product stock' min={0} />
            <DropdownWrapper
                name='state'
                control={control}
                defaultValue={{}}
                label='Product state'
                options={statesList}
                optionLabel='name'
                optionValue='id'
            />
            <MultiSelectWrapper
                name='categories'
                control={control}
                label='Product categories'
                options={categoriesList}
                optionLabel='name'
                optionValue='id'
                display='chip'
                maxSelectedLabels={4}
            />
            <InputSwitchWrapper name='visible' control={control} defaultValue={true} label='Product visibility' />
            <div className='field'>
                <FileUpload
                    mode='basic'
                    name='images'
                    accept='image/*'
                    maxFileSize={500000}
                    customUpload
                    uploadHandler={handleUpload}
                    auto={true}
                />
                {images.length > 0 && (
                    <Card className='w-full'>
                        <div className='flex flex-column gap-3'>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className='flex gap-3 h-5rem align-items-center bg-black-alpha-30 border-round-md'
                                >
                                    <img
                                        src={image}
                                        className='max-w-8rem h-full w-full cover-fill border-round-md'
                                        alt='Product image'
                                    />
                                    <h2 className='text-lg'>Image #{index + 1}</h2>
                                    <Button
                                        icon='pi pi-times'
                                        className='p-button-rounded ml-auto mr-2'
                                        text
                                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
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

export default ProductForm
