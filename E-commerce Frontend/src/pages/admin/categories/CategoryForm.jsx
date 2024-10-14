import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../../../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Controller, useForm } from 'react-hook-form'
import { superstructResolver } from '@hookform/resolvers/superstruct'

import { CategorySchema } from '../../../types/schemas'
import { InputTextarea } from 'primereact/inputtextarea'
import { getCategoryById, saveCategory, updateCategory } from '../../../apis/category-api'
import { Skeleton } from 'primereact/skeleton'

export default function CategoryForm({ edit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const showToast = useToast()
    const [loading, setLoading] = useState(false)

    const cache = useLocation().state?.category || null // category cached

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
    } = useForm({ resolver: superstructResolver(CategorySchema) })

    const onSubmit = async (data) => {
        const response = edit ? await updateCategory(id, data) : await saveCategory(data)
        const { message, success } = response
        showToast(success ? 'success' : 'error', 'Category operation result', message)
        if (success) navigate('/admin/categories')
    }

    // TODO: Refactor this
    useEffect(() => {
        if (edit && !cache) {
            const fetchSaleData = async () => {
                setLoading(true)
                const { data, success } = await getCategoryById(id)
                if (!success) {
                    showToast('error', 'Category not found', 'Category not found with id ' + id)
                    return navigate('/admin/categories')
                }
                reset({
                    name: data.name,
                    description: data.description,
                    visible: data.visible,
                })
                setLoading(false)
            }
            fetchSaleData()
        } else if (cache) {
            reset({
                name: cache.name,
                description: cache.description,
                visible: cache.visible,
            })
        }
    }, [edit, cache, id]) // eslint-disable-line react-hooks/exhaustive-deps

    // PrimeReact

    const cardTitle = () => <h2 className='text-center'>{edit ? 'Edit Category' : 'Create Category'}</h2>

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className='p-error'>{errors[name].message}</small>
    }

    // Inputs

    const NameInput = ({ loading }) => {
        return (
            <div className='field'>
                {loading ? (
                    <>
                        <Skeleton width='20%' height='1rem' className='mb-1' />
                        <Skeleton width='100%' height='2.25rem' />
                    </>
                ) : (
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
                )}
                {getFormErrorMessage('name')}
            </div>
        )
    }

    const DescriptionInput = ({ loading }) => {
        return (
            <div className='field'>
                {loading ? (
                    <>
                        <Skeleton width='20%' height='1rem' className='mb-1' />
                        <Skeleton width='100%' height='8rem' />
                    </>
                ) : (
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
                                    rows={5}
                                    cols={30}
                                    maxLength={255}
                                />
                                <label htmlFor='name'>Description</label>
                            </span>
                        )}
                    />
                )}
                {getFormErrorMessage('description')}
            </div>
        )
    }

    const VisibilityInput = ({ loading }) => {
        return (
            <div className='field'>
                {loading ? (
                    <>
                        <Skeleton width='20%' height='1rem' className='mb-1' />
                        <Skeleton width='100%' height='2.25rem' />
                    </>
                ) : (
                    <Controller
                        name='visible'
                        control={control}
                        render={({ field, fieldState }) => (
                            <span className='p-float-label'>
                                <Dropdown
                                    {...field}
                                    id={field.name}
                                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                                    options={[
                                        { label: 'Visible', value: true },
                                        { label: 'No Visible', value: false },
                                    ]}
                                    optionLabel='label'
                                    optionValue='value'
                                />
                                <label htmlFor='name'>Visibility</label>
                            </span>
                        )}
                    />
                )}
                {getFormErrorMessage('visible')}
            </div>
        )
    }

    const Buttons = ({ loading }) => {
        return (
            <div className='flex justify-content-end gap-3'>
                {loading ? (
                    <>
                        <Skeleton width='50%' height='2.25rem' />
                        <Skeleton width='50%' height='2.25rem' />
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => navigate('/admin/categories')}
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
                    </>
                )}
            </div>
        )
    }

    return (
        <div className='card flex justify-content-center align-items-center'>
            <Card title={cardTitle}>
                <div className='flex justify-content-center align-items-center w-full p-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={`flex flex-column w-30rem ${loading ? '' : 'gap-3'}`}>
                            <NameInput loading={loading} />
                            <DescriptionInput loading={loading} />
                            <VisibilityInput loading={loading} />
                            <Buttons loading={loading} />
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}
