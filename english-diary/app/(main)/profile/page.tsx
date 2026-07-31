'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/profile/StatsCard'
import MoodAnalysis from '@/components/profile/MoodAnalysis'
import SettingsForm from '@/components/profile/SettingsForm'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ totalDays: 0, totalWords: 0, totalSentences: 0 })
  const [mood, setMood] = useState({ mood: 'happiness' as const, percentage: 50, healingMessage: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [userRes, statsRes, moodRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/user/stats'),
        fetch('/api/ai/analyze-mood', { method: 'POST' }),
      ])

      if (!userRes.ok) {
        router.push('/login')
        return
      }

      const userData = await userRes.json()
      const statsData = await statsRes.json()
      const moodData = await moodRes.json()

      setUser(userData.user)
      setStats(statsData.stats)
      setMood(moodData)
    } catch (error) {
      console.error('Load profile error:', error)
      router.push('/login')
    }
  }

  const handleSaveNickname = async (nickname: string) => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        alert('保存成功')
      }
    } catch (error) {
      console.error('Save nickname error:', error)
      alert('保存失败')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-ink-800 handwriting">
            个人中心
          </h1>
          <Button variant="ghost" onClick={() => router.push('/')}>
            返回主页
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <StatsCard
              totalDays={stats.totalDays}
              totalWords={stats.totalWords}
              totalSentences={stats.totalSentences}
            />

            <MoodAnalysis
              mood={mood.mood}
              percentage={mood.percentage}
              healingMessage={mood.healingMessage}
            />
          </div>

          <SettingsForm
            nickname={user?.nickname || ''}
            onSave={handleSaveNickname}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  )
}