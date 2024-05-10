import React, { useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import OrderDialog from './OrderDetails';
import OrderDetails from './OrderDetails';
import { Chip } from 'primereact/chip';
import { format } from 'date-fns';

export default function OrderList({ orders }) {
    const [dialog, setDialog] = useState(false);
    const [orderSelected, setOrderSelected] = useState({});

    const handleSeeDetails = (order) => {
        setDialog(true)
        setOrderSelected(order)
    }

    const button = (order) => {
        return (
            <Button
                label='See details'
                onClick={(e) => handleSeeDetails(order)}
            />
        )
    }

    const dateFormatted = ({date}) => {
        const newDate = format(new Date(date), "MM':'HH dd/MM/yyyy")
        return <Chip label={newDate} />
    }

    const sumTotal = ({ details }) => {
        const total = details
            .map(item => item.product.price * item.amount)
            .reduce((a, i) => a + i, 0);
        return total != 0 ? `$${total}` : "-"
    }

    return (
    <>
        <Dialog visible={dialog} onHide={() => setDialog(false)}>
            <OrderDetails order={orderSelected}/>
        </Dialog>
        <DataTable value={orders} >
            <Column field='id' header='Id' />
            <Column body={dateFormatted} header='Date' />
            <Column field='status' header='Status' />
            <Column body={sumTotal} header='Total' />
            <Column
                header="Details"
                body={button} />
        </DataTable>
    </>
  )
}
