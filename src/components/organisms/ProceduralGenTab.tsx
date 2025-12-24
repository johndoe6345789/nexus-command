import { motion } from 'framer-motion'
import { ProceduralGenPanel } from './ProceduralGenPanel'

interface ProceduralGenTabProps {
  isGenerating: boolean
  generationProgress: number
  onGenerationStart: (type: string) => void
  onGenerationProgress: (progress: number) => void
  onGenerationEnd: () => void
}

export function ProceduralGenTab({
  isGenerating,
  generationProgress,
  onGenerationStart,
  onGenerationProgress,
  onGenerationEnd
}: ProceduralGenTabProps) {
  return (
    <motion.div
      key="procgen"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProceduralGenPanel
        isGenerating={isGenerating}
        generationProgress={generationProgress}
        onGenerationStart={onGenerationStart}
        onGenerationProgress={onGenerationProgress}
        onGenerationEnd={onGenerationEnd}
      />
    </motion.div>
  )
}
