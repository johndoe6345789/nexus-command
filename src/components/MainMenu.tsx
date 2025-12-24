import { MainMenuLayout } from './templates'
import { MenuGrid } from './organisms'
import { Text } from './atoms'
import { menuItems } from '@/data'
import { MainMenuRefactoredProps } from './props'
import { APP_VERSION, APP_TAGLINE } from '@/constants'

export function MainMenu({ onNavigate }: MainMenuRefactoredProps) {
  return (
    <MainMenuLayout
      tagline={APP_TAGLINE}
      footer={
        <Text
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 10 }}
        >
          {APP_VERSION} • Press any key to continue
        </Text>
      }
    >
      <MenuGrid items={menuItems} onNavigate={onNavigate} />
    </MainMenuLayout>
  )
}
