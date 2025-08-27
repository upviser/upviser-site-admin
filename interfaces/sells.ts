import { ICartProduct } from './cart'

export interface ISell {
    _id?: string
    buyOrder?: string
    firstName: string
    lastName?: string
    email: string
    address: string
    number: string
    details?: string
    city: string
    region: string
    phone?: number
    cart: ICartProduct[]
    shipping: number
    state: string
    pay: string
    total: number
    shippingMethod: string
    shippingState: string
    createdAt?: Date
    updatedAt?: Date
    shippingLabel?: string
    subscription?: boolean
}