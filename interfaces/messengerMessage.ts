export interface IMessengerMessage {
    _id?: string
    messengerId?: string
    message?: string
    response?: string
    agent: boolean,
    view?: boolean
    createdAt?: Date
    updatedAp?: Date
}

export interface IMessengerId {
    messengerId: string
    view: boolean
    createdAt?: Date
}