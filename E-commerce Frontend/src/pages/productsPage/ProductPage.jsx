import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import ProductList from '../../components/product/ProductList';

const products = [
    {
        "id": 1,
        "image": "https://imgs.search.brave.com/lsEmPulZ7iOwsgg6eyvIefhH6QLnXG7wA125_B2YDfM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTTZheGhIcGZM/LmpwZw",
        "name": "Producto 1",
        "desc": "Description 1",
        "stock": "INSTOCK",
        "price": 19.99
    },
    {
        "id": 2,
        "image": "https://imgs.search.brave.com/lsEmPulZ7iOwsgg6eyvIefhH6QLnXG7wA125_B2YDfM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTTZheGhIcGZM/LmpwZw",
        "name": "Producto 2",
        "desc": "Description 2",
        "stock": "INSTOCK",
        "price": 29.99
    },
    {
        "id": 3,
        "image": "https://imgs.search.brave.com/lsEmPulZ7iOwsgg6eyvIefhH6QLnXG7wA125_B2YDfM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTTZheGhIcGZM/LmpwZw",
        "name": "Producto 3",
        "desc": "Description 3",
        "stock": "LOWSTOCK",
        "price": 39.99
    },
    {
        "id": 4,
        "image": "https://imgs.search.brave.com/lsEmPulZ7iOwsgg6eyvIefhH6QLnXG7wA125_B2YDfM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTTZheGhIcGZM/LmpwZw",
        "name": "Producto 4",
        "desc": "Description 4",
        "stock": "OUTOFSTOCK",
        "price": 49.99
    } 
]

export default function ProductPage() {

    const cateFilter = [{
        key: '0',
        label: 'Documents',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '0-0',
                label: 'Work',
                data: 'Work Folder',
                icon: 'pi pi-fw pi-cog',
                children: [
                    { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                    { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                ]
            },
            {
                key: '0-1',
                label: 'Home',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
                children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
            }
        ]
    }];

    return (
        <ProductList products={products} />
    )
    
}

/*
<div className='grid'>
            <div className='col-fixed' style={{ Width: '1000px' }}>
                <div className="card flex justify-content-center">
                    <Tree value={cateFilter} selectionMode="checkbox" className="w-full md:w-20rem" />
                </div>
            </div>
            <div className='col'>
                <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
        </div>
*/