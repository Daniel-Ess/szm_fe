import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// mui
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
// views
// import Add from './views/Add'
// import Edit from './views/Edit'
// import List from './views/List'
import Lists from './views/Lists'
import Items from './views/Items'

export default function App() {
	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<Typography align="center" variant="h4" component="h1" gutterBottom>
					Nákupný košík
				</Typography>
				<Routes>
					<Route path="/" element={<Lists/>} />
					<Route path="/lists" element={<Lists/>} />
					<Route path="/lists/:id" element={<Items/>} />
				</Routes>
			</Box>
			<ToastContainer />
		</Container>
	)
}
