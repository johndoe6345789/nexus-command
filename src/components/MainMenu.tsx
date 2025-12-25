import { MainMenuLayout } from './templates'
import { MenuGrid } from './organisms'
import { Typography } from '@mui/material'
import { menuItems } from '@/data'
import { MainMenuProps } from './props'
import { APP_VERSION, APP_TAGLINE } from '@/constants'

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <MainMenuLayout
      tagline={APP_TAGLINE}
      footer={
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 10 }}>
          {APP_VERSION} • Press any key to continue
        </Typography>
      }
    >
      <MenuGrid items={menuItems} onNavigate={onNavigate} />
    </MainMenuLayout>
  )
}
