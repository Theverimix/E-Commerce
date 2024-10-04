import { calculateDiscountedPrice } from '@/utils/product-utils'
import { Card } from 'primereact/card'
import { useNavigate } from 'react-router-dom'
import AddToCartBtn from '../cart/AddToCartBtn'
import { Chip } from 'primereact/chip'

export default function ProductCard({ product, isCooldown, handleCooldown }) {
    const navigate = useNavigate()

    const redirect = () => {
        navigate(`/products/${product.id}`, { state: { product } })
    }

    return (
        <Card className='flex flex-column m-2 p-2 relative'>
            {product.sales && <Chip label='Sale' className='px-3 absolute right-0 top-0 m-3' />}

            <img
                src={product.images}
                className='w-full block cursor-pointer'
                alt={product.name}
                onClick={() => redirect()}
            />

            <div className='flex flex-column py-3'>
                <h3 className='m-0 cursor-pointer hover:text-primary' onClick={() => redirect()}>
                    {product.name}
                </h3>
                {product.sales ? (
                    <div>
                        <span className='text-4xl font-semibold text-primary'>
                            ${calculateDiscountedPrice(product.price, product.sales)}
                        </span>
                        <span className='text-2xl font-light text-500 line-through ml-1'>${product.price}</span>
                    </div>
                ) : (
                    <span className='text-4xl font-semibold text-primary'>${product.price}</span>
                )}
            </div>

            <AddToCartBtn
                isCooldown={isCooldown}
                handleCooldown={handleCooldown}
                product={product}
                visible={true}
                className='w-full'
            />
        </Card>
    )
}
