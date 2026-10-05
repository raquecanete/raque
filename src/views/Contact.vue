<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Check, Send } from 'lucide-vue-next'
const form = ref({ name: '', email: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const submit = async () => {
  errorMessage.value = ''
  if (form.value.name.trim().length < 2) { errorMessage.value = 'Please enter your name.'; status.value = 'error'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())) { errorMessage.value = 'Please enter a valid email address.'; status.value = 'error'; return }
  if (form.value.message.trim().length < 10) { errorMessage.value = 'Please write at least 10 characters about your project.'; status.value = 'error'; return }
  status.value = 'loading'
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form.value) })
    if (!response.ok) {
      const payload = await response.json().catch(() => null) as { error?: string } | null
      throw new Error(payload?.error || 'The message could not be sent.')
    }
    const payload = await response.json() as { success?: boolean; fallback?: boolean; mailto?: string }
    if (payload.fallback && payload.mailto) {
      window.location.href = payload.mailto
      errorMessage.value = 'Your email app is opening with the message ready to send.'
    }
    status.value = 'success'
    form.value = { name: '', email: '', message: '' }
  } catch (error) { errorMessage.value = error instanceof Error ? error.message : 'The message could not be sent.'; status.value = 'error' }
}
</script>
<template>
  <section class="section page-intro"><p class="eyebrow">Contact</p><h1 class="display">Let's make<br><span class="serif">something.</span></h1><p class="hero-intro">Have a project, an idea, or just a good question? My inbox is open.</p></section>
  <section class="section contact-grid"><div><p class="eyebrow">Currently available</p><p class="big-copy">For a select few<br><span class="serif">good things.</span></p><a class="text-link" href="mailto:raquecanete60@gmail.com">raquecanete60@gmail.com <ArrowUpRight :size="16" /></a></div><form class="contact-form" novalidate @submit.prevent="submit"><label>Name<input v-model="form.name" required autocomplete="name" placeholder="Your name" :disabled="status === 'loading'"></label><label>Email<input v-model="form.email" required type="email" autocomplete="email" placeholder="you@example.com" :disabled="status === 'loading'"></label><label>What are we making?<textarea v-model="form.message" required rows="4" placeholder="A few words about the project..." :disabled="status === 'loading'"></textarea></label><button class="submit-button" type="submit" :disabled="status === 'loading'">{{ status === 'loading' ? 'Sending...' : 'Send inquiry' }} <Send :size="16" /></button><p v-if="status === 'success'" class="form-message success"><Check :size="16" /> Thanks. I'll be in touch soon.</p><p v-if="status === 'error'" class="form-message error">{{ errorMessage }}</p></form></section>
</template>
