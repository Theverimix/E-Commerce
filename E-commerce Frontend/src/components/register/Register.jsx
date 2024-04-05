import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import headerImage from '../../assets/img/ec_texture_definitive.jpg';
import { userRegister } from '../../controller/registerController';
import './register.css'

export default function Register() {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    function confirmPass() {
        setPasswordsMatch(confirmPassword === password);
        if (confirmPassword === password) {
            userRegister(name,lastname,username,password)
        }else{
            alert('Passwords not match')
        }
    }

    const subTitle = (
        <div class="register-grid">
            <div id="item-register-0" style={{ margin: '20px' }}>Información personal</div>
            <div id="item-register-1" style={{ margin: '20px' }}>Información de acceso</div>
        </div>
    )
    const headerRegister = (
        <img alt="Card" src={headerImage} />

    );
    const footerRegister = (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
            <Button label="REGISTRARSE" onClick={() => confirmPass()}/>
        </div>
    );

    const headerPass = <div className="font-bold mb-3">Pick a password</div>;
    const footerPass = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    return (
        <div className="card flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card title="CREAR UNA NUEVA CUENTA" subTitle={subTitle} header={headerRegister} footer={footerRegister} >
                <div className='inputs-register-grid'>
                    <form id='item-inputs-register-0' style={{ margin: '20px' }}>
                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={name} onChange={(e) => setName(e.target.value)}/>
                                <label htmlFor="nombre">Nombre</label>
                            </span>
                        </div>
                        <br />

                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                                <label htmlFor="apellido">Apellido</label>
                            </span>
                        </div>
                    </form>

                    <div id='item-inputs-register-1' style={{ margin: '20px' }}>

                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>
                                <label htmlFor="email">Email</label>
                            </span>
                        </div>
                        <br />

                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <span className="p-float-label">
                                <Password className={passwordsMatch ? '' : 'p-invalid'} header={headerPass} footer={footerPass} toggleMask value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor="password">Password</label>
                            </span>
                        </div>

                        <br />
                        <br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <span className="p-float-label">
                                <Password className={passwordsMatch ? '' : 'p-invalid'} feedback={false} tabIndex={1} toggleMask value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <label htmlFor="passwordConfirm">Confirm password</label>
                            </span>
                            
                        </div>
                        {!passwordsMatch && (
                                <small className='p-error'>Passwords doesn't match</small>
                            )}
                    </div>
                </div>
            </Card>
        </div>
    )
}