import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { countWords, countSentences } from '@/lib/utils/word-count'

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

    const { content, theme } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: '日记内容不能为空' },
        { status: 400 }
      )
    }

    const wordCount = countWords(content)
    const sentenceCount = countSentences(content)

    const { data: diary, error } = await supabase
      .from('diaries')
      .insert({
        user_id: user.id,
        content: content.trim(),
        word_count: wordCount,
        sentence_count: sentenceCount,
        theme: theme || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      diary,
      message: '日记提交成功',
    })
  } catch (error) {
    console.error('Submit diary error:', error)
    return NextResponse.json(
      { error: '提交日记失败，请稍后重试' },
      { status: 500 }
    )
  }
}