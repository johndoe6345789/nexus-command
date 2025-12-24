import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Terminal } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ConsolePanel } from './ConsolePanel'

interface ConsoleTabProps {
  output: string[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ConsoleTab({ output, input, onInputChange, onSubmit }: ConsoleTabProps) {
  return (
    <motion.div
      key="console"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Terminal size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
            <Typography variant="h4">Console</Typography>
          </Stack>
          <ConsolePanel
            output={output}
            input={input}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
