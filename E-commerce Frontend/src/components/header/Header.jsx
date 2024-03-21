import React from 'react';
import { Card } from 'primereact/card';
import { Menubar } from 'primereact/menubar';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import brutalLogo from '../../assets/icons/Brutal_black_bottomless.png';
import { Link } from 'react-router-dom';

import './header.css';



export default function Header() {
    const itemRenderer = (item) => (
        <Link to={item.href} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            </Link>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            href:'/',
            template: itemRenderer
            
        },
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
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Cardio',
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Accesorios',
                            icon: 'pi pi-palette',
                            template: itemRenderer
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
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            template: itemRenderer
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
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            template: itemRenderer
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
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            template: itemRenderer
        }
    ];

    

    const start = <Link to='/'><img alt="logo" src={brutalLogo} height="50"  style={{maxWidth:'100%', width:'100%'}}/></Link>;


    const endItemRenderer = (item) => (
        <Link >
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            </Link>
    );

    const cartItem = {
        label: 'Carrito',
        icon: 'pi pi-shopping-bag',
        badge: 4
        
    };

    const loginItem = {
        label: 'Log in',
    };

    const singinItem = {
        label: 'Sing in',
    };

    const end = (
       <>
        {endItemRenderer(cartItem)}
        </> 
        
    );

    return (
        <div className="card">
            
            <div style={{display:'flex', justifyContent:'flex-end', alignItems: 'center'}}>
            <Link to='/loginRegister' className='login-item'>Iniciar sesión</Link>
            <Divider layout="vertical"/>
            <Link to='/Register' className='signin-item'>Registrarse</Link>
            </div>
            
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
}