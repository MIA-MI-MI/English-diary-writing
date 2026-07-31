'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface ThemeDisplayProps {
  theme: string
  description: string
  onRegenerate: () => void
  loading?: boolean
}

export default function ThemeDisplay({ theme, description, onRegenerate, loading }: ThemeDisplayProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="mb-6 p-4 bg-paper-100 rounded-lg border border-ink-700 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-2 right-2 text-xs text-ink-700 opacity-60">
        今日主题
      </div>
      
      <h3 className="text-xl font-bold text-ink-800 mb-2 handwriting">
        {theme}
      </h3>
      <p className="text-ink-700 mb-3">
        {description}
      </p>

      {isHovered && (
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            loading={loading}
          >
            换一个
          </Button>
        </div>
      )}
    </div>
  )
}