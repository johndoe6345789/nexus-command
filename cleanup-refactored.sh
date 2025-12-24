#!/bin/bash

echo "Cleaning up duplicate refactored component files..."

# Remove empty refactored component files
FILES_TO_REMOVE=(
  "/workspaces/spark-template/src/components/DeveloperRefactored.tsx"
  "/workspaces/spark-template/src/components/MainMenuRefactored.tsx"
  "/workspaces/spark-template/src/components/MultiplayerRefactored.tsx"
  "/workspaces/spark-template/src/components/PlayerStatsRefactored.tsx"
  "/workspaces/spark-template/src/components/SettingsRefactored.tsx"
  "/workspaces/spark-template/src/components/SinglePlayerRefactored.tsx"
  "/workspaces/spark-template/src/components/props/MainMenuRefactoredProps.ts"
  "/workspaces/spark-template/remove-duplicates.sh"
)

for file in "${FILES_TO_REMOVE[@]}"; do
  if [ -f "$file" ]; then
    rm "$file"
    echo "✓ Removed: $(basename $file)"
  else
    echo "✗ Not found: $(basename $file)"
  fi
done

echo ""
echo "Cleanup complete! All duplicate refactored files have been removed."
echo "The active components are:"
echo "  - MainMenu.tsx"
echo "  - SinglePlayer.tsx"
echo "  - Multiplayer.tsx"
echo "  - Settings.tsx"
echo "  - PlayerStats.tsx"
echo "  - Developer.tsx"
echo ""
echo "These components are properly structured using atomic design patterns:"
echo "  - atoms/"
echo "  - molecules/"
echo "  - organisms/"
echo "  - templates/"
