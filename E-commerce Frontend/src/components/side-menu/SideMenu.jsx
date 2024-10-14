import { useState } from 'react'
import { Menu } from 'primereact/menu'
import { useLocation } from 'react-router-dom'
import { Badge } from 'primereact/badge'

export default function SideMenu({ itemsList = [] }) {
    const [focusedItem, setFocusedItem] = useState(null)
    const urlActual = useLocation().pathname

    const isAdminUrl = urlActual === '/admin' // Verifica si la URL es /admin
    const itemRenderer = (item) => {
        const isFocused =
            focusedItem === item.label ||
            (focusedItem === null &&
                !isAdminUrl &&
                item.label === urlActual.split('/')[2].charAt(0).toUpperCase() + urlActual.split('/')[2].slice(1))

        return (
            <div className={`p-menuitem-content ${isFocused ? 'text-primary' : ''}`}>
                <a
                    className={`flex align-items-center p-menuitem-link ${isFocused ? 'text-primary' : ''}`}
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

    return <Menu model={itemsWithTemplate} className='w-full border-none border-noround p-5 h-full min-h-screen' />
}
