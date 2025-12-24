import { motion } from 'framer-motion'
import { ProceduralGenPanel } from './ProceduralGenPanel'

export function ProceduralGenTab() {
  return (
    <motion.div
      key="procgen"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProceduralGenPanel />
    </motion.div>
  )
}
