import { ThemeResponse } from '../types'

export function createThemePrompt(date: Date): string {
  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    season: getSeason(date),
    holidays: getHolidays(date),
  }

  return `
Generate a daily English writing theme for ${dateInfo.weekday}, ${dateInfo.month}/${dateInfo.day}/${dateInfo.year}.
Consider: season (${dateInfo.season}), any relevant holidays or events.

Return your response in the following JSON format:
{
  "theme": "A concise theme title",
  "description": "A brief description or writing prompt (1-2 sentences)"
}

Examples:
- "A Memorable Weekend" - "Describe a recent weekend that stands out in your memory. What made it special?"
- "Gratitude Moment" - "Write about something you're grateful for today. Why does it matter to you?"
- "Future Aspirations" - "Describe a goal you hope to achieve in the next year. What steps will you take?"

Provide an engaging and creative theme suitable for English learners.
`
}

function getSeason(date: Date): string {
  const month = date.getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

function getHolidays(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const holidays: Record<string, string> = {
    '1/1': 'New Year',
    '2/14': 'Valentine\'s Day',
    '3/8': 'International Women\'s Day',
    '10/1': 'National Day',
    '12/25': 'Christmas',
  }

  const key = `${month}/${day}`
  return holidays[key] || ''
}

export function parseThemeResponse(response: string): ThemeResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse theme response:', error)
    return {
      theme: 'Daily Reflection',
      description: 'Write about something interesting from your day.',
    }
  }
}