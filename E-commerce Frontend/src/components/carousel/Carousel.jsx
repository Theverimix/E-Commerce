import React, { useRef } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import bannerImage from '../../assets/img/ec-banner-definitive.gif';

export default function Carousel() {
    const cm = useRef(null);
    const items = [
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Rename', icon: 'pi pi-file-edit' }
    ];

    const imageStyle = {
        maxWidth: '100%'
    };

    return (
        <div className="card flex md:justify-content-center">
            
            <img src={bannerImage} alt="Logo"  onContextMenu={(e) => cm.current.show(e)} style={imageStyle} />
        </div>
    )
}