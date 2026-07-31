import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/openai/client'
import { createThemePrompt, parseThemeResponse } from '@/lib/openai/prompts/theme'

export async function POST() {
  try {
    const today = new Date()
    const prompt = createThemePrompt(today)
    const response = await generateCompletion(prompt)
    const theme = parseThemeResponse(response)

    return NextResponse.json({
      theme,
      message: '主题已重新生成',
    })
  } catch (error) {
    console.error('Regenerate theme error:', error)
    return NextResponse.json(
      { error: '重新生成主题失败' },
      { status: 500 }
    )
  }
}