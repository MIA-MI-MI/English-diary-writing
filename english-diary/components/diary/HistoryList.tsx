'use client'

import { formatDateShort } from '@/lib/utils/date-format'
import { DiaryEntry } from '@/types/diary'

interface HistoryListProps {
  diaries: Array<{
    id: string
    theme: string | null
    word_count: number | null
    created_at: string
  }>
  selectedId?: string
  onSelect: (id: string) => void
}

export default function HistoryList({ diaries, selectedId, onSelect }: HistoryListProps) {
  if (diaries.length === 0) {
    return (
      <div className="text-center text-ink-700 py-8">
        <p>还没有历史日记</p>
        <p className="text-sm mt-2">开始写第一篇吧！</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
      {diaries.map((diary) => (
        <button
          key={diary.id}
          onClick={() => onSelect(diary.id)}
          className={`w-full text-left p-3 rounded-lg transition-all ${
            selectedId === diary.id
              ? 'bg-ink-700 text-white'
              : 'bg-paper-100 hover:bg-paper-50 text-ink-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium handwriting">
              {diary.theme || '无主题'}
            </span>
            <span className="text-xs opacity-70">
              {diary.word_count} 词
            </span>
          </div>
          <div className="text-xs mt-1 opacity-70">
            {formatDateShort(diary.created_at)}
          </div>
        </button>
      ))}
    </div>
  )
}