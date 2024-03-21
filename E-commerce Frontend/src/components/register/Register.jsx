import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import headerImage from '../../assets/img/ec-girl-banner.jpg';
import './register.css'

export default function Register() {

    const subTitle = (
        <div class="register-grid">
            <div id="item-register-0">INFORMACIÓN PERSONAL</div>
            <div id="item-register-1">INFORMACIÓN DE ACCESO</div>
        </div>
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
            <Card title="Crear una nueva cuenta" subTitle={subTitle} header={headerRegister} footer={footerRegister} >
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
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
            </Card>


        </div>
    )
}