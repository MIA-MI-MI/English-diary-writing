import { NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/openai/client'
import { createThemePrompt, parseThemeResponse } from '@/lib/openai/prompts/theme'

export async function GET() {
  try {
    const today = new Date()
    const prompt = createThemePrompt(today)
    const response = await generateCompletion(prompt)
    const theme = parseThemeResponse(response)

    return NextResponse.json({
      theme,
    })
  } catch (error) {
    console.error('Generate theme error:', error)
    return NextResponse.json(
      { error: '生成主题失败' },
      { status: 500 }
    )
  }
}