import { useState } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import OrderDetails from './OrderDetails'
import { Chip } from 'primereact/chip'
import { format } from 'date-fns'
import { Card } from 'primereact/card'

export default function OrderList({ orders }) {
    const [dialog, setDialog] = useState(false)
    const [orderSelected, setOrderSelected] = useState({})

    const handleSeeDetails = (order) => {
        setDialog(true)
        setOrderSelected(order)
    }

    const idTemplate = ({ id }) => `#${id}`

    const button = (order) => <Button label='See details' onClick={() => handleSeeDetails(order)} text />

    const dateFormatted = ({ createdAt }) => format(new Date(createdAt), "MM':'HH dd/MM/yyyy")

    const statusTemplate = ({ status }) => {
        const colors = {
            Pending: 'Info',
            Approved: 'Warning',
            Cancelled: 'Danger',
        }
        return <Chip severity={colors.status} label={status} />
    }

    const sumTotal = ({ details }) => {
        const total = details.map((item) => item.product.price * item.amount).reduce((a, i) => a + i, 0)
        return total != 0 ? `$${total}` : '-'
    }

    return (
        <>
            <Dialog visible={dialog} onHide={() => setDialog(false)}>
                <OrderDetails order={orderSelected} />
            </Dialog>
            <Card>
                <DataTable value={orders}>
                    <Column body={idTemplate} header='Order' />
                    <Column body={dateFormatted} header='Date' />
                    <Column body={statusTemplate} header='Status' />
                    <Column body={sumTotal} header='Total' />
                    <Column header='Details' body={button} />
                </DataTable>
            </Card>
        </>
    )
}
