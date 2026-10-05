import { experience, portfolioAssistant, projects, skills } from '../data/portfolio'

export type ChatRole = 'user' | 'assistant'
export type ChatTurn = { role: ChatRole; content: string }

const endpoint = import.meta.env.VITE_CHAT_ENDPOINT || '/api/chat'

const knowledge = () => JSON.stringify({ portfolioAssistant, projects, skills, experience })

const localAnswer = (question: string) => {
  const normalized = question.toLowerCase()
  if (/who|about|bio|yourself/.test(normalized)) return `${portfolioAssistant.name} is an ${portfolioAssistant.role.toLowerCase()} and design engineer. ${portfolioAssistant.biography}`
  if (/technolog|stack|framework|language|tool/.test(normalized)) return `The current stack includes ${portfolioAssistant.programmingLanguages.join(', ')}, ${portfolioAssistant.frameworks.join(', ')}, and tools such as ${portfolioAssistant.tools.join(', ')}.`
  if (/project|work|built|portfolio/.test(normalized)) return projects.map((project) => `${project.title}: ${project.description} Technologies: ${project.technologies.join(', ')}.`).join('\n\n')
  if (/service|offer|help|freelance|hire|collaborat/.test(normalized)) return `${portfolioAssistant.availability} Services include ${portfolioAssistant.services.join(', ')}. You can start a conversation at ${portfolioAssistant.email}.`
  if (/contact|email|reach|message/.test(normalized)) return `The best way to get in touch is ${portfolioAssistant.email}.`
  if (/available|availability/.test(normalized)) return portfolioAssistant.availability
  if (/education|degree|certif|award|achievement|resume|cv|github|linkedin/.test(normalized)) return 'That information is not currently available in the portfolio knowledge.'
  return 'I can help with Raque’s background, skills, projects, services, availability, and contact details. I do not have information about that specific question.'
}

export async function askPortfolioAssistant(message: string, history: ChatTurn[], signal?: AbortSignal) {
  const safeHistory = history
    .filter((turn) => (turn.role === 'user' || turn.role === 'assistant') && turn.content.trim())
    .map((turn) => ({ role: turn.role, content: turn.content.trim().slice(0, 2000) }))
    .slice(-12)
  const safeMessage = message.trim().slice(0, 1000)

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: safeMessage, history: safeHistory, knowledge: knowledge() }),
    signal,
  })

  if (!response.ok) throw new Error(response.status === 429 ? 'rate-limit' : 'request-failed')
  const payload = await response.json() as { answer?: string }
  if (!payload.answer) throw new Error('invalid-response')
  return payload.answer
}

export function getGroundedFallback(message: string) {
  return localAnswer(message)
}