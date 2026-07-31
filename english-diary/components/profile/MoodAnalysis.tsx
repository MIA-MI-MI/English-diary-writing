'use client'

import Card from '@/components/ui/Card'

interface MoodAnalysisProps {
  mood: 'joy' | 'anger' | 'sadness' | 'happiness'
  percentage: number
  healingMessage: string
}

export default function MoodAnalysis({ mood, percentage, healingMessage }: MoodAnalysisProps) {
  const moodInfo = {
    joy: { emoji: '😊', label: '喜悦', color: 'text-yellow-600' },
    anger: { emoji: '😠', label: '愤怒', color: 'text-red-600' },
    sadness: { emoji: '😢', label: '悲伤', color: 'text-blue-600' },
    happiness: { emoji: '😄', label: '快乐', color: 'text-green-600' },
  }

  const currentMood = moodInfo[mood]

  return (
    <Card>
      <h3 className="text-xl font-bold text-ink-800 mb-4 handwriting">
        心情分析
      </h3>
      <div className="flex items-center justify-center mb-4">
        <div className="text-center">
          <div className="text-6xl mb-2">{currentMood.emoji}</div>
          <div className={`text-2xl font-bold ${currentMood.color}`}>
            {currentMood.label}
          </div>
          <div className="text-ink-700 mt-1">
            {percentage}% 强度
          </div>
        </div>
      </div>
      <div className="p-4 bg-paper-100 rounded-lg text-center">
        <p className="text-ink-700 italic">
          "{healingMessage}"
        </p>
      </div>
    </Card>
  )
}