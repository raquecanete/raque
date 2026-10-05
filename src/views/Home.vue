<script setup lang="ts">
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { experience, projects, skills } from '../data/portfolio'
import { initHomeExperience } from '../composables/homeExperience'

const homeRoot = ref<HTMLElement | null>(null)
let destroyExperience: (() => void) | undefined

onMounted(() => {
  if (homeRoot.value) destroyExperience = initHomeExperience(homeRoot.value)
})

onBeforeUnmount(() => destroyExperience?.())
</script>

<template>
  <div ref="homeRoot" class="home-experience">
    <section class="home-frame frame-hero" data-frame="01">
      <div class="frame-ambience ambience-hero" aria-hidden="true"></div>
      <div class="hero-topline"><span>Independent frontend developer</span><span>Portfolio / 2026</span></div>
      <div class="hero-stage">
        <div class="hero-copy">
          <p class="eyebrow hero-mark"><span class="status-dot"></span> Raque Canete · Digital craft</p>
          <h1 class="display hero-title">Digital work<br>with <span class="serif">substance.</span></h1>
          <p class="hero-intro">I build fast, expressive digital experiences for thoughtful teams.</p>
          <div class="hero-actions"><RouterLink class="frame-button" to="/projects">Explore selected work <ArrowUpRight :size="16" /></RouterLink><RouterLink class="hero-secondary" to="/about">A little about me <ArrowRight :size="15" /></RouterLink></div>
        </div>
        <div class="hero-art" data-parallax aria-label="Portrait of Raque">
          <div class="hero-orbit hero-orbit-one"></div><div class="hero-orbit hero-orbit-two"></div>
          <span class="hero-art-index">01 / CREATIVE ENGINEERING</span>
          <img class="hero-portrait" src="/profile.jpg" alt="Raque, frontend developer" width="520" height="520" decoding="async" fetchpriority="high">
          <span class="hero-art-caption">Curiosity, made tangible.</span>
        </div>
      </div>
      <div class="hero-bottomline"><span class="scroll-cue"><span class="scroll-cue-icon"><ArrowDown :size="14" /></span> Scroll to explore</span><span>Based everywhere / GMT +1</span><span>01 — 07</span></div>
      <div class="hero-next-hint" aria-hidden="true">Ideas, in motion <span>↓</span></div>
    </section>

    <section class="home-frame frame-intro" data-frame="02">
      <div class="frame-ambience ambience-intro" aria-hidden="true"></div>
      <div class="frame-heading-row"><span class="frame-index">02 / THE POINT OF VIEW</span><span class="frame-side-note">A portfolio is a record<br>of how ideas become useful.</span></div>
      <div class="intro-stage">
        <p class="eyebrow">A little about me</p>
        <h2 class="intro-title">What if digital<br>could feel <span class="serif intro-word">effortless?</span></h2>
        <div class="intro-bottom">
          <p class="intro-copy">I'm Raque, a frontend developer and design engineer who turns thoughtful ideas into fast, expressive digital experiences.</p>
          <div class="intro-aside"><span class="aside-mark">RQ<span>.</span></span><p>Care in the details.<br>Clarity in the experience.</p><RouterLink class="text-link" to="/about">More about Raque <ArrowUpRight :size="15" /></RouterLink></div>
        </div>
      </div>
      <div class="frame-bottomline"><span>Thoughtful by design</span><span>02 — 07</span></div>
    </section>

    <section class="home-frame frame-sulya" data-frame="03">
      <div class="frame-ambience ambience-sulya" aria-hidden="true"></div>
      <div class="frame-heading-row"><span class="frame-index">03 / A STUDENT-FIRST TOOL</span><span class="frame-side-note">Featured project / 2026</span></div>
      <div class="sulya-stage">
        <div class="sulya-visual" data-tilt>
          <div class="sulya-visual-header"><span class="window-dots"><i></i><i></i><i></i></span><span>CASE STUDY_03</span><span>↗</span></div>
          <div class="sulya-image-wrap"><img src="/sulyaimg3.png" alt="SULYA student schedule product experience" loading="lazy" width="1893" height="872"></div>
          <div class="sulya-visual-footer"><span>STUDY LOAD → DAILY RHYTHM</span><span>SCROLL / 03</span></div>
        </div>
        <div class="sulya-copy">
          <p class="eyebrow">Selected project · SULYA</p>
          <h2 class="sulya-title">Make room<br>for <span class="serif">your focus.</span></h2>
          <p class="sulya-description">A modern student-focused web app designed to simplify study-load management, class schedules, and timely academic reminders.</p>
          <div class="sulya-tags"><span>Product experience</span><span>Vue.js</span><span>UI systems</span></div>
          <RouterLink class="frame-link" to="/projects/sulya">Explore the SULYA project <ArrowUpRight :size="16" /></RouterLink>
        </div>
      </div>
      <div class="frame-bottomline"><span>One thoughtful detail at a time</span><span>03 — 07</span></div>
    </section>

    <section class="home-frame frame-work" data-frame="04">
      <div class="frame-ambience ambience-work" aria-hidden="true"></div>
      <div class="frame-heading-row"><span class="frame-index">04 / SELECTED WORK</span><span class="frame-side-note">A few things I've made.</span></div>
      <div class="work-heading"><div><p class="eyebrow">Built with intent</p><h2 class="work-title">Different problems.<br><span class="serif">Thoughtful answers.</span></h2></div><RouterLink class="text-link" to="/projects">View all projects <ArrowUpRight :size="15" /></RouterLink></div>
      <div class="work-grid">
        <RouterLink v-for="project in projects" :key="project.slug" class="work-card" :to="`/projects/${project.slug}`">
          <div class="work-card-image" :class="{ 'work-card-image--empty': !project.images?.[0] }">
            <img v-if="project.images?.[0]" :src="project.images[0].src" :alt="project.images[0].alt" loading="lazy">
            <span v-else class="work-card-monogram">CG<span>.</span></span>
            <span class="work-card-number">{{ project.number }} / {{ project.year }}</span><span class="work-card-arrow"><ArrowUpRight :size="17" /></span>
          </div>
          <div class="work-card-meta"><div><span class="work-card-kind">{{ project.eyebrow }}</span><h3>{{ project.title }}</h3></div><p>{{ project.description }}</p></div>
        </RouterLink>
      </div>
      <div class="frame-bottomline"><span>Product / systems / stories</span><span>04 — 07</span></div>
    </section>

    <section class="home-frame frame-wallpaper" data-frame="05">
      <div class="frame-ambience ambience-wallpaper" aria-hidden="true"></div>
      <div class="frame-heading-row"><span class="frame-index">05 / FROM IDEA TO EXPERIENCE</span><span class="frame-side-note">The quiet details make<br>the useful things memorable.</span></div>
      <div class="wallpaper-stage">
        <div class="wallpaper-copy"><p class="eyebrow">The approach</p><h2 class="wallpaper-title">Useful first.<br><span class="serif">Unforgettable, too.</span></h2><p class="wallpaper-description">I care about the quiet details: the 200ms that makes an interaction feel instant, the line of copy that makes a new feature feel obvious, the system that lets a good idea grow without getting heavy.</p><div class="wallpaper-quote"><span class="quote-line"></span><span>Make it useful. Make it last.</span></div></div>
        <div class="wallpaper-art" data-tilt>
          <img class="wallpaper-image" src="/iPhone-14-PRO-raquecanete.github.io.png" alt="Raque Canete portfolio displayed on an iPhone" loading="lazy" width="760" height="1550">
        </div>
      </div>
      <div class="frame-bottomline"><span>Design is how it works, and how it feels.</span><span>05 — 07</span></div>
    </section>

    <section class="home-frame frame-practice" data-frame="06">
      <div class="frame-ambience ambience-practice" aria-hidden="true"></div>
      <div class="frame-heading-row"><span class="frame-index">06 / THE PRACTICE</span><span class="frame-side-note">A clear process,<br>from first thought to finish.</span></div>
      <div class="practice-heading"><p class="eyebrow">From first thought to final detail</p><h2 class="practice-title">A good idea,<br><span class="serif">well carried.</span></h2></div>
      <div class="practice-window">
        <ol class="practice-grid" aria-label="Four steps in my process">
          <li class="practice-card"><span class="practice-number">01</span><span class="practice-symbol">↗</span><p class="eyebrow">Discover</p><h3>Start with<br>the <span class="serif">why.</span></h3><p>Find the human need inside the brief. Make the complex feel clear.</p><span class="practice-tags">PRODUCT THINKING · RESEARCH</span></li>
          <li class="practice-card"><span class="practice-number">02</span><span class="practice-symbol">⌘</span><p class="eyebrow">Design</p><h3>Shape the<br><span class="serif">feeling.</span></h3><p>Build a visual language that makes every interaction feel considered.</p><span class="practice-tags">UI SYSTEMS · INTERACTION</span></li>
          <li class="practice-card"><span class="practice-number">03</span><span class="practice-symbol">⌁</span><p class="eyebrow">Build</p><h3>Make it<br><span class="serif">real.</span></h3><p>Bring ideas to life with fast, accessible, resilient frontend systems.</p><span class="practice-tags">VUE · TYPESCRIPT · GSAP</span></li>
          <li class="practice-card"><span class="practice-number">04</span><span class="practice-symbol">✳</span><p class="eyebrow">Refine</p><h3>Care about<br>the <span class="serif">last 2%.</span></h3><p>Polish the details until the whole experience feels inevitable.</p><span class="practice-tags">MOTION · PERFORMANCE</span></li>
        </ol>
      </div>
      <div class="practice-foot"><span>Four steps, one thoughtful process</span><span>From first question to final polish</span></div>
      <div class="experience-strip"><span class="experience-strip-label">A little history</span><div v-for="item in experience.slice(0, 2)" :key="item.company" class="experience-strip-item"><span>{{ item.date }}</span><strong>{{ item.role }}</strong><span>{{ item.company }}</span></div><RouterLink class="experience-strip-link" to="/experience">Full experience <ArrowUpRight :size="14" /></RouterLink></div>
      <div class="skill-strip"><span v-for="skill in skills" :key="skill">{{ skill }}</span></div>
      <div class="frame-bottomline"><span>Make it useful. Make it last.</span><span>06 — 07</span></div>
    </section>

    <section class="home-frame frame-final" data-frame="07">
      <div class="frame-ambience ambience-final" aria-hidden="true"></div>
      <div class="final-kicker"><span class="status-dot"></span> Available for a select few good projects</div>
      <div class="final-stage"><p class="eyebrow">Have a good idea?</p><h2 class="final-title">Let's make<br><span class="serif">it matter.</span></h2><p class="final-copy">Thoughtful products start with a good conversation. Tell me what you're imagining.</p><RouterLink class="final-button" to="/contact">Start a conversation <ArrowUpRight :size="18" /></RouterLink></div>
      <div class="final-signoff"><span class="final-wordmark">rq<span>.</span></span><span>Raque Canete<br>Independent frontend developer</span><span>Thanks for staying<br>curious.</span></div>
      <div class="frame-bottomline"><span>© 2026 Raque Canete</span><span>07 — 07</span></div>
    </section>
  </div>
</template>