export function handleConsoleCommand(command: string, systemStats: { fps: number; memoryUsage: string }): string[] {
  const output: string[] = []
  
  const cmd = command.toLowerCase().trim()
  if (cmd === 'help') {
    output.push('Available commands:')
    output.push('  help - Show this help message')
    output.push('  clear - Clear console output')
    output.push('  stats - Show detailed system statistics')
  } else if (cmd === 'clear') {
    return ['> Console cleared']
  } else if (cmd === 'stats') {
    output.push('System Statistics:')
    output.push(`  FPS: ${systemStats.fps}`)
    output.push(`  Memory: ${systemStats.memoryUsage}`)
  } else {
    output.push(`Unknown command: "${command}"`)
  }

  return output
}
