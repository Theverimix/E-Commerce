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
        <div style={{display:'flex', justifyContent:'flex-end'}}>
        <Button label="Log in" icon="pi pi-check" />
    </div>
    );


    const headerRegister = (
        <img alt="Card" src={headerImage} />

    );
    const footerRegister = (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Button label="Sing in" icon="pi pi-check" />
        </div>
    );

    return (
        <div className="card flex justify-content-center" style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <Card title="Ya eres miembro?" subTitle="Inicia sesion" header={headerLogin} footer={footerLogin} >
            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Username</label><br />
                <InputText id="username" type="text" className="w-12rem" />
                <br /><br />

                <label className="w-6rem">Password</label><br />
                <InputText id="password" type="password" className="w-12rem" />
                </div>
            </Card>
            <Divider layout='vertical'>
                <b>O</b>
            </Divider>
            <Card title="Quieres unirte?" subTitle="Registrate" header={headerRegister} footer={footerRegister} >
            
            </Card>
        </div>
    )
}