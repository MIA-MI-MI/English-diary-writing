'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import LockAnimation from '@/components/auth/LockAnimation'
import DiaryCover from '@/components/auth/DiaryCover'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin 
        ? { email, password } 
        : { email, password, nickname }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setShake(true)
        setTimeout(() => setShake(false), 500)
        setError(data.error || '操作失败')
        return
      }

      setIsAnimating(true)
      
      setTimeout(() => {
        router.push('/')
      }, 1300)
    } catch (err) {
      setError('网络错误，请稍后重试')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <DiaryCover isOpen={isAnimating}>
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <LockAnimation isAnimating={isAnimating} onShake={shake} />
            <h1 className="text-3xl font-bold text-ink-800 mb-2">
              英语日记
            </h1>
            <p className="text-ink-700">
              {isLogin ? '欢迎回来，开始写作吧' : '开始你的英语写作之旅'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="昵称（可选）"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            )}
            
            <Input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-accent-red text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {isLogin ? '登录' : '注册'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-ink-700 hover:text-ink-800 transition-colors"
            >
              {isLogin ? '没有账号？去注册' : '已有账号？去登录'}
            </button>
          </div>
        </div>
      </DiaryCover>
    </div>
  )
}