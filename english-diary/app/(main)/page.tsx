'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DiaryInput from '@/components/diary/DiaryInput'
import ThemeDisplay from '@/components/diary/ThemeDisplay'
import CorrectionView from '@/components/diary/CorrectionView'
import HistoryList from '@/components/diary/HistoryList'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/date-format'

export default function MainPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [theme, setTheme] = useState({ theme: '', description: '' })
  const [todayDiary, setTodayDiary] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [selectedDiaryId, setSelectedDiaryId] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [themeLoading, setThemeLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [userRes, themeRes, historyRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/theme/today'),
        fetch('/api/diary/history?limit=30'),
      ])

      if (!userRes.ok) {
        router.push('/login')
        return
      }

      const userData = await userRes.json()
      const themeData = await themeRes.json()
      const historyData = await historyRes.json()

      setUser(userData.user)
      setTheme(themeData.theme)
      setHistory(historyData.diaries || [])
    } catch (error) {
      console.error('Load data error:', error)
      router.push('/login')
    }
  }

  const handleSubmitDiary = async (content: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, theme: theme.theme }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || '提交失败')
        return
      }

      const correctRes = await fetch('/api/ai/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diaryId: data.diary.id, content }),
      })

      const correctData = await correctRes.json()

      if (correctRes.ok) {
        setTodayDiary({
          ...data.diary,
          correction_result: correctData.correction,
        })
        loadData()
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerateTheme = async () => {
    setThemeLoading(true)
    try {
      const res = await fetch('/api/theme/regenerate', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setTheme(data.theme)
      }
    } catch (error) {
      console.error('Regenerate theme error:', error)
    } finally {
      setThemeLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-2/3 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-ink-800 handwriting mb-1">
                {formatDate(new Date().toISOString())}
              </h1>
              <p className="text-ink-700">
                欢迎，{user?.nickname || '同学'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/profile')}>
                个人中心
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                退出
              </Button>
            </div>
          </div>

          {!todayDiary && (
            <>
              <ThemeDisplay
                theme={theme.theme}
                description={theme.description}
                onRegenerate={handleRegenerateTheme}
                loading={themeLoading}
              />

              <DiaryInput
                onSubmit={handleSubmitDiary}
                loading={loading}
              />
            </>
          )}

          {todayDiary && todayDiary.correction_result && (
            <CorrectionView
              content={todayDiary.content}
              correction={todayDiary.correction_result}
            />
          )}
        </div>
      </div>

      <div className="w-1/3 bg-paper-100 p-6 border-l border-ink-700">
        <h2 className="text-xl font-bold text-ink-800 mb-4 handwriting">
          历史日记
        </h2>
        <HistoryList
          diaries={history}
          selectedId={selectedDiaryId}
          onSelect={(id) => setSelectedDiaryId(id)}
        />
      </div>
    </div>
  )
}