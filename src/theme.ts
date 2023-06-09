import { createTheme } from '@mui/material/styles'
import { red, green } from '@mui/material/colors'

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		success: {
			main: green.A700
		},
		background: {
			default: '#ffe'
		}
	},
})

export default theme
