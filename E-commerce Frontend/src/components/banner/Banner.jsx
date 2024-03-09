import React, { useRef } from 'react';
import bannerImage from '../../assets/img/ec-banner-definitive.gif';

export default function Banner() {
    const imageStyle = {
        maxWidth: '100%'
    };

    return (
        <div className="card flex md:justify-content-center">
            <img src={bannerImage} alt="Logo"  onContextMenu={(e) => cm.current.show(e)} style={imageStyle} />
        </div>
    )
}