import { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'

export const ProductForm = ({ editMode = true, product, onSubmit, categorieList, stateList }) => {
    const toastBottomCenter = useRef(null)

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [visible, setVisible] = useState(true)
    const [state, setState] = useState(null)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (editMode) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
            setVisible(product.visible)
            setState(product.state ? product.state.id : null)
            setCategories(product.categories)
        }
    }, [editMode, product])

    const handleSubmit = () => {
        const product = { name, description, price, stock, visible, idState: state, categories }
        onSubmit(product)
    }

    const cardTitle = <h2 className='text-center'>{editMode ? 'Edit Product' : 'Product Creator'}</h2>

    const cardSubtitle = (
        <div className='text-center'>{editMode ? 'Edit the product details' : 'Add a new product to catalog'}</div>
    )

    return (
        <div>
            <div className='card flex justify-content-center align-items-center'>
                <Toast ref={toastBottomCenter} position='bottom-center' />
                <Card title={cardTitle} subTitle={cardSubtitle}>
                    <div className='flex justify-content-center align-items-center w-full p-5'>
                        <div className='flex flex-column gap-5 w-30rem'>
                            <span className='p-float-label'>
                                <InputText
                                    id='name'
                                    minLength={3}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full'
                                />
                                <label htmlFor='name'>Product name</label>
                            </span>
                            <span className='p-float-label'>
                                <InputTextarea
                                    id='description'
                                    minLength={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='w-full'
                                    autoResize
                                />
                                <label htmlFor='description'>Product description</label>
                            </span>
                            <span className='p-float-label'>
                                <InputNumber
                                    id='price'
                                    value={price}
                                    onValueChange={(e) => setPrice(e.value)}
                                    className='w-full'
                                    min={0}
                                    mode='currency'
                                    currency='USD'
                                    locale='en-US'
                                />
                                <label htmlFor='price'>Product price</label>
                            </span>
                            <span className='p-float-label'>
                                <InputNumber
                                    id='stock'
                                    value={stock}
                                    onValueChange={(e) => setStock(e.value)}
                                    className='w-full'
                                    min={0}
                                />
                                <label htmlFor='stock'>Product stock</label>
                            </span>
                            <span className='p-float-label'>
                                <Dropdown
                                    value={state}
                                    onChange={(e) => setState(e.value)}
                                    options={stateList}
                                    optionLabel='name'
                                    optionValue='id'
                                    className='w-full'
                                />
                                <label htmlFor='state'>Product state</label>
                            </span>
                            <span className='p-float-label'>
                                <MultiSelect
                                    id='categories'
                                    value={categories}
                                    onChange={(e) => setCategories(e.value)}
                                    options={categorieList}
                                    optionLabel='name'
                                    display='chip'
                                    maxSelectedLabels={4}
                                    className='w-full'
                                />
                                <label htmlFor='categories'>Product categories</label>
                            </span>
                            <span className='p-float-label flex align-items-center'>
                                <InputSwitch id='visible' checked={visible} onChange={(e) => setVisible(e.value)} />
                                <p className='ml-3'>Product visibility</p>
                            </span>
                            {/* TODO add images */}
                            {/* <span className='p-float-label'>
                                <InputText id='images' className='w-full' />
                                <label htmlFor='images'>Product images</label>
                            </span> */}
                            <div className='flex justify-content-end gap-3'>
                                <Button
                                    onClick={() => navigate('/admin/products')}
                                    className='w-full'
                                    label='Cancel'
                                    icon='pi pi-times'
                                    outlined
                                />
                                <Button
                                    onClick={handleSubmit}
                                    className='w-full'
                                    label={editMode ? 'Save Changes' : 'Create Product'}
                                    icon={editMode ? 'pi pi-pencil' : 'pi pi-plus'}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
