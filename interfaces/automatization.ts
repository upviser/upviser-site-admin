export interface IAutomatization {
    _id?: string
    startType: string
    startValue: string
    name: string
    automatization: IEmailAutomatization[]
    text?: string
    replyPromt?: string
    message?: string
}

export interface IEmailAutomatization {
    affair: string
    title: string
    paragraph: string
    buttonText: string
    condition?: string[]
    url: string
    number?: number
    time?: string
    date?: Date
}