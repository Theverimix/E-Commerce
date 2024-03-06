import './styles/appWeb.css'
import Menubar from 'primereact/menubar'

function AppWeb() {
    
    return (
    <>
        <Menubar model={items} start={start} end={end} />
        </>
    );
}

export default AppWeb;