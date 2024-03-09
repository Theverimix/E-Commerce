import React from 'react'; 
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import headerImage from '../../assets/img/ec-pesas.jpg';

export default function AdvancedDemo() {
    const header = (
        <img alt="Card" src={headerImage} />
    );
    const footer = (
        <>
            <Button label="Sing in" icon="pi pi-check" />
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title="Advanced Card" subTitle="Card subtitle" header={header} >
            
            </Card>

            
        </div>
    )
}