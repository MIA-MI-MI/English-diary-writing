import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/openai/client'
import { createMoodAnalysisPrompt, parseMoodResponse } from '@/lib/openai/prompts/mood'

export async function POST(request: Request) {
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

    const { diaryIds } = await request.json()

    let diariesContent = ''

    if (diaryIds && diaryIds.length > 0) {
      const { data: diaries } = await supabase
        .from('diaries')
        .select('content, created_at')
        .in('id', diaryIds)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      diariesContent = (diaries as any)?.map((d: any) => d.content).join('\n\n---\n\n') || ''
    } else {
      const { data: diaries } = await supabase
        .from('diaries')
        .select('content')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

     diariesContent = (diaries as any)?.map((d: any) => d.content).join('\n\n---\n\n') || ''
    }

    if (!diariesContent) {
      return NextResponse.json({
        mood: 'happiness',
        percentage: 50,
        healingMessage: '还没有写日记呢，开始记录你的第一天吧！',
      })
    }

    const prompt = createMoodAnalysisPrompt(diariesContent)
    const response = await generateCompletion(prompt)
    const moodAnalysis = parseMoodResponse(response)

    return NextResponse.json({
      ...moodAnalysis,
    })
  } catch (error) {
    console.error('Analyze mood error:', error)
    return NextResponse.json(
      { error: '心情分析失败' },
      { status: 500 }
    )
  }
}
