export interface ICall {
    _id?: string
    type?: string[]
    nameMeeting: string
    title?: string
    duration: string
    intervals?: string
    description?: string
    price?: string
    labels?: { type: string, text: string, data?: string, datas?: string[] }[]
    buttonText?: string
    tags?: string[]
    action: string
    redirect?: string
    message?: string
    calendar?: string
    address?: string
    details?: string
    city?: string
    region?: string
}