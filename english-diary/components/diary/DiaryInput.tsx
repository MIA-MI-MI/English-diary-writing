'use client'

import { useState, useEffect } from 'react'
import { TextArea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { countWords, validateDiaryLength } from '@/lib/utils/word-count'

interface DiaryInputProps {
  onSubmit: (content: string) => void
  loading?: boolean
  initialContent?: string
}

export default function DiaryInput({ onSubmit, loading, initialContent = '' }: DiaryInputProps) {
  const [content, setContent] = useState(initialContent)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    setWordCount(countWords(content))
  }, [content])

  const handleSubmit = () => {
    if (content.trim().length > 0) {
      onSubmit(content.trim())
    }
  }

  const validation = validateDiaryLength(content)

  return (
    <div className="space-y-4">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="开始写今天的日记吧..."
        rows={15}
        className="handwriting text-lg"
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className={validation.isValid ? 'text-accent-green' : 'text-ink-700'}>
            {validation.message}
          </span>
          <span className="text-ink-700 ml-2">
            （{wordCount} 词）
          </span>
        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={content.trim().length === 0}
        >
          提交并批改
        </Button>
      </div>
    </div>
  )
}