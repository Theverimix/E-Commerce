import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(() => {
        const savedProducts = localStorage.getItem('allProducts')
        return savedProducts ? JSON.parse(savedProducts) : []
    })

    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts))
    }, [allProducts])

    const addProduct = (product) => {
        setAllProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id)
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id ? { id: p.id, amount: (p.amount || 1) + 1 } : { ...p },
                )
            } else {
                return [...prevProducts, { id: product.id, amount: 1 }]
            }
        })
    }

    const removeProduct = (productId) => {
        const productIndex = allProducts.findIndex((p) => p.id === productId)
        if (productIndex === -1) return // Producto no encontrado

        const productToRemove = allProducts[productIndex]

        if (productToRemove.amount > 1) {
            // Si el amount es mayor que 1, reducir en uno el amount
            setAllProducts((prevProducts) =>
                prevProducts.map((p, index) => (index === productIndex ? { ...p, amount: p.amount - 1 } : p)),
            )
        } else {
            // Si el amount es 1 o menos, eliminar el producto
            setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
        }
    }

    const updateProductAmount = (productId, newAmount) => {
        setAllProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === productId ? { ...p, amount: newAmount } : p)),
        )
    }

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
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext)
