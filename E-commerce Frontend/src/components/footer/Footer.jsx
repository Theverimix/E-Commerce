import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { Divider } from 'primereact/divider';

import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import headerImg from '../../assets/img/ec_texture_definitive.jpg'

import footerImgDevs from '../../assets/img/DAGA_devs_poweredBy_light.png'
import './footer.css'

export default function Footer() {

    const header = (
        <>
        <img src={headerImg} alt="headerImg" />
        <hr style={{ borderBottom: '2px solid #e69b0c', margin: '0' }} />
        </>
    );
    const footer = (
        <>
            {/*<img alt="Card" src={footerImg} />*/}
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img alt="Card" src={footerImgDevs} style={{ width: '180px' }} />
            </div>
        </>
    );



    return (
        <div   >
            <Card header={header} ></Card>
            <div className="angry-grid">
                

                <Card title="CONTACTO" footer={footer} id="item-0">
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
                    </p>


                </Card>



                <Card title="BENEFICIOS" id="item-1">
                    <div className="p-d-flex">
                        <p className="mr-1 p-be-margin">
                            Dejanos tu email para recibir novedades y ofertas preferenciales de nuestros productos.
                        </p>

                        <div className="p-inputgroup flex-2">
                            <InputText placeholder="Ingresa tu email" />
                            <Button label='SUSCRIBIRME' />
                        </div>
                    </div>
                </Card>

                <Card title="ASISTENCIA" id="item-2">
                    <p className="m-0">
                        Lorem ipsum dolor sit a
                    </p>
                </Card>

                <Card title="EMPRESA" id="item-3" >
                    <p className="m-0">
                        is, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>


            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                    <b>
                        © 2024 | Todos los derechos reservados.
                    </b>
                </p>


            </div>


        </div >


    )
}