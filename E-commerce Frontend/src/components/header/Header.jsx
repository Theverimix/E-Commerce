import { useRef, useState, useEffect } from 'react'
import { MegaMenu } from 'primereact/megamenu'
import { Menu } from 'primereact/menu'
import { Badge } from 'primereact/badge'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar'

import { userLogout } from '../../apis/auth-api'

import './header.css'

import { extractNamefromToken, extractRolefromToken, isLogedIn } from '../../utils/jwt-utils'
import { useProducts } from '../../providers/ProductsProvider'

export default function Header() {
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const menuRight = useRef(null)
    const chipRef = useRef(null)
    const [active, setActive] = useState(false)
    const [isMenuVisible, setIsMenuVisible] = useState(true)
    const [searchText, setSearchText] = useState('')
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const nameParam = searchParams.get('name')
    const { totalProducts } = useProducts()

    const navigate = useNavigate()

    const userRole = isLogedIn() ? extractRolefromToken() : null

    const [isBreakpoint, setIsBreakpoint] = useState(false)

    useEffect(() => {
        if (nameParam) setSearchText(nameParam)
    }, [nameParam])

    useEffect(() => {
        const handleClickOutside = () => setActive(false)
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsMenuVisible(false)
            setActive(false)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        // Verificar si la ventana ha alcanzado el breakpoint
        setIsBreakpoint(window.innerWidth <= 1350)
    }

    const handleClickMenuUser = (event) => {
        setIsMenuVisible(true)
        menuRight.current.toggle(event)
    }

    const handleSearch = () => {
        if (searchText.trim()) {
            window.location.href = `/products?name=${encodeURIComponent(searchText)}`
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') handleSearch()
    }

    const handleLogout = () => {
        userLogout()
        window.location.href = '/'
    }

    const handleChipClick = (event) => {
        setActive(!active)
        setIsMenuVisible(true)
        menuRight.current.toggle(event)
    }

    const menuItems = [
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
                        className: 'font-bold w-full',
                        items: [
                            {
                                label: 'Supplements',
                                command: () => (window.location.href = '/products?category=supplements'),
                            },
                            {
                                label: 'Accessories',
                                command: () => (window.location.href = '/products?category=accessories'),
                            },
                            { label: 'Clothes', command: () => (window.location.href = '/products?category=clothes') },
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

    const logoutOptions = [
        {
            label: 'Options',
            items: [
                { label: 'Login', icon: 'pi pi-sign-in', url: '/auth/login' },
                { label: 'Signup', icon: 'pi pi-user-plus', url: '/auth/signup' },
            ],
        },
    ]

    const loginOptions = [
        {
            label: 'PROFILE',
            items: [
                {
                    label: userRole === 'ADMINISTRATOR' ? 'Admin panel' : 'My profile',
                    icon: 'pi pi-user',
                    url: userRole === 'ADMINISTRATOR' ? '/admin/profile' : '/account/profile',
                },
                { label: 'Settings', icon: 'pi pi-cog' },
            ],
        },
        { separator: true },
        { label: 'Logout', icon: 'pi pi-sign-out', command: handleLogout },
    ]

    const start = (
        <div className='flex'>
            <Link to='/'>
                <img
                    alt='logo'
                    className='hidden sm:hidden md:block '
                    src='/icons/Brutal_black_bottomless.png'
                    height='50'
                />
            </Link>
            <MegaMenu
                model={menuItems}
                className='static sticky-toolbar border-none'
                breakpoint='1350px'
                pt={{
                    menuButton: { onClick: isBreakpoint ? () => setSidebarVisible(true) : null },
                    menu: { className: isBreakpoint ? 'hidden' : '' },
                }}
            />
        </div>
    )

    const center = (
        <div className='flex align-items-center absolute' style={{ left: '50%', transform: 'translate(-50%, 0)' }}>
            <div className='h-input-search'>
                <IconField iconPosition='left'>
                    <InputIcon className='pi pi-search' />
                    <InputText
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={searchText ? '' : 'Search...'}
                        className='border-round-md w-10rem sm:w-15rem md:w-15rem lg:w-20rem xl:w-20rem'
                    />
                </IconField>
            </div>
        </div>
    )

    const end = (
        <div className='flex align-items-center'>
            <Menu
                model={isLogedIn() ? loginOptions : logoutOptions}
                popup
                ref={menuRight}
                id='popup_menu_right'
                popupAlignment='right'
                className={`${isMenuVisible ? '' : 'hidden'}`}
                onClick={handleClickMenuUser}
            />
            {isLogedIn() ? (
                <div className='flex align-items-center'>
                    <Button
                        label={extractNamefromToken()}
                        icon='pi pi-angle-down'
                        iconPos='right'
                        ref={chipRef}
                        className={`border-round-3xl cursor-pointer mr-3 font-semibold transition-color transition-duration-100 hover:bg-primary border-200 ${
                            active ? 'active' : 'inactive'
                        }`}
                        aria-haspopup
                        aria-controls='popup_menu_right'
                        onClick={handleChipClick}
                    />
                    <style>{`
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
                    className='pi pi-user cursor-pointer transition-colors text-500 transition-duration-600 hover:text-color border-circle mr-3'
                    style={{ fontSize: '1.5rem' }}
                    onClick={handleClickMenuUser}
                    aria-controls='popup_menu_right'
                    aria-haspopup
                />
            )}
            <Link to={'/cart'}>
                <i
                    className='pi pi-shopping-cart p-overlay-badge cursor-pointer transition-colors text-500 transition-duration-600 hover:text-color border-circle mr-2 border-1 border-transparent'
                    style={{ fontSize: '1.5rem' }}
                    title='Go to cart'
                >
                    <Badge
                        value={totalProducts()}
                        className={!totalProducts() || totalProducts() === 0 ? 'hidden' : ''}
                    />
                </i>
            </Link>
        </div>
    )

    const sidebarItems = [
        {
            template: () => {
                return (
                    <div className='flex align-items-center justify-content-center pb-3'>
                        <img alt='logo' src='/icons/Brutal_black_bottomless.png' height='50' />
                    </div>
                )
            },
        },
        {
            separator: true,
        },
        {
            label: 'Products',
            className: 'font-semibold',
            icon: 'pi pi-box',
            command: () => {
                navigate('/products')
                setSidebarVisible(false)
            },
        },
        {
            label: 'Categories',
            className: 'font-semibold',
            items: [
                {
                    label: 'Supplements',
                    className: 'font-light ml-3',
                    command: () => navigate('/products?category=supplements'),
                },
                {
                    label: 'Accessories',
                    className: 'font-light ml-3',
                    command: () => navigate('/products?category=accessories'),
                },
                {
                    label: 'Clothes',
                    className: 'font-light ml-3',
                    command: () => navigate('/products?category=clothes'),
                },
                {
                    label: 'Equipment',
                    className: 'font-light ml-3',
                    command: () => navigate('/products?category=equipment'),
                },
            ],
        },
    ]

    return (
        <div style={{ background: 'var(--surface-e)' }} className='sticky-toolbar flex justify-content-center'>
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                <Menu model={sidebarItems} className='w-full border-none' />
            </Sidebar>
            <div className='w-full sm:w-full md:w-10 lg:w-9'>
                <Toolbar start={start} center={center} end={end} className='border-none' />
            </div>
        </div>
    )
}
