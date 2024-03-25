import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import headerImage from '../../assets/img/ec_texture_definitive.jpg';
import axios from 'axios';
import './login.css'

export default function LoginRegister() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: username,
                password: password
            });
            console.log('Login successful:', response.data);
            alert("Success")
            // Aquí podrías redirigir al usuario a otra página después de iniciar sesión correctamente
        } catch (error) {
            console.error('Login failed:', error);
            alert("Failed")
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };



    const titleLogin = (
        <div class="title-grid">
            <div id="item-title-login-0">CLIENTES REGISTRADOS</div>
            <div id="item-title-login-1">CLIENTES NUEVOS</div>
        </div>
    );

    const subTitleLogin = (

        <div class="subTitle-grid">
            <div id="item-subTitle-login-0" style={{ margin: '20px' }}>Si tienes una cuenta ingresa los datos:</div>
            <div id="item-subtitle-login-1" style={{ margin: '20px' }}>Registrarte tiene muchos beneficios: compras más rápidas, atención personalizada, ofertas exclusivas y muchos más.</div>
        </div>

    );

    const headerLogin = (
        <img alt="Card" src={headerImage} />

    );
    const footerLogin = (
        <div class="footer-grid">
            <div id="item-footer-login-0" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                <Button label="INGRESAR" onClick={userLogin} />
            </div>

            <div id="item-footer-login-1" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                <Link to='/Register'><Button label="REGISTRARSE" /></Link>
            </div>
        </div>
    );


    const subTitle = (
        <p>
            Registrarte tiene muchos beneficios: compras más rápidas, atención personalizada, ofertas exclusivas y muchos más.
        </p>
    )
    const headerRegister = (
        <img alt="Card" src={headerImage} />

    );
    const footerRegister = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button label="Sing in" icon="pi pi-check" />
        </div>
    );

    return (
        <div className="card flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card title={titleLogin} subTitle={subTitleLogin} header={headerLogin} footer={footerLogin} >
                <div className='login-grid'>
                    <div id='item-inputs-login-0' style={{ margin: '0px 130px 0 20px' }}>
                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                            <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                            </span>
                        </div>
                        <br />

                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            {/* <InputText placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                            <span className="p-float-label">
                                <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} toggleMask/>
                                <label htmlFor="password">Password</label>
                            </span>
                        </div>
                    </div>


                </div>

            </Card>

            {/* <Card title="Quieres unirte?" subTitle={subTitle} header={headerRegister} footer={footerRegister} /> */}


        </div>
    )
}