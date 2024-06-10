import React, { useRef, useState, useEffect } from 'react'
import { MegaMenu } from 'primereact/megamenu'
import { Menu } from 'primereact/menu'
import { Badge } from 'primereact/badge'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import brutalLogo from '../../assets/icons/Brutal_black_bottomless.png'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { Link, useLocation } from 'react-router-dom'
import { Chip } from 'primereact/chip'

import { userLogout } from '../../controller/logoutController'

import './header.css'
import { Divider } from 'primereact/divider'

import { extractEmailfromToken, extractNamefromToken, isLogedIn } from '../../utils/JwtUtils'
import { classNames } from 'primereact/utils'

export default function Header() {
    const menuRight = useRef(null)
    const chipRef = useRef(null)
    const [active, setActive] = useState(false)
    const [searchText, setSearchText] = useState('')
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const nameParam = searchParams.get('name')

    useEffect(() => {
        if (nameParam) {
            setSearchText(nameParam)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            setActive(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const searchTokenName = () => {
        const name = extractNamefromToken()
        return name
    }

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            window.location.href = `/products?name=${encodeURIComponent(searchText)}`
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleLogout = () => {
        userLogout()
        window.location.href = '/'
    }

    const handleChipClick = (event) => {
        setActive(!active)
        menuRight.current.toggle(event)
    }

    const itemRenderer = (item) => (
        <Link to={item.href} className='flex align-items-center p-menuitem-link'>
            <span className={item.icon} style={{ marginRight: '0.5rem' }} />
            <span className='mx-2'>{item.label}</span>
            {item.badge && <Badge className='ml-auto' value={item.badge} />}
        </Link>
    )

    const items = [
        {
            label: 'Products',
            icon: 'pi pi-box',
            className: 'font-semibold',
            command: () => (window.location.href = '/products'),
        },

        {
            className: 'custom-product-item',
            items: [
                [
                    {
                        label: 'Categories',
                        className: 'font-bold',
                        items: [
                            {
                                label: 'Supplements',
                                command: () => (window.location.href = '/products?category=supplements'),
                            },
                            {
                                label: 'Accessories',
                                command: () => (window.location.href = '/products?category=accessories'),
                            },
                            {
                                label: 'Clothes',
                                command: () => (window.location.href = '/products?category=clothes'),
                            },
                            {
                                label: 'Equipment',
                                command: () => (window.location.href = '/products?category=equipment'),
                            },
                        ],
                    },
                ],
            ],
        },
    ]

    const optionsLogout = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-sign-in',
                    url: '/auth/login',
                },
                {
                    label: 'Signup',
                    icon: 'pi pi-user-plus',
                    url: '/auth/signup',
                },
            ],
        },
    ]

    const optionsLogin = [
        {
            label: 'PROFILE',
            items: [
                {
                    label: 'My profile',
                    icon: 'pi pi-user',
                    url: '/profile',
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                },
            ],
        },
        {
            separator: true,
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout,
        },
    ]

    const start = (
        <div className='flex'>
            <Link to='/'>
                <img alt='logo' src={brutalLogo} height='50' />
            </Link>
            <MegaMenu
                model={items}
                className='flex mx-3 justify-content-between align-items-center p-0 sticky-toolbar '
                breakpoint='960px'
                style={{ border: 'none' }}
            />
        </div>
    )

    const center = (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, 0)',
            }}
        >
            <div className='h-input-search'>
                <IconField iconPosition='left'>
                    <InputIcon className='pi pi-search' />
                    <InputText
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={searchText ? '' : 'Search...'}
                        style={{ borderRadius: '10px' }}
                    />
                </IconField>
            </div>
        </div>
    )

    const end = (
        <div className=' flex align-items-center'>
            <Menu
                model={isLogedIn() ? optionsLogin : optionsLogout}
                popup
                ref={menuRight}
                id='popup_menu_right'
                popupAlignment='right'
            />
            {/* {tokenEmail} */}
            {isLogedIn() ? (
                <div className='flex align-items-center '>
                    <Button
                        label={searchTokenName()}
                        icon='pi pi-angle-down'
                        iconPos='right'
                        ref={chipRef}
                        className={`
                                border-round-3xl 
                                cursor-pointer 
                                mr-3
                                font-semibold
                                transition-color 
                                transition-duration-100
                                hover:bg-primary
                                border-200
                                ${active ? 'active' : 'inactive'}`}
                        aria-haspopup
                        aria-controls='popup_menu_right'
                        onClick={handleChipClick}
                    />
                    <style jsx>{`
                        .active {
                            border-top-right-radius: 1.5rem !important;
                            border-bottom-right-radius: 0rem !important;
                            background-color: var(--primary-color);
                            color: var(--primary-color-text);
                        }

                        .inactive {
                            border-top-right-radius: 1.5rem !important;
                            border-bottom-right-radius: 1.5rem !important;
                            background-color: var(--primary-color-text);
                            color: var(--primary-color);
                        }
                    `}</style>
                </div>
            ) : (
                <i
                    className='pi pi-user 
            cursor-pointer 
            transition-colors 
            text-500 
            transition-duration-600 
            hover:text-color 
            border-circle
            mr-3'
                    style={{ fontSize: '1.5rem' }}
                    onClick={(event) => menuRight.current.toggle(event)}
                    aria-controls='popup_menu_right'
                    aria-haspopup
                />
            )}

            <Link to={'/cart'}>
                <i
                    className='pi pi-shopping-cart 
            p-overlay-badge 
            cursor-pointer 
            transition-colors 
            text-500 
            transition-duration-600 
            hover:text-color 
            border-circle
            mr-2 border-1
            border-transparent'
                    style={{ fontSize: '1.5rem' }}
                    title='Go to cart'
                >
                    <Badge value='4'></Badge>
                </i>
            </Link>
        </div>
    )

    return (
        <div
            style={{
                background: 'var(--surface-e)',
            }}
            className='sticky-toolbar flex justify-content-center w-full'
        >
            <div className='sm:w-full md:w-10 lg:w-9'>
                <Toolbar
                    start={start}
                    center={center}
                    end={end}
                    className='flex justify-content-between align-items-center px-0 py-1'
                    style={{ border: 'none' }}
                ></Toolbar>
                {/* <Divider className="my-0"></Divider> */}
                {/* <MegaMenu
          start={start}
          model={items}
          end={end}
          className="flex justify-content-between align-items-center p-0 sticky-toolbar"
          breakpoint="960px"
          style={{ border: "none" }}
        /> */}
            </div>
        </div>
    )
}
