import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  withTape?: boolean
}

export default function Card({ children, className = '', withTape = false }: CardProps) {
  return (
    <div className={`bg-paper-50 rounded-lg shadow-paper p-6 ${withTape ? 'tape-effect' : ''} ${className}`}>
      {children}
    </div>
  )
}