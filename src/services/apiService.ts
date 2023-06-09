import axios from 'axios'

import { IItem, IList } from '../types/interfaces'

const http = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1',
	headers: {
		'Content-type': 'application/json'
	}
})

export const getLists = () => http.get('/lists')

export const getList = (listID: number | string) => http.get(`/lists/${listID}`)

export const createList = (data: IList) => http.post('/lists', data)

export const updateList = (listID: number | string, data: IList) => http.patch(`/lists/${listID}`, data)

export const removeList = (listID: number | string) => http.delete(`/lists/${listID}`)

export const createItem = (listID: number | string, data: IItem) => http.post(`/lists/${listID}/items`, data)

export const removeItem = (listID: number | string, itemID: number | string) => http.delete(`/lists/${listID}/items/${itemID}`)
