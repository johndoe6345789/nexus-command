import { Alert } from '@/types'
import { cn } from '@/lib/utils'
import { 
  Info, 
  CheckCircle, 
  Warning, 
  XCircle, 
  Trophy 
} from '@phosphor-icons/react'

interface AlertItemProps {
  alert: Alert
  onRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function AlertItem({ alert, onRead, onDismiss }: AlertItemProps) {
  const iconConfig = {
    info: { Icon: Info, color: 'text-[oklch(0.65_0.18_230)]' },
    success: { Icon: CheckCircle, color: 'text-[oklch(0.65_0.18_150)]' },
    warning: { Icon: Warning, color: 'text-[oklch(0.70_0.18_80)]' },
    error: { Icon: XCircle, color: 'text-[oklch(0.65_0.20_15)]' },
    achievement: { Icon: Trophy, color: 'text-[oklch(0.70_0.20_45)]' },
  }

  const { Icon, color } = iconConfig[alert.type]

  const handleClick = () => {
    if (!alert.read) {
      onRead(alert.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative flex gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200',
        'hover:bg-[oklch(0.20_0.03_250)] hover:border-[oklch(0.55_0.12_230)]',
        alert.read
          ? 'bg-[oklch(0.15_0.02_250)] border-[oklch(0.25_0.04_250)] opacity-60'
          : 'bg-[oklch(0.18_0.03_250)] border-[oklch(0.35_0.08_250)]'
      )}
    >
      {!alert.read && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[oklch(0.65_0.18_230)]" />
      )}
      
      <div className={cn('flex-shrink-0 mt-0.5', color)}>
        <Icon size={20} weight="duotone" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-heading font-semibold text-sm text-[oklch(0.98_0.01_250)]">
            {alert.title}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDismiss(alert.id)
            }}
            className="text-[oklch(0.55_0.05_250)] hover:text-[oklch(0.85_0.01_250)] transition-colors"
          >
            <XCircle size={16} weight="fill" />
          </button>
        </div>
        <p className="text-xs text-[oklch(0.75_0.03_250)] mt-1 leading-relaxed">
          {alert.message}
        </p>
        <div className="text-[10px] text-[oklch(0.55_0.05_250)] mt-2">
          {new Date(alert.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
