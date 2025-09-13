export interface IChatMessage {
    _id?: string
    senderId?: string
    message?: string
    response?: string
    agent: boolean
    adminView?: boolean
    userView?: boolean

    createdAt?: Date
    updatedAt?: Date
}

export interface IChatId {
    senderId: string
    adminView: boolean
    tag: string
    message: string
    createdAt?: Date
}