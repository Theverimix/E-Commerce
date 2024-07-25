import { useState, useCallback } from 'react'
import { Skeleton } from 'primereact/skeleton'
import { DataView } from 'primereact/dataview'
import { classNames } from 'primereact/utils'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Panel } from 'primereact/panel'
import { Paginator } from 'primereact/paginator'
import { useNavigate } from 'react-router-dom'
import { Chip } from 'primereact/chip'
import { calculateDiscountedPrice } from '../../utils/product-utils'
import { InputNumber } from 'primereact/inputnumber'
import { debounce } from 'lodash'
import AddToCartBtn from '../cart/AddToCartBtn'
import CooldownBtn from '../cooldown-button/CooldownBtn'

export default function ProductList({
    handleRemoveProduct,
    handleUpdateProductAmount,
    products,
    totalElements,
    removeButton = false,
    isLoading = false,
    linkeable = false,
    paginator = false,
    quantity = false,
    onSubmitCategory,
    addToCartButton = false,
    height = 'auto',
    onPageChange,
}) {
    const navigate = useNavigate()
    const [first, setFirst] = useState(0)
    const [localQuantities, setLocalQuantities] = useState({})
    const [isCooldown, setIsCooldown] = useState(false)

    const handlePageChange = (event) => {
        setFirst(event.first)
        if (onPageChange) {
            onPageChange(event.first / 9)
        }
    }

    const debouncedUpdateAmount = useCallback(
        debounce((id, value) => {
            handleUpdateProductAmount(id, value)
        }, 300),
        [handleUpdateProductAmount],
    )

    const handleQuantityChange = (id, value) => {
        setLocalQuantities((prev) => ({ ...prev, [id]: value }))
        debouncedUpdateAmount(id, value)
    }

    const redirectToProductDetail = (product) => {
        navigate(`/products/${product.id}`, {
            state: { product },
        })
    }

    const itemTemplate = (product, index) => {
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
            <div key={product.id} className='col-12'>
                <div
                    className={classNames('flex flex-column xl:flex-row p-4 gap-4', {
                        'border-top-1 surface-border': index !== 0,
                    })}
                >
                    <img
                        onClick={() => {
                            if (linkeable) {
                                redirectToProductDetail(product)
                            }
                        }}
                        className={`w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round ${
                            linkeable ? 'cursor-pointer' : ''
                        }`}
                        src={product.images}
                        alt={product.name}
                    />
                    <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                        <div className='flex flex-column sm:align-items-start gap-3'>
                            <div
                                className={`text-2xl font-bold text-900 hover:text-primary ${
                                    linkeable ? 'cursor-pointer' : ''
                                }`}
                                onClick={() => {
                                    if (linkeable) {
                                        redirectToProductDetail(product)
                                    }
                                }}
                            >
                                {product.name}
                            </div>
                            <div className='flex align-items-center'>
                                {product.categories && (
                                    <div className='font-semibold mb-4 flex'>
                                        {/* <i className="pi pi-tag mr-2"></i> */}
                                        {product.categories.map((category, index) => (
                                            <div id='categorie-chip' className='m-1' key={index}>
                                                <Chip
                                                    className='text-primary font-medium text-sm bg-secondary hover:bg-primary cursor-pointer'
                                                    label={category.name}
                                                    onClick={() => onSubmitCategory(category.name)}
                                                />
                                                {index !== product.categories.length - 1 && ' '}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {quantity && (
                                <span className='font-semibold'>
                                    <InputNumber
                                        inputClassName='text-center'
                                        size={1}
                                        value={localQuantities[product.id] || product.quantity}
                                        onValueChange={(e) => handleQuantityChange(product.id, e.value)}
                                        showButtons
                                        mode='decimal'
                                        min={1}
                                        max={product.stock}
                                        buttonLayout='horizontal'
                                        incrementButtonIcon='pi pi-plus'
                                        decrementButtonIcon='pi pi-minus'
                                        step={1}
                                        disabled={isLoading}
                                    />
                                </span>
                            )}
                        </div>
                        <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>
                            {product.sales ? (
                                <div>
                                    <span className='text-xl font-light text-500 line-through mr-1'>
                                        ${product.price}
                                    </span>
                                    <span className='text-2xl font-semibold text-primary'>
                                        ${calculateDiscountedPrice(product.price, product.sales)}
                                    </span>
                                </div>
                            ) : (
                                <span className='text-2xl font-semibold text-primary'>${product.price}</span>
                            )}
                            <CooldownBtn
                                visible={removeButton}
                                className='product-list-button hover:text-yellow-300 cursor-pointer p-2'
                                onClick={() => {
                                    handleCooldown()
                                    handleRemoveProduct(product)
                                }}
                                isText={true}
                                isRemove={true}
                                isCooldown={isCooldown}
                                label='Remove'
                            />
                            <AddToCartBtn
                                product={product}
                                visible={addToCartButton}
                                isCooldown={isCooldown}
                                handleCooldown={handleCooldown}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleCooldown = () => {
        setIsCooldown(true)
        setTimeout(() => {
            setIsCooldown(false)
        }, 2000)
    }

    const listTemplate = (items) => {
        if (isLoading) {
            // Mostrar skeletons para indicar que se están cargando datos
            return (
                <div className='grid grid-nogutter'>
                    {Array.from({ length: 5 }, (_, index) => itemTemplate(null, index))}
                </div>
            )
        }

        // Si no hay productos y no está cargando, muestra un mensaje apropiado
        if (!items || items.length === 0) {
            return (
                <div className='w-full flex justify-content-center'>
                    <img src='/icons/empty_cart.png' className='w-8 flex justify-content-center' />
                </div>
            )
        }

        return <div className='grid grid-nogutter'>{items.map((product, index) => itemTemplate(product, index))}</div>
    }

    return (
        <Panel header='Cart'>
            <ScrollPanel style={{ height: height }}>
                <DataView value={products} listTemplate={listTemplate} rows={9} />
            </ScrollPanel>
            {paginator && (
                <Paginator
                    first={first}
                    rows={9}
                    totalRecords={totalElements}
                    onPageChange={handlePageChange}
                ></Paginator>
            )}
        </Panel>
    )
}
