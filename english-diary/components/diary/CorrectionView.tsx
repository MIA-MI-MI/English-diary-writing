'use client'

import { CorrectionResult } from '@/types/diary'
import DiaryPaper from '@/components/ui/DiaryPaper'

interface CorrectionViewProps {
  content: string
  correction: CorrectionResult
}

export default function CorrectionView({ content, correction }: CorrectionViewProps) {
  const renderCorrectedContent = () => {
    let result: React.ReactNode[] = []
    let lastIndex = 0

    const sortedCorrections = [...correction.corrections].sort((a, b) => a.position.start - b.position.start)

    sortedCorrections.forEach((correction, index) => {
      if (correction.position.start > lastIndex) {
        result.push(
          <span key={`text-${index}`}>
            {content.slice(lastIndex, correction.position.start)}
          </span>
        )
      }

      result.push(
        <span
          key={`error-${index}`}
          className="border-b-2 border-accent-red cursor-help relative group"
          title={correction.explanation}
        >
          {correction.originalText}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg text-sm text-ink-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <div className="font-bold text-accent-red">❌ {correction.originalText}</div>
            <div className="font-bold text-accent-green">✅ {correction.correctedText}</div>
            <div className="text-xs mt-1">{correction.explanation}</div>
          </span>
        </span>
      )

      lastIndex = correction.position.end
    })

    if (lastIndex < content.length) {
      result.push(<span key="text-end">{content.slice(lastIndex)}</span>)
    }

    return result
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-ink-800 mb-2">批改结果</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-ink-700">得分：</span>
          <span className={`text-2xl font-bold ${correction.score >= 80 ? 'text-accent-green' : correction.score >= 60 ? 'text-ink-700' : 'text-accent-red'}`}>
            {correction.score}
          </span>
          <span className="text-ink-700">/ 100</span>
        </div>
      </div>

      <DiaryPaper>
        <div className="text-ink-900 leading-relaxed">
          {renderCorrectedContent()}
        </div>
      </DiaryPaper>

      <div className="p-4 bg-paper-100 rounded-lg border border-ink-700">
        <h4 className="font-bold text-ink-800 mb-2">老师评语</h4>
        <p className="text-ink-700">{correction.overallComment}</p>
      </div>

      {correction.corrections.length > 0 && (
        <div>
          <h4 className="font-bold text-ink-800 mb-2">修改建议</h4>
          <ul className="space-y-2">
            {correction.corrections.map((correction, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-accent-red">❌ {correction.originalText}</span>
                <span className="text-ink-700">→</span>
                <span className="text-accent-green">✅ {correction.correctedText}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}