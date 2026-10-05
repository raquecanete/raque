<script setup lang="ts">
import { ArrowDown, ArrowUpRight } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { portfolioAssistant, skills } from '../data/portfolio'
import { initEditorialPageMotion } from '../composables/editorialPageMotion'

const pageRoot = ref<HTMLElement | null>(null)
let destroyMotion: (() => void) | undefined

const skillGroups = [
  { label: 'Languages & frameworks', items: skills.filter((skill) => ['TypeScript', 'Vue.js', 'React', 'Node.js'].includes(skill)) },
  { label: 'Interface craft', items: skills.filter((skill) => ['Design systems', 'Motion & interaction', 'Performance', 'Accessibility'].includes(skill)) },
  { label: 'Tools & foundations', items: skills.filter((skill) => ['Tailwind CSS', 'Laravel', 'HTML5', 'CSS3', 'Bootstrap'].includes(skill)) },
]

onMounted(() => {
  if (pageRoot.value) destroyMotion = initEditorialPageMotion(pageRoot.value)
})

onBeforeUnmount(() => destroyMotion?.())
</script>

<template>
  <div ref="pageRoot" class="editorial-page about-page">
    <section class="about-hero">
      <div class="about-hero-copy">
        <p class="eyebrow" data-reveal>About Raque · Digital craft</p>
        <h1 class="display" data-page-title>Curious by<br><span class="serif">default.</span></h1>
        <p class="about-hero-note" data-reveal>I build thoughtful digital experiences where clear ideas meet careful frontend craft.</p>
      </div>
      <figure class="about-portrait" data-reveal>
        <span class="about-portrait-index">RQ / 2026</span>
        <img src="/profile.jpg" alt="Portrait of Raque Canete" width="520" height="520" fetchpriority="high">
        <figcaption><span>Frontend developer</span><span>Based everywhere · GMT +1</span></figcaption>
      </figure>
      <a class="about-scroll" href="#about-story" aria-label="Scroll to read more about Raque"><ArrowDown :size="15" /> A LITTLE MORE</a>
    </section>

    <section id="about-story" class="section about-story split-section">
      <div data-reveal>
        <p class="eyebrow">A bit more</p>
        <p class="big-copy">I make the internet feel a little more <span class="serif">considered.</span></p>
      </div>
      <div class="about-story-copy" data-reveal>
        <p class="manifesto">I'm an independent frontend developer and design engineer. I turn thoughtful ideas into clear, expressive digital experiences that work beautifully in the details and hold together as a whole.</p>
        <p class="manifesto">My sweet spot is the space between a strong idea and a real product: shaping interfaces that feel distinctive, stay fast, and make the next step feel obvious.</p>
        <RouterLink class="text-link" to="/projects">Explore selected work <ArrowUpRight :size="15" /></RouterLink>
      </div>
    </section>

    <section class="section about-skills">
      <div class="about-skills-heading" data-reveal>
        <div><p class="eyebrow">Tools of the trade</p><h2 class="section-title">Good tools.<br><span class="serif">Better judgment.</span></h2></div>
        <p class="section-note">The stack changes with the problem. Thoughtful decisions are the constant.</p>
      </div>
      <div class="about-skill-groups">
        <div v-for="(group, index) in skillGroups" :key="group.label" class="about-skill-row" data-reveal>
          <span class="about-skill-index">0{{ index + 1 }}</span>
          <h3>{{ group.label }}</h3>
          <div class="skill-cloud"><span v-for="skill in group.items" :key="skill" class="skill">{{ skill }}</span></div>
        </div>
      </div>
      <p class="about-availability" data-reveal><span class="status-dot"></span>{{ portfolioAssistant.availability }}</p>
    </section>
  </div>
</template>
