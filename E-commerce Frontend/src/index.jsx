import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWeb from './AppWeb.jsx'
// import './styles/index.css'
import '@mantine/core/styles.css';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';


const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider defaultColorScheme='dark'>
    <AppWeb />
    
    {/* <React.StrictMode>
        
      </React.StrictMode>, */}
  </MantineProvider>,
)
