import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString()

    const { data: diary, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', todayStr)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      diary: diary || null,
    })
  } catch (error) {
    console.error('Get today diary error:', error)
    return NextResponse.json(
      { error: '获取今日日记失败' },
      { status: 500 }
    )
  }
}