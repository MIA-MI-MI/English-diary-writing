import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/openai/client'
import { createCorrectionPrompt, parseCorrectionResponse } from '@/lib/openai/prompts/correction'

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

    const { diaryId, content } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: '日记内容不能为空' },
        { status: 400 }
      )
    }

    const prompt = createCorrectionPrompt(content)
    const response = await generateCompletion(prompt, 'gpt-4')
    const correction = parseCorrectionResponse(response)

    if (diaryId) {
      const { error } = await supabase
        .from('diaries')
      .update({ correction_result: correction as any })
        .eq('id', diaryId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Update diary error:', error)
      }
    }

    return NextResponse.json({
      correction,
      message: '批改完成',
    })
  } catch (error) {
    console.error('Correct diary error:', error)
    return NextResponse.json(
      { error: '批改失败，请稍后重试' },
      { status: 500 }
    )
  }
}
