import { Button } from 'primereact/button'
import { useToast } from '../../providers/ToastProvider'
import { useProducts } from '../../providers/ProductsProvider'

export default function AddToCartBtn({ product, visible, ammount = 1 }) {
    const showToast = useToast()
    const { addProduct } = useProducts()
    const handleAddProduct = (product) => {
        addProduct(product, ammount)
        showToast('success', 'Product operation result', 'Product added to cart')
    }

    return (
        <div className='flex justify-content-between align-items-center'>
            <Button
                visible={visible}
                className='z-5 mt-3 w-auto'
                style={{ alignSelf: 'center' }}
                icon='pi pi-shopping-cart'
                onClick={() => handleAddProduct(product)}
                label='Add to cart'
            />
        </div>
    )
}
