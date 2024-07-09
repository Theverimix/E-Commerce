import React from 'react'
import { Button } from 'primereact/button'
import { useCooldown } from '../../providers/CooldownProvider'

const CooldownBtn = ({ label, onClick, isText = false, visible = true, className, icon, isRemove = false }) => {
    const { isCooldown, startCooldown } = useCooldown()

    const handleClick = () => {
        if (!isCooldown) {
            startCooldown()
            onClick()
        }
    }

    return (
        <Button
            className={className}
            loading={isCooldown}
            label={isCooldown && isRemove ? '' : label}
            onClick={handleClick}
            disabled={isCooldown}
            visible={visible}
            text={isText}
            icon={icon}
        />
    )
}

export default CooldownBtn
