import { useToast } from '../../providers/ToastProvider'
import { useProducts } from '../../providers/ProductsProvider'
import CooldownBtn from '../CooldownBtn/CooldownBtn'

export default function AddToCartBtn({ product, visible, ammount = 1, isCooldown, handleCooldown }) {
    const showToast = useToast()
    const { addProduct } = useProducts()

    const handleAddProduct = (product) => {
        handleCooldown()
        addProduct(product, ammount)
        showToast('success', 'Product operation result', 'Product added to cart')
    }

    return (
        <div className='flex justify-content-between align-items-center'>
            <CooldownBtn
                visible={visible}
                className='z-5 mt-3 w-full align-self-center'
                isCooldown={isCooldown}
                icon='pi pi-shopping-cart'
                onClick={() => handleAddProduct(product)}
                label='Add to cart'
            ></CooldownBtn>
        </div>
    )
}
