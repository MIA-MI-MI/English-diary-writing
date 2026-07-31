export interface CorrectionResponse {
  overallComment: string
  corrections: Array<{
    originalText: string
    correctedText: string
    errorType: 'grammar' | 'vocabulary' | 'style'
    explanation: string
    position: {
      start: number
      end: number
    }
  }>
  score: number
}

export interface ThemeResponse {
  theme: string
  description: string
}

export interface MoodResponse {
  mood: 'joy' | 'anger' | 'sadness' | 'happiness'
  percentage: number
  healingMessage: string
}