<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { projects } from '../data/portfolio'
import { initEditorialPageMotion } from '../composables/editorialPageMotion'

const pageRoot = ref<HTMLElement | null>(null)
let destroyMotion: (() => void) | undefined

onMounted(() => {
  if (pageRoot.value) destroyMotion = initEditorialPageMotion(pageRoot.value)
})

onBeforeUnmount(() => destroyMotion?.())
</script>

<template>
  <div ref="pageRoot" class="editorial-page projects-page">
    <section class="projects-hero">
      <div>
        <p class="eyebrow" data-reveal>The archive · 2023—2026</p>
        <h1 class="display" data-page-title>Selected<br><span class="serif">projects.</span></h1>
      </div>
      <div class="projects-hero-aside" data-reveal>
        <p>A collection of digital products, useful systems, and ideas brought to life with care.</p>
        <span>{{ projects.length }} projects <i></i> Product · Web · Systems</span>
      </div>
    </section>

    <section class="section projects-archive" aria-label="Selected projects">
      <div class="projects-archive-heading" data-reveal><span>Selected work</span><span>01 — 0{{ projects.length }}</span></div>
      <div class="projects-grid">
        <RouterLink v-for="project in projects" :key="project.slug" class="project-tile" :to="`/projects/${project.slug}`" :style="{ '--project-accent': project.accent }" data-reveal>
          <div class="project-tile-visual" :class="{ 'project-tile-visual--empty': !project.images?.[0] }">
            <img v-if="project.images?.[0]" class="project-tile-image" :src="project.images[0].src" :alt="project.images[0].alt" loading="lazy">
            <span v-else class="project-tile-monogram">CG<span>.</span></span>
            <span class="project-tile-number">{{ project.number }} / {{ project.year }}</span>
            <span class="project-tile-arrow" aria-hidden="true"><ArrowUpRight :size="19" /></span>
          </div>
          <div class="project-tile-meta"><span>{{ project.eyebrow }}</span><span>{{ project.role }}</span></div>
          <div class="project-tile-heading"><h2>{{ project.title }}</h2><p>{{ project.description }}</p></div>
          <div class="tags"><span v-for="tag in project.technologies" :key="tag" class="tag">{{ tag }}</span></div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
