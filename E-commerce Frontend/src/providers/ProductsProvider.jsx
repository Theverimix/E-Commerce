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
        const productToRemove = allProducts.find((p) => p.id === productId)
        if (!productToRemove) return
        setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
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
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext)
