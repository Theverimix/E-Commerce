import { Menu } from 'primereact/menu'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'

export default function SideMenu({ itemsList = [] }) {
    const [focusedItem, setFocusedItem] = useState(null)
    const itemRenderer = (item) => {
        const isFocused = focusedItem === item.label

        return (
            <div
                className={classNames('p-menuitem-content', {
                    'text-primary': isFocused,
                })}
            >
                <a
                    className={classNames('flex align-items-center p-menuitem-link', {
                        'text-primary': isFocused,
                    })}
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setFocusedItem(item.label)
                        item.command()
                    }}
                >
                    <span className={item.icon} />
                    <span className='mx-2'>{item.label}</span>
                    {item.badge && <Badge className='ml-auto' value={item.badge} />}
                    {item.shortcut && (
                        <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>
                            {item.shortcut}
                        </span>
                    )}
                </a>
            </div>
        )
    }

    const itemsWithTemplate = itemsList.map((item) => (item.label ? { ...item, template: itemRenderer } : item))

    return (
        <>
            <Menu
                model={itemsWithTemplate}
                className='py-8 w-full border-none border-noround p-3'
                style={{ minHeight: '900px', maxHeight: '300px' }} //utilizar primeflex
            />
        </>
    )
}
