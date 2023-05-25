import { MESSAGE_TYPE } from './enums'

export interface IItem {
    id?: any | null
    name: string
}

export interface IList {
    id?: any | null
    name: string
    items?: IItem[]
}

export interface IResponseMessage {
    type: MESSAGE_TYPE
    message: string
}
