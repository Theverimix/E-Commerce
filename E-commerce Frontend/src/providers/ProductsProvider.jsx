import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(() => {
        const savedProducts = localStorage.getItem('allProducts')
        return savedProducts ? JSON.parse(savedProducts) : []
    })

    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts.map((p) => ({ id: p.id }))))
    }, [allProducts])

    const addProduct = (product) => {
        setAllProducts((prevProducts) => [...prevProducts, product])
    }

    const removeProduct = (productId) => {
        const productToRemove = allProducts.find((p) => p.id === productId)
        if (!productToRemove) return
        setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
    }

    return (
        <ProductsContext.Provider
            value={{
                allProducts,
                setAllProducts,
                addProduct,
                removeProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext)
