<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { Bot, MessageCircle, Send, Trash2, X } from 'lucide-vue-next'
import { assistantSuggestedQuestions } from '../../data/portfolio'
import { askPortfolioAssistant, getGroundedFallback, type ChatTurn } from '../../services/chatService'
import ChatMessage from './ChatMessage.vue'
import SuggestedQuestions from './SuggestedQuestions.vue'

const isOpen = ref(false)
const isLoading = ref(false)
const input = ref('')
const messages = ref<ChatTurn[]>([])
const messagesElement = ref<HTMLElement | null>(null)
let abortController: AbortController | undefined
const conversationStorageKey = 'raque-chat-conversation'

const scrollToBottom = async () => {
  await nextTick()
  if (messagesElement.value) messagesElement.value.scrollTop = messagesElement.value.scrollHeight
}

const clearConversation = () => { messages.value = []; input.value = '' }

watch(messages, (conversation) => {
  localStorage.setItem(conversationStorageKey, JSON.stringify(conversation.slice(-20)))
}, { deep: true })

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(conversationStorageKey) || '[]') as ChatTurn[]
    if (Array.isArray(saved)) {
      messages.value = saved.filter((message) => (
        (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string'
      )).slice(-20)
    }
  } catch {
    localStorage.removeItem(conversationStorageKey)
  }
})

const send = async (suggestion?: string) => {
  const content = (suggestion ?? input.value).trim()
  if (!content || isLoading.value) return
  input.value = ''
  messages.value.push({ role: 'user', content })
  isLoading.value = true
  await scrollToBottom()
  abortController?.abort()
  abortController = new AbortController()
  try {
    const answer = await askPortfolioAssistant(content, messages.value.slice(0, -1), abortController.signal)
    messages.value.push({ role: 'assistant', content: answer })
  } catch (error) {
    if ((error as Error).name !== 'AbortError') messages.value.push({ role: 'assistant', content: getGroundedFallback(content) })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

const close = () => { isOpen.value = false; abortController?.abort() }
</script>

<template>
  <div class="chat-widget">
    <Transition name="chat-panel">
      <section v-if="isOpen" class="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" data-lenis-prevent>
        <header class="chat-header">
          <div><span class="chat-header-icon"><Bot :size="17" /></span><div><h2 id="chat-title">Portfolio assistant</h2><span>Ask me about Raque's work</span></div></div>
          <div class="chat-header-actions"><button type="button" aria-label="Clear conversation" title="Clear conversation" @click="clearConversation"><Trash2 :size="16" /></button><button type="button" aria-label="Close chat" title="Close chat" @click="close"><X :size="18" /></button></div>
        </header>
        <div ref="messagesElement" class="chat-messages" aria-live="polite" data-lenis-prevent>
          <div v-if="messages.length === 0" class="chat-welcome"><span class="chat-welcome-icon"><Bot :size="20" /></span><p>Hi, I'm Raque's portfolio assistant. What would you like to know?</p><SuggestedQuestions :questions="assistantSuggestedQuestions" @select="send" /></div>
          <ChatMessage v-for="(message, index) in messages" :key="`${message.role}-${index}`" :role="message.role" :content="message.content" />
          <div v-if="isLoading" class="chat-typing" aria-label="Assistant is typing"><i></i><i></i><i></i></div>
        </div>
        <form class="chat-input" @submit.prevent="send()"><label class="sr-only" for="portfolio-chat-input">Ask a question</label><input id="portfolio-chat-input" v-model="input" type="text" placeholder="Ask a question..." autocomplete="off" :disabled="isLoading" /><button type="submit" aria-label="Send message" :disabled="isLoading || !input.trim()"><Send :size="16" /></button></form>
      </section>
    </Transition>
    <button class="chat-launcher" type="button" :aria-label="isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'" :aria-expanded="isOpen" @click="isOpen = !isOpen"><X v-if="isOpen" :size="21" /><MessageCircle v-else :size="21" /><span class="chat-launcher-label">Ask me</span></button>
  </div>
</template>