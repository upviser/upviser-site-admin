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
    tag: string
    message: string
    createdAt?: Date
}

export interface IWhatsappTemplate {
    id?: string
    name: string
    category: string
    components: IComponent[]
}

interface IComponent {
    type: string
    format?: string
    text?: string
    example?: { header_text?: string[], body_text?: [string[]] }
    buttons?: { type: string, text: string, phone_number?: string, url?: string }[]
}