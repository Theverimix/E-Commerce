import './styles/appWeb.css'
import '@mantine/core/styles.css';
import { Notification } from '@mantine/core';

import Header from './components/commons/Header/Header';

import {HeaderMegaMenu} from './components/commons/HeaderMegaMenu/HeaderMegaMenu.jsx'

function AppWeb() {
    
    return (<>
        <div className="appWeb" style={{ display: 'flex', margin: '20px'}}>
            {/* <Header></Header> */}
            <HeaderMegaMenu></HeaderMegaMenu>
            
            </div>
            <h1>Hola mundo!</h1>
        </>
    );
}

export default AppWeb;