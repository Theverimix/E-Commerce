import { isWithinInterval, sub } from 'date-fns'

export const convertToDate = (isoString) => {
    return new Date(isoString)
}

export const isWithinLastYear = (date) => {
    const lastYear = sub(new Date(), { years: 1 })
    return isWithinInterval(new Date(date), { start: lastYear, end: new Date() })
}

export const isWithinLast30Days = (date) => {
    const last30Days = sub(new Date(), { days: 30 })
    return isWithinInterval(new Date(date), { start: last30Days, end: new Date() })
}

export const isWithinLast7Days = (date) => {
    const last7Days = sub(new Date(), { days: 7 })
    return isWithinInterval(new Date(date), { start: last7Days, end: new Date() })
}
