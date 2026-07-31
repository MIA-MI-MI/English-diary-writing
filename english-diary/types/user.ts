export interface UserProfile {
  id: string
  email: string
  nickname: string | null
  avatar_url: string | null
  created_at: string
}

export interface UserStats {
  totalDays: number
  totalWords: number
  totalSentences: number
}

export interface MoodAnalysis {
  mood: 'joy' | 'anger' | 'sadness' | 'happiness'
  percentage: number
  healingMessage: string
}

export interface UpdateProfileRequest {
  nickname?: string
  avatar_url?: string
}