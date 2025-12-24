import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filesToRemove = [
  'src/components/DeveloperRefactored.tsx',
  'src/components/MainMenuRefactored.tsx',
  'src/components/MultiplayerRefactored.tsx',
  'src/components/PlayerStatsRefactored.tsx',
  'src/components/SettingsRefactored.tsx',
  'src/components/SinglePlayerRefactored.tsx',
  'src/components/props/MainMenuRefactoredProps.ts',
  'cleanup-refactored.sh',
  'remove-duplicates.sh'
]

console.log('🧹 Cleaning up duplicate refactored files...\n')

for (const file of filesToRemove) {
  try {
    await unlink(join(__dirname, file))
    console.log(`✓ Removed: ${file}`)
  } catch (error) {
    console.log(`✗ Could not remove: ${file} (${error.message})`)
  }
}

console.log('\n✨ Cleanup complete!')
