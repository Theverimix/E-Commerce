import { handleApiPromise } from '../utils/api-utils'
import AxiosInstance from './AxiosInstance'

export async function getSales() {
    return await handleApiPromise(AxiosInstance.get(`/sales`))
}

export async function getSaleById(id) {
    return await handleApiPromise(AxiosInstance.get(`/sales/${id}`))
}

export const saveSale = async (data) => {
    const sale = {
        name: data.name,
        startAt: data.startAt,
        endAt: data.endAt,
        discountType: data.discountType,
        discountValue: data.discountValue,
    }
    return await handleApiPromise(AxiosInstance.post(`/sales`, sale))
}

export const updateSale = async (id, sale) => {
    return await handleApiPromise(AxiosInstance.put(`/sales/${id}`, sale))
}

export const deleteSale = async (id) => {
    return await handleApiPromise(AxiosInstance.delete(`/sales/${id}`))
}
