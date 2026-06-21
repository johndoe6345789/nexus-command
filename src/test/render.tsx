import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { muiTheme } from '@/theme/mui-theme'

export function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={muiTheme}>{ui}</ThemeProvider>)
}
