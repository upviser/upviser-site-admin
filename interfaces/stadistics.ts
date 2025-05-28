import { IClient } from "./clients"
import { IMeeting } from "./meeting"

export interface IStadistics {
    pages: any[]
    sessions: any[]
    viewContents: any[]
    addCarts: any[]
    leads: any[]
    meetings: IMeeting[]
    informations: any[]
    checkouts: any[]
    pays: any[]
    sells: any[]
    clients: IClient[]
}