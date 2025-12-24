# Files to Delete

The following placeholder files need to be manually deleted from the project:

## Empty Refactored Component Placeholders

These files contain only `export {}` and are not used anywhere in the codebase:

- `/workspaces/spark-template/src/components/DeveloperRefactored.tsx`
- `/workspaces/spark-template/src/components/MainMenuRefactored.tsx`
- `/workspaces/spark-template/src/components/MultiplayerRefactored.tsx`
- `/workspaces/spark-template/src/components/PlayerStatsRefactored.tsx`
- `/workspaces/spark-template/src/components/SettingsRefactored.tsx`
- `/workspaces/spark-template/src/components/SinglePlayerRefactored.tsx`

## Duplicate Props File

This file is a duplicate of `MainMenuProps.ts` and is not imported anywhere:

- `/workspaces/spark-template/src/components/props/MainMenuRefactoredProps.ts`

## How to Delete

Run the following commands from the project root:

```bash
rm src/components/DeveloperRefactored.tsx
rm src/components/MainMenuRefactored.tsx
rm src/components/MultiplayerRefactored.tsx
rm src/components/PlayerStatsRefactored.tsx
rm src/components/SettingsRefactored.tsx
rm src/components/SinglePlayerRefactored.tsx
rm src/components/props/MainMenuRefactoredProps.ts
```

Or as a single command:

```bash
rm src/components/{Developer,MainMenu,Multiplayer,PlayerStats,Settings,SinglePlayer}Refactored.tsx
rm src/components/props/MainMenuRefactoredProps.ts
```

## Verification

After deletion, verify that:
1. The application still runs without errors
2. All imports in `App.tsx` still resolve correctly (they use the non-refactored versions)
3. No other files import these refactored versions

These files are artifacts from a previous refactoring attempt and are safe to remove.
