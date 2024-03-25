import React from 'react';
import { Card } from 'primereact/card';
import { Menubar } from 'primereact/menubar';
import { MegaMenu } from 'primereact/megamenu';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import brutalLogo from '../../assets/icons/Brutal_black_bottomless.png';
import { Link } from 'react-router-dom';

import './header.css';



export default function Header() {
    const itemRenderer = (item) => (
        <Link to={item.href} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} style={{marginRight:'0.5rem'}}/>
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
        </Link>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            href: '/',
            template: itemRenderer

        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                    }
                ],
                [
                    {
                        label: 'Home Theather',
                        items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                    }
                ],
                [
                    {
                        label: 'Gaming',
                        items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                    }
                ],
                [
                    {
                        label: 'Appliances',
                        items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                    }
                ]
            ]
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            template: itemRenderer
        }
    ];



    const start = <Link to='/' ><img alt="logo" src={brutalLogo} height="50" style={{ maxWidth: '100%', width: '100%' }} /></Link>;


    const endItemRenderer = (item) => (
        <Link to={item.href} className="p-menuitem-link icon-item" >
            <span className={item.icon} style={{marginRight:'0.5rem'}}/>
            <span className="mx-2" style={{marginRight:'0.2rem'}}>{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
        </Link>
    );

    const cartItem = {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        badge: 4,
        href: ''
    };

    const loginItem = {
        label: 'Log in',
    };

    const singinItem = {
        label: 'Sing in',
    };

    const end = [
        <>
            {endItemRenderer(cartItem)}
        </>

    ];

    return (
        <div className="card">

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Link to='/loginRegister' className='login-item'>Iniciar sesión</Link>
                <Divider layout="vertical" />
                <Link to='/Register' className='signin-item'>Registrarse</Link>
            </div>

            <MegaMenu model={items} start={start} end={end} />
        </div>
    )
}