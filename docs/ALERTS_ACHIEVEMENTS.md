# Alerts & Achievements System

## Overview
A comprehensive notification system featuring alerts and achievements management via a persistent top bar.

## Components

### TopBar
- Fixed top navigation with alerts and achievements buttons
- Shows unread alert count badge
- Displays achievement progress (unlocked/total)
- Slide-down panel with tabs for alerts and achievements

### Alert System
- **Alert Types**: info, success, warning, error, achievement
- **Features**:
  - Read/unread status tracking
  - Timestamp display
  - Dismiss individual alerts
  - Mark all as read
  - Clear all alerts

### Achievement System
- **Rarity Tiers**: common, rare, epic, legendary
- **Features**:
  - Progress tracking for multi-step achievements
  - Hidden achievements support
  - Visual rarity indicators with glow effects
  - Automatic alert on unlock

## Usage

### Adding Alerts
```typescript
import { addAlert } from '@/utils/notifications'

await addAlert('success', 'Match Won', 'You defeated 10 players!')
```

### Unlocking Achievements
```typescript
import { unlockAchievement } from '@/utils/notifications'

await unlockAchievement('first-blood')
```

### Tracking Progress
```typescript
import { incrementAchievementProgress } from '@/utils/notifications'

await incrementAchievementProgress('sharpshooter', 1)
```

## Testing
Visit Developer Tools → Notifications tab to test alerts and achievements.

## Data Storage
All data persists using the Spark KV store:
- `game-alerts`: Alert history
- `game-achievements`: Achievement definitions and progress
