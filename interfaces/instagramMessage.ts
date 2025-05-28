export interface IInstagramMessage {
    _id?: string
    instagramId?: string
    message?: string
    response?: string
    agent: boolean
    view?: boolean
    createdAt?: Date
    updatedAp?: Date
}

export interface IInstagramId {
    instagramId: string
    view: boolean
    createdAt?: Date
}