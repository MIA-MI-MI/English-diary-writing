import { CorrectionResponse } from '../types'

export function createCorrectionPrompt(diaryContent: string): string {
  return `
As an experienced English teacher, please correct the following English diary entry. Identify grammar errors, vocabulary usage issues, and style improvements.

Return your response in the following JSON format:
{
  "overallComment": "A brief overall comment about the writing",
  "corrections": [
    {
      "originalText": "the original text with error",
      "correctedText": "the corrected version",
      "errorType": "grammar/vocabulary/style",
      "explanation": "explanation of the error and correction",
      "position": {
        "start": 0,
        "end": 10
      }
    }
  ],
  "score": 85
}

Score should be between 0-100.

Diary entry:
"""
${diaryContent}
"""

Please provide helpful and encouraging feedback, focusing on the most important corrections.
`
}

export function parseCorrectionResponse(response: string): CorrectionResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse correction response:', error)
    return {
      overallComment: 'Unable to process corrections at this time.',
      corrections: [],
      score: 0,
    }
  }
}