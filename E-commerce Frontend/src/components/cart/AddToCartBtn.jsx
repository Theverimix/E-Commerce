import { useToast } from '../../providers/ToastProvider'
import { useProducts } from '../../providers/ProductsProvider'
import CooldownBtn from '../cooldown-button/CooldownBtn'

export default function AddToCartBtn({ product, visible, ammount = 1, isCooldown, handleCooldown, className }) {
    const showToast = useToast()
    const { addProduct } = useProducts()

    const handleAddProduct = (product) => {
        handleCooldown()
        addProduct(product, ammount)
        showToast('success', 'Product operation result', 'Product added to cart')
    }

    return (
        <div>
            <CooldownBtn
                visible={visible}
                className={`align-self-center text-xs sm:text-base white-space-nowrap ${className}`}
                isCooldown={isCooldown}
                icon='pi pi-shopping-cart'
                onClick={() => handleAddProduct(product)}
                label='Add to cart'
            ></CooldownBtn>
        </div>
    )
}
