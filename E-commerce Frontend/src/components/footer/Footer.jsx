import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { Divider } from 'primereact/divider';
        
import footerImg from '../../assets/icons/Footer .jpg'

export default function Footer() {

    const header = (
        // <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
        <hr style={{ borderBottom: '2px solid #e69b0c', margin: '0' }} />
    );
    const footer = (
        <>
        <img alt="Card" src={footerImg} />
            {/* <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <div className="card flex justify-content-center" style={{display:'flex', justifyContent:'center', alignItems: 'center'}}></div>
            <Card title="CONTACTO" footer={footer} header={header} className="md:w-25rem" >
                <p>
                    <b>
                        SUCURSALES
                    </b>
                    <br />
                    21 de Setiembre 2866, Punta Carretas
                    <br />
                    <br />
                    <b>
                        TELEFONO
                    </b>
                    <br />
                    +598 123389223
                    <br />
                    <br />
                    <b>
                        EMAIL
                    </b>
                    <br />
                    contacto@brutal.uy
                    <br />
                    <br />
                </p>
                
            </Card>
            
        </div>
    )
}