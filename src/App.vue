<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-vue-next'
import ChatWidget from './components/chat/ChatWidget.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const menuOpen = ref(false)
const lightMode = ref(false)
const hasScrolled = ref(false)
const pageRoot = ref<HTMLElement | null>(null)
let revealContext: gsap.Context | undefined
let lenis: Lenis | undefined
const hoverCleanups: (() => void)[] = []

const applyTheme = (isLight: boolean) => {
  lightMode.value = isLight
  document.documentElement.classList.toggle('light', isLight)
  document.documentElement.style.colorScheme = isLight ? 'light' : 'dark'
  localStorage.setItem('raque-theme', isLight ? 'light' : 'dark')
}

const toggleTheme = () => applyTheme(!lightMode.value)

const updateScrollState = () => {
  hasScrolled.value = window.scrollY > 72
  if (!hasScrolled.value) menuOpen.value = false
}

const animatePage = async () => {
  await nextTick()
  revealContext?.revert()
  hoverCleanups.splice(0).forEach((cleanup) => cleanup())
  if (!pageRoot.value) return

  revealContext = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (route.name === 'home') return

    const routeChildren = Array.from(pageRoot.value?.children ?? [])
    if (routeChildren.length) {
      gsap.from(routeChildren, { opacity: 0, y: 22, duration: 0.72, stagger: 0.08, ease: 'power3.out' })
    }

    gsap.utils.toArray<HTMLElement>('.section', pageRoot.value).forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 34,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })
    gsap.utils.toArray<HTMLElement>('.project-card', pageRoot.value).forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: -22,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
      })

      const enter = () => gsap.to(card, { x: 8, duration: 0.25, ease: 'power2.out', overwrite: true })
      const leave = () => gsap.to(card, { x: 0, duration: 0.35, ease: 'power3.out', overwrite: true })
      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      hoverCleanups.push(() => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
      })
    })

    gsap.utils.toArray<HTMLElement>('.hero-portrait, .project-gallery-item img', pageRoot.value).forEach((image) => {
      gsap.from(image, {
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: image, start: 'top 90%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('.text-link, .submit-button', pageRoot.value).forEach((button) => {
      const enter = () => gsap.to(button, { y: -3, duration: 0.22, ease: 'power2.out', overwrite: true })
      const leave = () => gsap.to(button, { y: 0, duration: 0.3, ease: 'power3.out', overwrite: true })
      button.addEventListener('mouseenter', enter)
      button.addEventListener('mouseleave', leave)
      hoverCleanups.push(() => {
        button.removeEventListener('mouseenter', enter)
        button.removeEventListener('mouseleave', leave)
      })
    })

    const hero = pageRoot.value?.querySelector<HTMLElement>('.hero')
    const heroCopy = pageRoot.value?.querySelector<HTMLElement>('.hero-copy')
    if (hero && heroCopy) {
      gsap.to(heroCopy, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
    }

    gsap.utils.toArray<HTMLElement>('.hero-copy .display, .page-intro .display, .project-detail-hero .display', pageRoot.value).forEach((heading) => {
      gsap.from(heading, { opacity: 0, y: 30, duration: 0.9, delay: 0.12, ease: 'power4.out' })
    })
  }, pageRoot.value)
}

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

onMounted(() => {
  applyTheme(localStorage.getItem('raque-theme') === 'light')
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from('.site-header', { opacity: 0, y: -14, duration: 0.7, ease: 'power3.out' })
    gsap.from('.desktop-nav a, .header-actions .icon-button', { opacity: 0, y: -8, duration: 0.45, stagger: 0.06, delay: 0.12, ease: 'power3.out' })
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.085, smoothWheel: true, syncTouch: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis?.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }
  animatePage()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  revealContext?.revert()
  hoverCleanups.splice(0).forEach((cleanup) => cleanup())
  lenis?.destroy()
  lenis = undefined
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header" :class="{ 'site-header--scrolled': hasScrolled }">
      <RouterLink class="wordmark" to="/" aria-label="Raque home">rq<span>.</span></RouterLink>
      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/experience">Experience</RouterLink>
        <RouterLink to="/contact" class="nav-contact">Let's talk <ArrowUpRight :size="15" /></RouterLink>
      </nav>
      <div class="header-actions">
        <button class="icon-button" type="button" :aria-label="lightMode ? 'Use dark theme' : 'Use light theme'" @click="toggleTheme">
          <Sun v-if="lightMode" :size="17" class="theme-icon" />
          <Moon v-else :size="17" class="theme-icon" />
        </button>
        <button class="icon-button mobile-menu-button" type="button" aria-label="Toggle navigation" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
        <button class="icon-button desktop-scroll-menu" type="button" aria-label="Toggle navigation" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </header>

    <Transition name="menu">
      <nav v-if="menuOpen" class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink to="/about">About <ArrowUpRight :size="18" /></RouterLink>
        <RouterLink to="/projects">Projects <ArrowUpRight :size="18" /></RouterLink>
        <RouterLink to="/experience">Experience <ArrowUpRight :size="18" /></RouterLink>
        <RouterLink to="/contact">Let's talk <ArrowUpRight :size="18" /></RouterLink>
      </nav>
    </Transition>

    <main class="page-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in" @after-enter="animatePage">
          <div ref="pageRoot" class="route-page"><component :is="Component" /></div>
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <span>© 2026 Raque Canete</span><span>Built with care &amp; curiosity</span><a href="mailto:raquecanete60@gmail.com">raquecanete60@gmail.com</a>
    </footer>
    <ChatWidget />
  </div>
</template>
