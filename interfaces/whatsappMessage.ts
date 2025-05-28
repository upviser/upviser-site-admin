export interface IWhatsappMessage {
    _id?: string
    phone?: string
    message?: string
    response?: string
    agent: boolean,
    view?: boolean
    createdAt?: Date
    updatedAp?: Date
}

export interface IWhatsappId {
    phone: string
    view: boolean
    createdAt?: Date
}