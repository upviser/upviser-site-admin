export interface IStoreData {
    _id?: string
    name: string
    nameContact: string
    email: string
    phone?: string
    locations?: {
        commercial?: Boolean
        mapsLink?: string
        address?: string
        details?: string
        region?: string
        city?: string
        countyCoverageCode?: string
        streetName?: string
        streetNumber?: string
    }[]
    schedule?: ISchedule
    logo?: string
    logoWhite: string
    instagram?: string
    facebook?: string
    tiktok?: string
    whatsapp?: string
}

export interface ISchedule {
    monday: {
        state: boolean
        open: string
        close: string
    }
    tuesday: {
        state: boolean
        open: string
        close: string
    }
    wednesday: {
        state: boolean
        open: string
        close: string
    }
    thursday: {
        state: boolean
        open: string
        close: string
    }
    friday: {
        state: boolean
        open: string
        close: string
    }
    saturday: {
        state: boolean
        open: string
        close: string
    }
    sunday: {
        state: boolean
        open: string
        close: string
    }
}