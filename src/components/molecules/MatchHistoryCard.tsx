import { Badge } from '@/components/ui/badge'

interface MatchHistoryCardProps {
  map: string
  mode: string
  result: 'Victory' | 'Defeat'
  score: string
  date: string
}

export function MatchHistoryCard({ map, mode, result, score, date }: MatchHistoryCardProps) {
  return (
    <div className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-heading text-base font-bold text-foreground mb-1">
            {map}
          </h6>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {mode}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {date}
            </span>
          </div>
        </div>
        <div className="text-right">
          <Badge 
            variant={result === 'Victory' ? 'default' : 'destructive'}
            className="mb-1"
          >
            {result}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {score}
          </p>
        </div>
      </div>
    </div>
  )
}
