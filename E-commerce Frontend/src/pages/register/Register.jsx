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
            userRegister(name, lastname, username, password)
        } else {
            alert('Passwords not match')
        }
    }

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
        <div className="card flex justify-content-center align-items-center">
            <Card
                title={<h2 className='text-center'>Signup</h2>}
                subTitle={<div className='text-center'>Create your account to start shopping the best deals!</div>}
                header={<img alt="Card" src={headerImage} />}>
                <div className='flex justify-content-center align-items-center w-full p-5'>
                    <div className='flex flex-column gap-5 w-30rem'>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="nombre">Nombre</label>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                <label htmlFor="apellido">Apellido</label>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="email">Email</label>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <span className="p-float-label">
                                <Password className={passwordsMatch ? '' : 'p-invalid'} header={headerPass} footer={footerPass} toggleMask value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="password">Password</label>
                            </span>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <span className="p-float-label">
                                <Password className={passwordsMatch ? '' : 'p-invalid'} feedback={false} tabIndex={1} toggleMask value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label htmlFor="passwordConfirm">Confirm password</label>
                            </span>
                        </div>
                        {!passwordsMatch && (<small className='p-error'>Passwords doesn't match</small>)}
                        <Button className='w-full' label="Create your Account" onClick={() => confirmPass()} />
                    </div>
                </div>
            </Card>
        </div>
    )
}