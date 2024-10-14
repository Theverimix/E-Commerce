import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-screen flex justify-content-center align-items-center'>
            <div>
                <div className='flex justify-content-center align-items-center'>
                    <h1 className='text-primary text-center text-8xl m-3'>Error 404!</h1>
                </div>
                <div className='m-0'>
                    <p className='text-center'>Oops! Something went wrong.</p>
                    <p className='text-center'>Please try again later.</p>
                </div>
                <div className='card-footer flex justify-content-center'>
                    <Button className='my-4 w-4 font-semibold' onClick={() => navigate('/')} label='Go Home'></Button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
