import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// mui
import {
	List,
	Edit,
	Delete,
	Add
} from '@mui/icons-material'
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	Container,
	TableRow,
	IconButton,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	Box
} from '@mui/material'

import {
	getLists,
	removeList,
	createList,
	updateList
} from '../services/apiService'
import { IList, IModalProps } from '../types/interfaces'

const RemoveListModal = ({
	open,
	list,
	onClose,
	onSubmit,
}: IModalProps) => {
	const handleSubmit = async () => {
		if (list?.id) {
			await removeList(list.id)
				.then((response) => response.status === 200 && toast.success('Zoznam bol odstránený!'))
				.catch((e: Error) => toast.error(e.message))
			onSubmit()
			onClose()
		}
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Odstrániť tento zoznam?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Táto akcia je nezvratná!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Zrusiť</Button>
					<Button onClick={handleSubmit} autoFocus>
						Potvrdiť
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const CreateOrUpdateListModal = ({
	open,
	list,
	onClose,
	onSubmit,
}: IModalProps) => {
	const [name, setName] = React.useState<string>(list?.name || '')

	const dialogTitleText = list ? 'Upraviť zoznam' : 'Vytvoriť nový zoznam'

	const handleClose = () => {
		setName('')
		onClose()
	}

	const handleSubmit = async () => {
		if (name && name.trim()) {
			if (list?.id) {
				await updateList(list.id, { name: name.trim() })
					.catch((e: Error) => toast.error(e.message))
			} else {
				await createList({ name: name.trim() })
					.catch((e: Error) => toast.error(e.message))
			}
			onSubmit()
			handleClose()
		}
	}

	return (
		<div>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>{dialogTitleText}</DialogTitle>
				<DialogContent>
					<form onSubmit={(e) => e.preventDefault()}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Názov"
							type="text"
							fullWidth
							variant="standard"
							inputProps={{ maxLength: 50 }}
							defaultValue={list ? list.name : null}
							onChange={(e) => setName(e.target.value)}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Zrušiť</Button>
					<Button onClick={handleSubmit} disabled={name.trim() === ''}>
						Potvrdiť
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default function Lists() {
	const navigate = useNavigate()
	const [lists, setLists] = React.useState<Array<IList>>([])
	const [createOrUpdateModalOpen, setCreateOrUpdateModalOpen] = React.useState(false)
	const [removeListModalOpen, setRemoveListModalOpen] = React.useState(false)
	const [currentList, setCurrentList] = React.useState<IList | null>(null)

	const retrieveLists = () => {
		getLists()
			.then((response) => {
				setLists(response.data.lists)
			})
			.catch((e) => toast.error(e.message))
	}

	const handleDelete = (list: IList) => {
		setCurrentList(list)
		setRemoveListModalOpen(true)
	}

	const handleEdit = (list: IList) => {
		setCurrentList(list)
		setCreateOrUpdateModalOpen(true)
	}

	const handleModalClose = () => {
		setCurrentList(null)
		setRemoveListModalOpen(false)
		setCreateOrUpdateModalOpen(false)
	}

	React.useEffect(() => {
		retrieveLists()
	}, [])

	return (
		<>
			<Container maxWidth="md">
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 260 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Zoznamy</TableCell>
								<TableCell align='right'>
									<IconButton size='large' color='success' onClick={() => setCreateOrUpdateModalOpen(true)}>
										<Add />
									</IconButton>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lists.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align='right'>
										<Box sx={{ display: 'flex', gap: '1rem' }}>
											<IconButton onClick={() => navigate(`/lists/${row.id}`)}>
												<List />
											</IconButton>
											<IconButton onClick={() => handleEdit(row)}>
												<Edit />
											</IconButton>
											<IconButton color="error" onClick={() => handleDelete(row)}>
												<Delete />
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
			<CreateOrUpdateListModal
				open={createOrUpdateModalOpen}
				list={currentList}
				onClose={() => handleModalClose()}
				onSubmit={() => retrieveLists()}
			/>
			<RemoveListModal
				open={removeListModalOpen}
				list={currentList}
				onClose={() => handleModalClose()}
				onSubmit={() => retrieveLists()}
			/>
		</>
	)
}
