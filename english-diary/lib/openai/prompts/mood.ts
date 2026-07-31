import { MoodResponse } from '../types'

export function createMoodAnalysisPrompt(diariesContent: string): string {
  return `
Analyze the emotional tone of the following diary entries and determine the predominant mood.

Return your response in the following JSON format:
{
  "mood": "joy/anger/sadness/happiness",
  "percentage": 75,
  "healingMessage": "A warm, healing message appropriate for the mood (1-2 sentences)"
}

Mood options:
- joy: excited, cheerful, enthusiastic
- anger: frustrated, annoyed, upset
- sadness: melancholy, disappointed, sorrowful
- happiness: content, peaceful, satisfied

Percentage should reflect how strongly this mood appears (0-100).

The healing message should be encouraging and supportive, like a caring friend.

Diary entries:
"""
${diariesContent}
"""
`
}

export function parseMoodResponse(response: string): MoodResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse mood response:', error)
    return {
      mood: 'happiness',
      percentage: 50,
      healingMessage: 'Keep writing and expressing yourself. Every word is a step forward.',
    }
  }
}