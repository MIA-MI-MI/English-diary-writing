'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface SettingsFormProps {
  nickname: string | null
  onSave: (nickname: string) => void
  onLogout: () => void
}

export default function SettingsForm({ nickname, onSave, onLogout }: SettingsFormProps) {
  const [editNickname, setEditNickname] = useState(nickname || '')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave(editNickname)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-ink-800 mb-4 handwriting">
        个人设置
      </h3>
      <div className="space-y-4">
        <Input
          label="昵称"
          value={editNickname}
          onChange={(e) => setEditNickname(e.target.value)}
          placeholder="输入昵称"
        />

        <Button onClick={handleSave} loading={loading} className="w-full">
          保存
        </Button>

        <hr className="border-ink-700 my-4" />

        <Button
          variant="secondary"
          onClick={onLogout}
          className="w-full"
        >
          退出登录
        </Button>
      </div>
    </Card>
  )
}