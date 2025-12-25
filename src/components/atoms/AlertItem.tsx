import { Alert } from '@/types'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import { 
  Info, 
  CheckCircle, 
  Warning, 
  Cancel, 
  EmojiEvents 
} from '@mui/icons-material'

interface AlertItemProps {
  alert: Alert
  onRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function AlertItem({ alert, onRead, onDismiss }: AlertItemProps) {
  const iconConfig = {
    info: { Icon: Info, color: 'oklch(0.65 0.18 230)' },
    success: { Icon: CheckCircle, color: 'oklch(0.65 0.18 150)' },
    warning: { Icon: Warning, color: 'oklch(0.70 0.18 80)' },
    error: { Icon: Cancel, color: 'oklch(0.65 0.20 15)' },
    achievement: { Icon: EmojiEvents, color: 'oklch(0.70 0.20 45)' },
  }

  const { Icon: IconComponent, color } = iconConfig[alert.type]

  const handleClick = () => {
    if (!alert.read) {
      onRead(alert.id)
    }
  }

  return (
    <Paper
      onClick={handleClick}
      elevation={0}
      sx={{
        position: 'relative',
        display: 'flex',
        gap: 1.5,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: alert.read ? 'oklch(0.25 0.04 250)' : 'oklch(0.35 0.08 250)',
        bgcolor: alert.read ? 'oklch(0.15 0.02 250)' : 'oklch(0.18 0.03 250)',
        opacity: alert.read ? 0.6 : 1,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        '&:hover': {
          bgcolor: 'oklch(0.20 0.03 250)',
          borderColor: 'oklch(0.55 0.12 230)',
        },
      }}
    >
      {!alert.read && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'oklch(0.65 0.18 230)',
          }}
        />
      )}
      
      <Box sx={{ flexShrink: 0, mt: 0.25, color }}>
        <IconComponent sx={{ fontSize: 20 }} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'oklch(0.98 0.01 250)',
              fontSize: '14px',
            }}
          >
            {alert.title}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onDismiss(alert.id)
            }}
            sx={{
              p: 0,
              color: 'oklch(0.55 0.05 250)',
              '&:hover': {
                color: 'oklch(0.85 0.01 250)',
              },
            }}
          >
            <Cancel sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '12px',
            color: 'oklch(0.75 0.03 250)',
            mt: 0.5,
            lineHeight: 1.6,
          }}
        >
          {alert.message}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: '10px',
            color: 'oklch(0.55 0.05 250)',
            mt: 1,
            display: 'block',
          }}
        >
          {new Date(alert.timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  )
}
