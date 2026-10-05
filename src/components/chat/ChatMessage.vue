<script setup lang="ts">
import { Bot, User } from 'lucide-vue-next'
defineProps<{ role: 'user' | 'assistant'; content: string }>()
</script>

<template>
  <article class="chat-message" :class="`chat-message--${role}`">
    <span class="chat-avatar" :aria-hidden="true"><User v-if="role === 'user'" :size="14" /><Bot v-else :size="14" /></span>
    <p>{{ content }}</p>
  </article>
</template>