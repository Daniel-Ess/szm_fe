import React, { useState, ChangeEvent } from 'react'
import DataService from '../services/DataService'
import { IList } from '../types/interfaces'

const AddList: React.FC = () => {
	const initialListState = {
		id: null,
		name: ''
	}

	const [list, setList] = useState<IList>(initialListState)
	const [submitted, setSubmitted] = useState<boolean>(false)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setList({ ...list, [name]: value })
	}

	const saveList = () => {
		const data = {
			name: list.name
		}

		DataService.createList(data)
			.then((response: any) => {
				setList({
					id: response.data.id,
					name: response.data.name
				})
				setSubmitted(true)
				console.log(response.data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

	const newList = () => {
		setList(initialListState)
		setSubmitted(false)
	}

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>List created successfully!</h4>
					<button className="btn btn-success" onClick={newList}>
            Add
					</button>
				</div>
			) : (
				<div>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							className="form-control"
							id="name"
							required
							value={list.name}
							onChange={handleInputChange}
							name="name"
						/>
					</div>

					<button onClick={saveList} className="btn btn-success">
						Submit
					</button>
				</div>
			)}
		</div>
	)
}

export default AddList