import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import headerImage from '../../assets/img/ec_texture_definitive.jpg';
import './register.css'

export default function Register() {

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
            <Button label="REGISTRARSE"/>
        </div>
    );

    return (
        <div className="card flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card title="CREAR UNA NUEVA CUENTA" subTitle={subTitle} header={headerRegister} footer={footerRegister} >
                <div className='inputs-register-grid'>
                    <div id='item-inputs-register-0' style={{ margin: '20px' }}>
                        <label className="w-6rem">Nombre</label><br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Ingresa tu nombre" />
                        </div>
                        <br />

                        <label className="w-6rem">Apellido</label><br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Ingresa tu apellido" />
                        </div>
                    </div>

                    <div id='item-inputs-register-1' style={{ margin: '20px' }}>

                        <label className="w-6rem">Email</label><br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>
                            <InputText placeholder="Ingresa tu email" />
                        </div>
                        <br />

                        <label className="w-6rem">Contraseña</label><br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <InputText placeholder="Ingresa una contraseña" />
                        </div>

                        <br />
                        <label className="w-6rem">Confirmar contraseña</label><br />
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <InputText placeholder="Confirmar tu contraseña" />
                        </div>

                    </div>
                </div>
            </Card>


        </div>
    )
}