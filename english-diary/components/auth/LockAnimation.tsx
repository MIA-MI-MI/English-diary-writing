'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LockAnimationProps {
  isAnimating: boolean
  onShake: boolean
}

export default function LockAnimation({ isAnimating, onShake }: LockAnimationProps) {
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (onShake) {
      setShake(true)
      const timer = setTimeout(() => setShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [onShake])

  return (
    <div className="relative w-24 h-32 mb-8">
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-20 border-4 border-ink-700 rounded-t-full bg-paper-50" />
        
        <motion.div
          className="w-20 h-12 border-4 border-ink-700 rounded-lg bg-ink-700 relative -mt-2"
          initial={{ y: 0 }}
          animate={isAnimating ? { y: -8, rotateZ: -15 } : { y: 0, rotateZ: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-paper-50" />
        </motion.div>
      </motion.div>
    </div>
  )
}