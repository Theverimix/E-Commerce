import { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(() => {
        const savedProducts = localStorage.getItem('allProducts')
        return savedProducts ? JSON.parse(savedProducts) : []
    })

    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts))
    }, [allProducts])

    const addProduct = (product, ammount = 1) => {
        if (!product) return null
        setAllProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id)
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id ? { id: p.id, amount: (p.amount || 1) + ammount } : { ...p },
                )
            } else {
                return [...prevProducts, { id: product.id, amount: 1 }]
            }
        })
    }

    const clearAllProducts = () => {
        setAllProducts([])
    }

    const removeProduct = (productId) => {
        setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
    }

    const updateProductAmount = (productId, newAmount) => {
        setAllProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === productId ? { ...p, amount: newAmount } : p)),
        )
    }

    //Products count
    const totalProducts = () => {
        return allProducts.reduce((total, product) => total + product.amount, 0)
    }

    return (
        <ProductsContext.Provider
            value={{
                allProducts,
                setAllProducts,
                addProduct,
                removeProduct,
                totalProducts,
                updateProductAmount,
                clearAllProducts,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext)
