import React, { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import DataService from '../services/DataService'
import { IItem } from '../types/interfaces'

const AddItem: React.FC = () => {
	const { id }= useParams();
	const initialItemState = {
		id: null,
		name: ''
	}

	const [item, setItem] = useState<IItem>(initialItemState)
	const [submitted, setSubmitted] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setItem({ ...item, [name]: value })
	}

	const saveItem = () => {
		const data = {
			name: item.name
		}
		if (id) {
			DataService.createItem(id, data)
			.then((response: any) => {
				setItem({
					id: response.data.id,
					name: response.data.name
				})
				setSubmitted(true)
				setError(false)
				console.log(response.data)
			})
			.catch((e: Error) => {
				console.log(e)
				setError(true)
			})
		}
	}

	const newItem = () => {
		setItem(initialItemState)
		setSubmitted(false)
		setError(false)
	}

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>Item created successfully!</h4>
					<button className="btn btn-success" onClick={newItem}>
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
							value={item.name}
							onChange={handleInputChange}
							name="name"
						/>
					</div>

					<button onClick={saveItem} className="btn btn-success">
						Submit
					</button>
				</div>
			)}
			{error ? (
				<p className='mx-auto mt-2'>
					Error or duplicate item
				</p>
			) : (<p></p>)}
		</div>

	)
}

export default AddItem