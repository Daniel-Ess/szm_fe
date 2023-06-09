import { MESSAGE_TYPE } from './enums'

export interface IItem {
    id?: number | string | null
    name: string
}

export interface IList {
    id?: number | string | null
    name: string
    items?: IItem[] | null
}

export interface IResponseMessage {
    type: MESSAGE_TYPE
    message: string
}

export interface IModalProps {
	open: boolean
    onClose: () => void
	onSubmit: () => void
    list?: IList | null
    item?: IItem | null
}
