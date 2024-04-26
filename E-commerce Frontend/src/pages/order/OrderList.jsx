import React from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

export default function OrderList({orders}) {

    return (
    <>
        
        <DataTable value={orders}>
            <Column field="id" header="Id" />
            <Column field="customer" header="Customer" />
            <Column field="address" header="Address" />
            <Column field="date" header="Date" />
            <Column field="status" header="Status" />
            <Column
                header="Details"
                body={<Button label='See details' onClick={() => setVisible}/>} />
        </DataTable>
    </>
  )
}
