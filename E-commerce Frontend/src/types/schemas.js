// Superstruct schemas

import { array, boolean, date, enums, min, number, object, size, string } from 'superstruct'

// Auth

export const RegisterSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    password: string(), // TODO: Add custom validator
    email: string(),
})

export const LoginSchema = object({
    email: string(),
    password: string(),
})

export const RecoveryEmail = object({
    email: string(),
})

// Product

export const CategorySchema = object({
    name: size(string(), 3, 25),
    description: size(string(), 3, 255),
    visible: boolean(),
})

export const StateSchema = object({
    name: size(string(), 3, 25),
    visible: boolean(),
})

export const ProductSchema = object({
    name: size(string(), 3, 2147483647),
    description: size(string(), 3, 2147483647),
    price: min(number(), 0),
    stock: min(number(), 0),
    state: StateSchema,
    visible: boolean(),
    images: array(size(string(), 1, 5)), // uniqueItems is not enforceable in Superstruct, but you can handle this logic separately
    categories: array(CategorySchema),
})

// Sale

export const DiscountTypes = enums(['PERCENTAGE', 'CASH'])

export const SaleSchema = object({
    name: size(string(), 1, 100),
    startAt: date(),
    endAt: date(),
    discountType: DiscountTypes,
    discountValue: size(number(), 1, 100),
})

// Order

export const OrderDetailSchema = object({
    productId: number(),
    amount: number(),
    price: number(),
})

export const OrderSchema = object({
    customerId: number(),
    address: size(string(), 3, 2147483647),
    addressCountry: size(string(), 3, 2147483647),
    addressDetail: string(),
    fullname: size(string(), 3, 25),
    addressState: string(),
    addressCity: string(),
    zipCode: number(),
    optionalComment: string(),
    details: array(OrderDetailSchema),
})

// User

export const UserStateScheme = enums(['ACTIVE', 'INACTIVE', 'CLOSED'])

export const AddressSchema = object({
    customerId: number(),
    fullName: size(string(), 3, 50),
    addressLine: string(),
    city: string(),
    region: string(),
    country: string(),
    phone: string(),
    zip: string(),
    deliveryInstructions: string(),
})

export const CustomerSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: string(),
    country: string(),
    phone: string(),
    state: UserStateScheme,
})

export const UserSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: string(),
})

// Cart

export const CartSchema = object({
    productId: number(),
    amount: number(),
})
