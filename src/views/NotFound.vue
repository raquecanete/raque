<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>

<template>
	<section class="section page-intro">
		<p class="eyebrow">404 · Page not found</p>
		<h1 class="display">Wrong<br><span class="serif">turn.</span></h1>
		<RouterLink class="text-link" to="/">Take me home <ArrowUpRight :size="16" /></RouterLink>
	</section>
</template>
