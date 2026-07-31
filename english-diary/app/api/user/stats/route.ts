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

    const { data: diaries, error } = await supabase
      .from('diaries')
      .select('word_count, sentence_count, created_at')
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    const totalDays = diaries?.length || 0
    const totalWords = diaries?.reduce((sum, d) => sum + (d.word_count || 0), 0) || 0
    const totalSentences = diaries?.reduce((sum, d) => sum + (d.sentence_count || 0), 0) || 0

    return NextResponse.json({
      stats: {
        totalDays,
        totalWords,
        totalSentences,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}