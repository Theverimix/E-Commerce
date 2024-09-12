// Superstruct schemas

import { array, boolean, date, enums, min, number, object, optional, pattern, size, string } from 'superstruct'

const Password = pattern(string(), /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/)
const Email = pattern(string(), /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
// Auth

export const LoginSchema = object({
    email: size(string(), 3, 125),
    password: size(string(), 8, 255),
})

export const RecoveryEmail = object({
    email: string(),
})

export const RegisterSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: size(string(), 3, 125),
    password: Password,
    confirmPassword: Password,
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
    state: min(number(), 0),
    visible: boolean(),
    images: optional(string()), // uniqueItems is not enforceable in Superstruct, but you can handle this logic separately
    categories: optional(array(number())),
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
    firstname: string(),
    lastname: string(),
    address: string(),
    addressDetail: optional(string()),
    country: object(),
    state: object(),
    city: object(),
    zipCode: number(),
    optionalComment: optional(string()),
})

// User

export const UserStateScheme = enums(['ACTIVE', 'INACTIVE', 'CLOSED'])

export const AddressSchema = object({
    customerId: number(),
    fullName: size(string(), 1, 50),
    addressLine: string(),
    city: string(),
    region: string(),
    country: string(),
    phone: string(),
    zip: string(),
})

export const PersonalDataSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: Email,
    country: size(string(), 3, 25),
    phone: size(string(), 3, 25),
})

export const CustomerSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: Email,
    country: size(string(), 3, 25),
    phone: size(string(), 3, 25),
    state: UserStateScheme,
})

export const UserSchema = object({
    firstname: size(string(), 3, 25),
    lastname: size(string(), 3, 25),
    email: string(),
})

// Cart

const CartItem = object({
    productId: number(),
    amount: number(),
})

export const CartSchema = object({
    customerId: number(),
    items: array(CartItem),
})
