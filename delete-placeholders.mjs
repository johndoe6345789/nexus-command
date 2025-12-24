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
  '.cleanup-duplicates.sh',
  'cleanup-duplicates.mjs',
  'cleanup-refactored.sh',
  'remove-duplicates.sh',
  'CLEANUP_NOTES.md',
  'COMPONENT_MERGE.md',
  'MERGE_COMPLETE.md',
  'REFACTOR_MERGE_COMPLETE.md',
]

console.log('🧹 Deleting placeholder files...\n')

let removed = 0
let failed = 0

for (const file of filesToRemove) {
  try {
    await unlink(join(__dirname, file))
    console.log(`✓ Removed: ${file}`)
    removed++
  } catch (error) {
    console.log(`✗ Could not remove: ${file} (${error.code})`)
    failed++
  }
}

console.log(`\n✨ Cleanup complete! ${removed} files removed, ${failed} files not found.`)

try {
  await unlink(join(__dirname, 'delete-placeholders.mjs'))
  console.log('✓ Removed cleanup script itself')
} catch (error) {
  console.log('✗ Could not remove cleanup script')
}
