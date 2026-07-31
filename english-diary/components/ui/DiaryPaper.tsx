'use client'

import { ReactNode } from 'react'

interface DiaryPaperProps {
  children: ReactNode
  className?: string
  showLines?: boolean
}

export default function DiaryPaper({ children, className = '', showLines = true }: DiaryPaperProps) {
  return (
    <div className={`diary-paper p-6 rounded-lg ${showLines ? '' : 'bg-transparent'} ${className}`}>
      <div className={`${showLines ? 'handwriting' : ''}`}>
        {children}
      </div>
    </div>
  )
}