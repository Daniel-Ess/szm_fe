import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import theme from './theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<App />
			</BrowserRouter>
		</ThemeProvider>,
	</React.StrictMode>
)
