import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}