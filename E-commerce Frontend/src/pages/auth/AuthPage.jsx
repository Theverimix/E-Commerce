import { useRef } from 'react'

import { Card } from 'primereact/card'
import { Outlet, useLocation } from 'react-router-dom'
import { Toast } from 'primereact/toast'

const AuthPage = () => {
    const location = useLocation()

    const toastBottomCenter = useRef(null)

    const isLogin = location.pathname.includes('login')

    const title = isLogin ? 'Login' : 'Signup'
    const subTitle = isLogin
        ? 'Access your account to continue shopping!'
        : 'Create your account to start shopping the best deals!'

    return (
        <div className='card flex justify-content-center align-items-center'>
            <Toast ref={toastBottomCenter} position='bottom-center' />
            <Card
                header={<img alt='Card' src='/img/ec_texture_definitive.jpg' />}
                title={<h2 className='text-center'>{title}</h2>}
                subTitle={<div className='text-center'>{subTitle}</div>}
            >
                <div className='flex justify-content-center align-items-center w-full p-5'>
                    <div className='flex flex-column gap-5 w-full md:w-30rem'>
                        <Outlet />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AuthPage
