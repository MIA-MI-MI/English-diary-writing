import Card from '@/components/ui/Card'

interface StatsCardProps {
  totalDays: number
  totalWords: number
  totalSentences: number
}

export default function StatsCard({ totalDays, totalWords, totalSentences }: StatsCardProps) {
  const stats = [
    { label: '完成天数', value: totalDays, icon: '📅' },
    { label: '总字数', value: totalWords, icon: '✍️' },
    { label: '总句子数', value: totalSentences, icon: '📝' },
  ]

  return (
    <Card>
      <h3 className="text-xl font-bold text-ink-800 mb-4 handwriting">
        学习统计
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-paper-100 rounded-lg"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-ink-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-ink-700">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}