import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// mui
import {
	ArrowBack,
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
	TextField
} from '@mui/material'

import {
	getList,
	removeItem,
	createItem
} from '../services/apiService'
import { IItem, IList, IModalProps } from '../types/interfaces'

const RemoveItemModal = ({
	open,
	item,
	list,
	onClose,
	onSubmit,
}: IModalProps) => {
	const handleSubmit = async () => {
		if (list?.id && item?.id) {
			await removeItem(list?.id, item?.id)
				.then((response) => response.status === 200 && toast.success('Položka bola odstránená!'))
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
					Odstrániť túto položku?
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

const CreateItemModal = ({
	open,
	list,
	onClose,
	onSubmit,
}: IModalProps) => {
	const [name, setName] = React.useState<string>('')

	const handleClose = () => {
		setName('')
		onClose()
	}

	const handleSubmit = async () => {
		if (list?.items?.find((item) => name.trim() === item.name)) {
			toast.error('Položka sa už v zozname nachádza!')
		} else if (name && name.trim()) {
			if (list?.id) {
				await createItem(list.id, { name: name.trim() })
					.catch((e: Error) => toast.error(e.message))
				onSubmit()
				handleClose()
			}
		}
	}

	return (
		<div>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Pridať novú položku</DialogTitle>
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

export default function Items() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [createModalOpen, setCreateModalOpen] = React.useState(false)
	const [removeListModalOpen, setRemoveListModalOpen] = React.useState(false)
	const [list, setList] = React.useState<IList | null>(null)
	const [currentItem, setCurrentItem] = React.useState<IItem | null>(null)

	const retrieveList = () => {
		if (id) {
			getList(id)
				.then((response) => {
					setList(response.data.list)
				})
				.catch((e) => toast.error(e.message))
		}
	}

	const handleDelete = (item: IItem) => {
		setCurrentItem(item)
		setRemoveListModalOpen(true)
	}

	const handleModalClose = () => {
		setCurrentItem(null)
		setRemoveListModalOpen(false)
		setCreateModalOpen(false)
	}

	React.useEffect(() => {
		retrieveList()
	}, [])

	return (
		<>
			<Container maxWidth="md">
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 260 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Položky zoznamu</TableCell>
								<TableCell align='right'>
									<IconButton size='large' onClick={() => navigate('/lists')}>
										<ArrowBack />
									</IconButton>
									<IconButton size='large' color='success' onClick={() => setCreateModalOpen(true)}>
										<Add />
									</IconButton>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{list?.items && list.items.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align='right'>
										<IconButton color="error" onClick={() => handleDelete(row)}>
											<Delete />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
			<CreateItemModal
				open={createModalOpen}
				list={list}
				item={currentItem}
				onClose={() => handleModalClose()}
				onSubmit={() => retrieveList()}
			/>
			<RemoveItemModal
				open={removeListModalOpen}
				list={list}
				item={currentItem}
				onClose={() => handleModalClose()}
				onSubmit={() => retrieveList()}
			/>
		</>
	)
}
