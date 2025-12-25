import { Box, TextField, Typography } from '@mui/material'
import { useRef, useEffect } from 'react'

interface ConsolePanelProps {
  output: string[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ConsolePanel({ output, input, onInputChange, onSubmit }: ConsolePanelProps) {
  const consoleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (consoleContainerRef.current) {
      const element = consoleContainerRef.current
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [output])

  return (
    <>
      <Box
        ref={consoleContainerRef}
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 2,
          p: 3,
          mb: 2,
          height: '500px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          border: '1px solid rgba(74, 158, 255, 0.3)',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {output.map((line, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              color: line.startsWith('>')
                ? 'oklch(0.75 0.20 220)'
                : 'oklch(0.85 0.05 220)',
              fontFamily: 'monospace',
              mb: 0.5,
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter command..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <Typography sx={{ mr: 1, color: 'oklch(0.75 0.20 220)' }}>
                  &gt;
                </Typography>
              ),
              sx: {
                fontFamily: 'monospace',
              },
            },
          }}
        />
      </form>
    </>
  )
}
