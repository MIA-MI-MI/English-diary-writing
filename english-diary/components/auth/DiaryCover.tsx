'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DiaryCoverProps {
  children: ReactNode
  isOpen: boolean
}

export default function DiaryCover({ children, isOpen }: DiaryCoverProps) {
  return (
    <div className="relative">
      <motion.div
        className="bg-paper-100 rounded-lg shadow-paper-lg p-8 relative overflow-hidden"
        initial={{ rotateY: 0 }}
        animate={isOpen ? { rotateY: -180 } : { rotateY: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-paper-50 to-paper-100 opacity-50" />
        <div className="absolute top-4 right-4 w-12 h-12 text-ink-700 opacity-30">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  )
}