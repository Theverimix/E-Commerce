import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
        

export default function ProductList() {

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
    )

}