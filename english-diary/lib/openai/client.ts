import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai

export async function generateCompletion(prompt: string, model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-3.5-turbo') {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful English writing teacher.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content || ''
}