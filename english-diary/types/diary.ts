export interface Correction {
  originalText: string
  correctedText: string
  errorType: 'grammar' | 'vocabulary' | 'style'
  explanation: string
  position: {
    start: number
    end: number
  }
}

export interface CorrectionResult {
  overallComment: string
  corrections: Correction[]
  score: number
}

export interface DiaryEntry {
  id: string
  user_id: string
  content: string
  word_count: number | null
  sentence_count: number | null
  theme: string | null
  correction_result: CorrectionResult | null
  mood: string | null
  created_at: string
}

export interface DiaryFormData {
  content: string
  theme?: string
}