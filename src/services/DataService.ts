import http from '../http-axios'
import { IList, IItem } from '../types/interfaces'

const getAllLists = () => http.get<Array<IList>>('/lists')

const getList = (listID: number | string) => http.get<any>(`/lists/${listID}`)

const createList = (data: IList) => http.post<any>('/lists', data)

const updateList = (listID: number | string, data: IList) => http.patch<any>(`/lists/${listID}`, data)

const removeList = (listID: number | string) => http.delete<any>(`/lists/${listID}`)

const createItem = (listID: number | string, data: IItem) => http.post<any>(`/lists/${listID}/items`, data)

const removeItem = (listID: number | string, itemID: number | string) => http.delete<any>(`/lists/${listID}/items/${itemID}`)

const DataService = {
	getAllLists,
	getList,
	createList,
	updateList,
	removeList,
	createItem,
	removeItem
}

export default DataService
