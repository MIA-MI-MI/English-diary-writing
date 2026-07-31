'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ForwardRefRenderFunction } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, className = '', ...props },
  ref
) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-800 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2 bg-paper-50 border border-ink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-shadow ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
}

const TextAreaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  { label, error, className = '', ...props },
  ref
) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-800 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 bg-paper-50 border border-ink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-shadow resize-none ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
export const TextArea = forwardRef(TextAreaComponent)