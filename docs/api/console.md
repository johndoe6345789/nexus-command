# Console API

The Console API provides developer tools and command execution for debugging and testing NEXUS COMMAND.

## Overview

The developer console allows execution of commands for testing, debugging, and modifying game state. Commands are processed through a central handler with error handling and logging.

## Core Function

### `handleConsoleCommand(command: string): string`

Processes console commands and returns output.

**Location:** `src/utils/handleConsoleCommand.ts`

**Parameters:**
- `command` (string): Command string to execute

**Returns:**
- `string`: Command output or error message

## Available Commands

### Help Commands

#### `help`
Displays list of available commands.

```
> help
Available commands:
- help: Show available commands
- clear: Clear console output
- stats: Display player statistics
[... more commands ...]
```

#### `clear`
Clears the console output.

```
> clear
Console cleared
```

### Player Commands

#### `stats`
Displays current player statistics.

```
> stats
Player Statistics:
- Games Played: 42
- Win Rate: 65.5%
- K/D Ratio: 1.85
- Total Kills: 1250
```

#### `reset_stats`
Resets all player statistics to default values.

```
> reset_stats
Player statistics reset to default values
```

### Server Commands

#### `list_servers`
Lists available multiplayer servers.

```
> list_servers
Available Servers:
1. [NA East] Death Arena - 12/16 - 45ms
2. [EU West] Thunder Dome - 8/12 - 78ms
[... more servers ...]
```

#### `refresh_servers`
Refreshes the server list.

```
> refresh_servers
Server list refreshed. Found 15 servers.
```

### System Commands

#### `fps`
Displays current frame rate information.

```
> fps
FPS: 144
Frame Time: 6.94ms
```

#### `ping [server]`
Tests connection to a server.

```
> ping eu-west-01
Pinging eu-west-01... 
Response time: 78ms
```

#### `version`
Displays game version information.

```
> version
NEXUS COMMAND v1.0.0
Build: 2024-01-15
Engine: WebGL 2.0
```

### Debug Commands

#### `debug [on|off]`
Toggles debug mode.

```
> debug on
Debug mode enabled
```

#### `log [level]`
Sets logging level (error, warn, info, debug).

```
> log debug
Logging level set to: debug
```

#### `memory`
Displays memory usage information.

```
> memory
Heap Size: 45.2 MB
Used: 32.8 MB (72.6%)
Limit: 512 MB
```

### Game Commands

#### `map [mapname]`
Changes the current map.

```
> map blood_covenant
Loading map: blood_covenant...
Map loaded successfully
```

#### `difficulty [level]`
Sets game difficulty (1-4).

```
> difficulty 3
Difficulty set to: Hard
```

#### `spawn_bot [name]`
Spawns an AI bot.

```
> spawn_bot Hunter
Bot 'Hunter' spawned successfully
```

### Settings Commands

#### `set [key] [value]`
Sets a configuration value.

```
> set fov 110
Field of View set to: 110
```

#### `get [key]`
Gets a configuration value.

```
> get fov
Field of View: 90
```

#### `reset_settings`
Resets all settings to defaults.

```
> reset_settings
All settings reset to default values
```

## Implementation Example

### Basic Console Component

```typescript
import { useState } from 'react'
import { handleConsoleCommand } from '@/utils'

interface ConsoleEntry {
  type: 'command' | 'output' | 'error'
  text: string
  timestamp: number
}

function DeveloperConsole() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<ConsoleEntry[]>([])

  const executeCommand = () => {
    if (!input.trim()) return

    // Add command to history
    setHistory((current) => [
      ...current,
      {
        type: 'command',
        text: input,
        timestamp: Date.now()
      }
    ])

    // Execute command
    const output = handleConsoleCommand(input)

    // Add output to history
    setHistory((current) => [
      ...current,
      {
        type: output.startsWith('Error') ? 'error' : 'output',
        text: output,
        timestamp: Date.now()
      }
    ])

    setInput('')
  }

  return (
    <div className="console">
      <div className="output">
        {history.map((entry, i) => (
          <div key={i} className={entry.type}>
            {entry.type === 'command' && '> '}
            {entry.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && executeCommand()}
        placeholder="Enter command..."
      />
    </div>
  )
}
```

### Advanced Console with Command History

```typescript
function AdvancedConsole() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<ConsoleEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const executeCommand = () => {
    if (!input.trim()) return

    // Save to command history
    setCommandHistory((current) => [...current, input])
    setHistoryIndex(-1)

    // Add to display
    setHistory((current) => [
      ...current,
      { type: 'command', text: input, timestamp: Date.now() }
    ])

    // Execute
    const output = handleConsoleCommand(input)
    
    setHistory((current) => [
      ...current,
      { 
        type: output.startsWith('Error') ? 'error' : 'output',
        text: output,
        timestamp: Date.now()
      }
    ])

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const newIndex = historyIndex + 1
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="console">
      <div className="output">
        {history.map((entry, i) => (
          <div key={i} className={entry.type}>
            {entry.type === 'command' && '> '}
            {entry.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter command..."
      />
    </div>
  )
}
```

## Custom Command Registration

### Extending the Command Handler

```typescript
// Add to handleConsoleCommand.ts

const commandHandlers: Record<string, (args: string[]) => string> = {
  help: () => getHelpText(),
  clear: () => 'Console cleared',
  stats: () => getPlayerStats(),
  
  // Custom command
  teleport: (args) => {
    if (args.length < 2) {
      return 'Error: Usage - teleport <x> <y> <z>'
    }
    const [x, y, z] = args.map(Number)
    if (args.some(isNaN)) {
      return 'Error: Coordinates must be numbers'
    }
    return `Teleported to position: (${x}, ${y}, ${z})`
  }
}

export function handleConsoleCommand(command: string): string {
  const [cmd, ...args] = command.trim().split(/\s+/)
  const handler = commandHandlers[cmd.toLowerCase()]
  
  if (!handler) {
    return `Error: Unknown command '${cmd}'. Type 'help' for available commands.`
  }
  
  try {
    return handler(args)
  } catch (error) {
    return `Error: Command execution failed - ${error.message}`
  }
}
```

## Command Autocomplete

```typescript
const availableCommands = [
  'help', 'clear', 'stats', 'reset_stats',
  'list_servers', 'refresh_servers', 'fps',
  'ping', 'version', 'debug', 'log',
  'memory', 'map', 'difficulty', 'spawn_bot',
  'set', 'get', 'reset_settings'
]

function ConsoleWithAutocomplete() {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const updateSuggestions = (value: string) => {
    if (!value) {
      setSuggestions([])
      return
    }
    
    const matches = availableCommands.filter(cmd =>
      cmd.startsWith(value.toLowerCase())
    )
    setSuggestions(matches)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    updateSuggestions(value.split(' ')[0])
  }

  return (
    <div>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(cmd => (
            <div key={cmd} onClick={() => setInput(cmd)}>
              {cmd}
            </div>
          ))}
        </div>
      )}
      <input
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  )
}
```

## Best Practices

1. **Validate command input** before execution
2. **Provide helpful error messages** with usage hints
3. **Log all command execution** for debugging
4. **Limit command history** to prevent memory issues
5. **Implement command aliases** for commonly used commands
6. **Add autocomplete** for better UX
7. **Support command chaining** with semicolons
8. **Provide command documentation** via help text

## Security Considerations

```typescript
// Sanitize input
const sanitizeCommand = (cmd: string): string => {
  return cmd.trim().replace(/[^\w\s-]/g, '')
}

// Rate limiting
let lastCommandTime = 0
const COMMAND_COOLDOWN = 100 // ms

function executeWithRateLimit(command: string) {
  const now = Date.now()
  if (now - lastCommandTime < COMMAND_COOLDOWN) {
    return 'Error: Command rate limit exceeded'
  }
  lastCommandTime = now
  return handleConsoleCommand(command)
}

// Command permissions
const restrictedCommands = ['reset_stats', 'reset_settings']

function checkPermission(command: string): boolean {
  // Check if user is admin/developer
  return user.isOwner || !restrictedCommands.includes(command)
}
```

## Future Enhancements

- Command aliases system
- Syntax highlighting
- Command macros/scripts
- Export command history
- Remote console access
- Command scheduling
- Variable system
- Conditional execution
