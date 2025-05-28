import { IQuantityOffer, IVariation } from "./products"

export interface ICartProduct {
    _id?: string
    name: string
    image: string
    price: number
    beforePrice?: number
    variation?: IVariation
    slug: string
    quantity: number
    stock?: number
    category: string
    quantityOffers?: IQuantityOffer[]
    sku?: string
    dimentions: { weight: string, height: string, width: string, length: string }
}