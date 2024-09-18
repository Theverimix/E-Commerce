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
    productQuantity = false,
    onSubmitCategory,
    addToCartButton = false,
    onPageChange,
    isCart = false,
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
                        className={classNames(
                            'hidden sm:flex md:hidden xl:flex flex-column sm:flex-row sm:align-items-start sm:p-4 sm:gap-4',
                            {
                                'border-top-1 surface-border': index !== 0,
                            },
                        )}
                    >
                        <Skeleton
                            shape='rectangle'
                            className='m-auto w-9 sm:w-16rem xl:w-10rem xl:h-10rem sm:h-16rem'
                        />
                        <div className='flex flex-column sm:flex-row align-items-center xl:align-items-start justify-content-between flex-1 gap-4'>
                            <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                                <Skeleton width='11rem' height='2rem' />
                                <Skeleton width='7rem' height='1rem' />
                            </div>
                            <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 '>
                                <Skeleton width='5rem' height='2rem' />
                                <Skeleton width='4rem' height='1rem' />
                            </div>
                        </div>
                    </div>
                    <Skeleton width='100%' height='4rem' className='flex sm:hidden md:flex xl:hidden' />
                </div>
            )
        }

        return (
            <div key={product.id} className='col-12'>
                <div
                    className={classNames('flex sm:flex-column xl:flex-row flex-row py-3 sm:p-4 sm:gap-4', {
                        'border-top-1 surface-border': index !== 0,
                    })}
                >
                    <img
                        onClick={() => {
                            if (linkeable) {
                                redirectToProductDetail(product)
                            }
                        }}
                        className={`w-6rem h-6rem sm:h-full  sm:w-10rem shadow-2 block xl:block mx-auto border-round ${
                            linkeable ? 'cursor-pointer' : ''
                        }`}
                        src={product.images}
                        alt={product.name}
                    />
                    <div className='flex align-items-start justify-content-between flex-1 pl-3 sm:gap-4'>
                        <div className='flex flex-column h-full gap-3'>
                            <div
                                className={`text-lg sm:text-2xl font-semibold sm:font-bold text-900 hover:text-primary ${
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
                            <div className='hidden sm:flex align-items-center'>
                                {product.categories && (
                                    <div className='font-semibold flex'>
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
                                <span className='font-semibold mt-auto'>
                                    <InputNumber
                                        inputClassName='text-center w-9 h-2rem sm:h-auto sm:w-auto'
                                        decrementButtonClassName='w-3 h-2rem sm:h-auto sm:w-2rem'
                                        incrementButtonClassName='w-3 h-2rem sm:h-auto sm:w-2rem'
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
                            {productQuantity && (
                                <span className='font-semibold mt-auto'>
                                    <h3>Quantity: {product.amount}</h3>
                                </span>
                            )}
                        </div>
                        <div className='flex flex-column align-items-end sm:gap-3 h-full'>
                            {product.sales ? (
                                <div className='flex flex-wrap-reverse align-items-center justify-content-end'>
                                    <div className='w-auto sm:text-xl font-light text-500 line-through mr-1'>
                                        ${product.price}
                                    </div>
                                    <div className='w-auto text-xl sm:text-2xl font-semibold text-primary'>
                                        ${calculateDiscountedPrice(product.price, product.sales)}
                                    </div>
                                </div>
                            ) : (
                                <div className='text-xl sm:text-2xl font-semibold text-primary'>${product.price}</div>
                            )}
                            <div className='mt-auto flex flex-nowrap'>
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

        if (!items || (items.length === 0 && isCart)) {
            return (
                <div className='w-full flex justify-content-center'>
                    <img src='/icons/empty_cart.png' className='w-full sm:w-auto flex justify-content-center' />
                </div>
            )
        }

        return <div className='grid grid-nogutter'>{items.map((product, index) => itemTemplate(product, index))}</div>
    }

    return (
        <Panel header={!isCart ? 'Products' : 'Cart'}>
            <DataView value={products} listTemplate={listTemplate} rows={9} />
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
