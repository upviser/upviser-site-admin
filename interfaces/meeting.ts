export interface IMeeting {
    _id: string
    email: string
    firstName: string
    lastName: string
    phone: string
    meeting: string
    date: Date
    url: string
    data?: { name: string, value: string }[]
    service?: string
    funnel?: string
    step?: string
    calendar?: string
    type?: string
    address?: string
    details?: string
    city?: string
    region?: string
    price?: string
}