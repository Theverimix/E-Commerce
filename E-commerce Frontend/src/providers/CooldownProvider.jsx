import React, { createContext, useContext, useState, useEffect } from 'react'

const CooldownContext = createContext()

export const useCooldown = () => useContext(CooldownContext)

export const CooldownProvider = ({ children, cooldown = 2000 }) => {
    const [isCooldown, setIsCooldown] = useState(false)

    const startCooldown = () => {
        setIsCooldown(true)
        setTimeout(() => {
            setIsCooldown(false)
        }, cooldown)
    }

    return <CooldownContext.Provider value={{ isCooldown, startCooldown }}>{children}</CooldownContext.Provider>
}
