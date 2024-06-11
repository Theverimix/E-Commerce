import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { Divider } from 'primereact/divider'

import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import headerImg from '../../assets/img/ec_texture_definitive.jpg'

import footerImgDevs from '../../assets/img/DAGA_devs_poweredBy_light.png'
import './footer.css'

export default function Footer() {
    const footer = (
        <>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img alt='Card' src={footerImgDevs} style={{ width: '180px' }} />
            </div>
        </>
    )

    return (
        <>
            <hr className='border-bottom-2 border-solid border-primary m-0' />
            <div className='flex justify-content-center w-full '>
                <div className='sm:w-full md:w-10 lg:w-9'>
                    <div className='grid neted-grid '>
                        <div className='col-4'>
                            <h2>CONTACT</h2>
                            <p>
                                <b>BRANCHES</b>
                                <br />
                                21 de Setiembre 2866, Punta Carretas
                                <br />
                                <br />
                                <b>PHONE</b>
                                <br />
                                123389223
                                <br />
                                <br />
                                <b>EMAIL</b>
                                <br />
                                contact@brutal.uy
                            </p>
                        </div>
                        <div className='col-8'>
                            <div className='grid'>
                                <div className='col-6'>
                                    <h2>BENEFITS</h2>
                                    <div className='p-d-flex'>
                                        <p className='mr-1 p-be-margin'>
                                            Leave us your email to receive news and preferential offers of our products.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex lg:col-6 md:col-8 sm:col-12'>
                                    <div className='p-inputgroup align-items-end'>
                                        <InputText placeholder='Enter your email' />
                                        <Button label='SUBSCRIBE' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <h2>SUPPORT</h2>
                                    <p className='m-0'>Lorem ipsum dolor sit a</p>
                                </div>
                                <div className='col-6'>
                                    <h2>COMPANY</h2>
                                    <p className='m-0'>
                                        is, culpa ratione quam perferendis esse, cupiditate neque quas!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div clssName='flex flex-column'>
                        <p className='flex align-items-center justify-content-center'>
                            <b>©2024 BRUTAL | All rights reserved.</b>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
