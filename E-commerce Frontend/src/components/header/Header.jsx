import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import brutalLogo from '../../assets/icons/Brutal_black_bottomless.png';

import './header.css';

export default function Header() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        // {
        //     label: 'Features',
        //     icon: 'pi pi-star'
        // },
        {
            label: 'Prductos',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Equipos',
                    icon: 'pi pi-bolt',
                    items: [
                        {
                            label: 'Fuerza',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Cardio',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Accesorios',
                            icon: 'pi pi-palette'
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope'
        }
    ];

    const start = <img alt="logo" src={brutalLogo} height="50" className="mr-2"></img>;


    const endItemRenderer = (item) => (
        <a className={'flex align-items-center p-menuitem-link'}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            </a>
    );

    const cartItem = {
        label: 'Carrito',
        icon: 'pi pi-shopping-bag',
        badge: 4
        
    };

    const loginItem = {
        label: 'Log in'
    };

    const singinItem = {
        label: 'Sing in'
    };

    const end = (
       <>
        {endItemRenderer(cartItem)}
        </> 
        
    );

    return (
        <div className="card">
            
            <div style={{display:'flex', justifyContent:'flex-end', alignItems: 'center'}}>
            <a className='login-item'>Iniciar sesión</a>
            <Divider layout="vertical" />
            <a className='signin-item'>Registrarse</a>
            </div>
            
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
}