import { createTheme } from '@mui/material/styles'
import { palette } from './palette'
import { typography } from './typography'
import { components } from './components'

export const muiTheme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  components,
})
