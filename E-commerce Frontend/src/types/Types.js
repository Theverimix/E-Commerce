// Superstruct schemas

import { date, enums, number, object, size, string } from 'superstruct'

export const DiscountTypes = enums(['PERCENTAGE', 'CASH'])

export const Sale = object({
    name: size(string(), 1, 100),
    startAt: date(),
    endAt: date(),
    discountType: DiscountTypes,
    discountValue: size(number(), 1, 100),
})
