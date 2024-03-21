import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import headerImage from '../../assets/img/ec-girl-banner.jpg';

export default function LoginRegister() {
    const headerLogin = (
        <img alt="Card" src={headerImage} />

    );
    const footerLogin = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button label="Log in" icon="pi pi-check" />
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
            <Card title="Ya eres miembro?" subTitle="Inicia sesion" header={headerLogin} footer={footerLogin} >
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label className="w-6rem">Username</label><br />
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" />
                    </div>
                    <br />

                    <label className="w-6rem">Password</label><br />
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-key"></i>
                        </span>
                        <InputText placeholder="Password" />
                    </div>
                </div>
            </Card>
            <Divider layout='vertical'>

            </Divider>
            <Card title="Quieres unirte?" subTitle={subTitle} header={headerRegister} footer={footerRegister} />


        </div>
    )
}