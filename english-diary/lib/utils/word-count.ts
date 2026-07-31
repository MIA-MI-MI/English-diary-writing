export function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  return words.length
}

export function countSentences(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
  return sentences.length
}

export function validateDiaryLength(text: string): { isValid: boolean; message: string } {
  const wordCount = countWords(text)
  const minWords = 300

  if (wordCount < minWords) {
    return {
      isValid: false,
      message: `建议至少写 ${minWords} 词。当前：${wordCount} 词`,
    }
  }

  return {
    isValid: true,
    message: `已达到 ${wordCount} 词`,
  }
}