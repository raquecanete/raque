<script setup lang="ts">
defineProps<{ questions: string[] }>()
defineEmits<{ select: [question: string] }>()
</script>

<template>
  <div class="chat-suggestions" aria-label="Suggested questions">
    <button v-for="question in questions" :key="question" type="button" @click="$emit('select', question)">{{ question }}</button>
  </div>
</template>