import ReactDOM from 'react-dom/client'

import App from './App.jsx'
// import AppWeb from './AppWeb.jsx'

import 'primereact/resources/themes/arya-orange/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import '/node_modules/primeflex/primeflex.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
