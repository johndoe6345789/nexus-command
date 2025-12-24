import { motion } from 'framer-motion'
import { LoadingDemo } from './LoadingDemo'

export function LoadingTab() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <LoadingDemo />
    </motion.div>
  )
}
