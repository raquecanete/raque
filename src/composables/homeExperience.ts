import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type HomeMotion = {
  root: HTMLElement
  mobile: boolean
}

const getFrameFlowHeight = (frame: HTMLElement) => {
  const style = window.getComputedStyle(frame)
  return frame.offsetHeight + (Number.parseFloat(style.marginTop) || 0) + (Number.parseFloat(style.marginBottom) || 0)
}

const getFrameFlowTop = (root: HTMLElement, frame: HTMLElement) => {
  const frames = gsap.utils.toArray<HTMLElement>('.home-frame', root)
  const frameIndex = frames.indexOf(frame)
  const rootTop = root.getBoundingClientRect().top + window.scrollY
  return rootTop + frames.slice(0, frameIndex).reduce((height, previous) => height + getFrameFlowHeight(previous), 0)
}

const frameTimeline = ({ root, mobile }: HomeMotion, selector: string) => {
  const frame = root.querySelector<HTMLElement>(selector)
  if (!frame) return null
  const frameTop = () => getFrameFlowTop(root, frame)
  const isHero = selector === '.frame-hero'
  const isPractice = selector === '.frame-practice'

  return gsap.timeline({
    scrollTrigger: {
      trigger: frame,
      start: mobile ? 'top 78%' : isHero || isPractice ? () => frameTop() - 72 : () => frameTop() - window.innerHeight,
      end: mobile ? 'bottom 28%' : () => frameTop() - 72 + (isHero || isPractice ? frame.offsetHeight : 0),
      scrub: mobile ? 0.6 : 1,
      invalidateOnRefresh: true,
    },
  })
}

export const initHeroAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-hero')
  if (!timeline) return
  timeline
    .to('.hero-copy', { y: -45, scale: 0.94, opacity: 0.2, duration: 0.4, ease: 'power1.in' }, 0.66)
    .to('.hero-art', { y: -65, scale: 1.12, opacity: 0.28, duration: 0.4, ease: 'power1.in' }, 0.66)
    .to('.ambience-hero', { yPercent: -18, scale: 1.2, opacity: 0.25, duration: 0.5 }, 0.6)

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('.hero-mark', { opacity: 0, scale: 0.9, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.55 }, 0)
    .fromTo('.hero-title', { opacity: 0, y: 48, scale: 0.96, clipPath: 'inset(0 0 35% 0)' }, { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.85 }, 0.12)
    .fromTo('.hero-intro', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 0.42)
    .fromTo('.hero-actions', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
    .fromTo('.hero-art', { opacity: 0, scale: 0.82, rotation: 5 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.95 }, 0.08)
    .fromTo('.hero-orbit-one', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 0.7, duration: 0.85 }, 0.25)
    .fromTo('.hero-orbit-two', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 0.4, duration: 0.85 }, 0.34)
    .fromTo('.hero-bottomline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.68)
}

export const initIntroAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-intro')
  if (!timeline) return
  timeline
    .fromTo('.frame-intro .eyebrow', { opacity: 0, x: -35 }, { opacity: 1, x: 0, duration: 0.45 }, 0)
    .fromTo('.intro-title', { opacity: 0, x: 100, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, 0.12)
    .fromTo('.intro-copy', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6)
    .fromTo('.intro-aside', { opacity: 0, x: 40, rotation: 2 }, { opacity: 1, x: 0, rotation: 0, duration: 0.65 }, 0.74)
    .to('.ambience-intro', { xPercent: 14, yPercent: -12, scale: 1.15, duration: 1 }, 0)
}

export const initUploadAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-sulya')
  if (!timeline) return
  timeline
    .fromTo('.sulya-visual', { opacity: 0, x: -65, y: 35, rotationY: 8, scale: 0.92 }, { opacity: 1, x: 0, y: 0, rotationY: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0)
    .fromTo('.sulya-image-wrap img', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 0.05)
    .fromTo('.sulya-copy > *', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, 0.32)
    .to('.ambience-sulya', { xPercent: -12, yPercent: 18, scale: 1.18, duration: 1 }, 0)
}

export const initDashboardAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-work')
  if (!timeline) return
  timeline
    .fromTo('.work-heading > *', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0)
    .fromTo('.work-card', { opacity: 0, y: 55, rotationX: 5, scale: 0.94 }, { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: 'power2.out' }, 0.22)
    .fromTo('.work-card-image img', { scale: 1.12 }, { scale: 1, duration: 0.9, stagger: 0.12 }, 0.25)
    .to('.ambience-work', { xPercent: 9, yPercent: -16, scale: 1.2, duration: 1 }, 0)
}

export const initWallpaperAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-wallpaper')
  if (!timeline) return
  timeline
    .fromTo('.wallpaper-copy > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, 0)
    .fromTo('.wallpaper-image', { opacity: 0, y: 70, scale: 0.88, rotation: 4 }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1, ease: 'power3.out' }, 0.18)
    .to('.wallpaper-image', { scale: 1.04, yPercent: -1, duration: 1 }, 1.15)
    .to('.ambience-wallpaper', { xPercent: -12, yPercent: 14, scale: 1.15, duration: 1 }, 0)
}

export const initFeatureAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-practice')
  if (!timeline) return
  if (motion.mobile) {
    timeline
      .fromTo('.practice-heading', { y: 25 }, { y: 0, duration: 0.4 }, 0)
      .fromTo('.practice-card', { y: 25 }, { y: 0, duration: 0.5, stagger: 0.14 }, 0.2)
  } else {
    timeline
      .fromTo('.practice-heading', { y: 30 }, { y: 0, duration: 0.45 }, 0)
      .fromTo('.practice-card', { y: 28 }, { y: 0, duration: 0.45, stagger: 0.1, ease: 'power2.out' }, 0.15)
  }
  timeline.to('.ambience-practice', { xPercent: 10, yPercent: -14, scale: 1.18, duration: 1 }, 0)
}

export const initFinalCTAAnimation = (motion: HomeMotion) => {
  const timeline = frameTimeline(motion, '.frame-final')
  if (!timeline) return
  timeline
    .fromTo('.final-kicker', { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
    .fromTo('.final-stage > *', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' }, 0.15)
    .fromTo('.final-signoff', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, 0.68)
    .to('.ambience-final', { scale: 1.12, rotation: -8, opacity: 0.85, duration: 1 }, 0)
}

export const initMouseInteractions = (root: HTMLElement) => {
  const cleanups: (() => void)[] = []
  root.querySelectorAll<HTMLElement>('[data-parallax], [data-tilt]').forEach((element) => {
    const moveX = gsap.quickTo(element, 'x', { duration: 0.45, ease: 'power3.out' })
    const moveY = gsap.quickTo(element, 'y', { duration: 0.45, ease: 'power3.out' })
    const rotateX = gsap.quickTo(element, 'rotationX', { duration: 0.45, ease: 'power3.out' })
    const rotateY = gsap.quickTo(element, 'rotationY', { duration: 0.45, ease: 'power3.out' })
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = element.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      moveX(x * 10)
      moveY(y * 8)
      rotateX(-y * 3)
      rotateY(x * 4)
    }
    const onLeave = () => {
      moveX(0)
      moveY(0)
      rotateX(0)
      rotateY(0)
    }
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(element)
    })
  })
  return () => cleanups.forEach((cleanup) => cleanup())
}

export const initPageTransitions = (root: HTMLElement, mobile: boolean) => {
  const cleanups: (() => void)[] = []
  root.querySelectorAll<HTMLElement>('.home-frame:not(.frame-hero):not(.frame-final)').forEach((frame, index) => {
    const ambience = frame.querySelector<HTMLElement>('.frame-ambience')
    if (!ambience) return
    const tween = gsap.fromTo(ambience, { opacity: 0.08, xPercent: index % 2 ? 8 : -8 }, {
      opacity: 0.5,
      xPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: mobile ? 'top bottom' : 'top 85%', end: mobile ? 'bottom top' : 'top 15%', scrub: 1 },
    })
    cleanups.push(() => tween.scrollTrigger?.kill())
  })
  return () => cleanups.forEach((cleanup) => cleanup())
}

export const initFrameSnap = (root: HTMLElement) => {
  const frames = gsap.utils.toArray<HTMLElement>('.home-frame', root)
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 0,
    end: () => ScrollTrigger.maxScroll(window),
    snap: {
      snapTo: (_progress, self) => {
        if (!self) return 0
        const maxScroll = ScrollTrigger.maxScroll(window)
        const rootTop = root.getBoundingClientRect().top + window.scrollY
        let frameTop = rootTop
        const stops: number[] = []
        frames.forEach((frame) => {
          const stop = gsap.utils.clamp(0, maxScroll, frameTop - 72)
          stops.push(stop)
          frameTop += getFrameFlowHeight(frame)
        })
        stops.push(maxScroll)

        const current = self.scroll()
        const target = self.direction >= 0
          ? stops.find((stop) => stop > current + 1) ?? maxScroll
          : [...stops].reverse().find((stop) => stop < current - 1) ?? 0
        const range = self.end - self.start

        return range > 0 ? gsap.utils.clamp(0, 1, (target - self.start) / range) : 0
      },
      delay: 0.08,
      duration: { min: 0.25, max: 0.65 },
      ease: 'power2.inOut',
      inertia: false,
    },
  })

  return () => trigger.kill()
}

export const initHomeExperience = (root: HTMLElement) => {
  const breakpoint = window.matchMedia('(max-width: 700px)')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let context: gsap.Context | undefined
  let destroyInteractions: (() => void) | undefined
  let destroyTransitions: (() => void) | undefined
  let destroyFrameSnap: (() => void) | undefined

  const teardown = () => {
    destroyInteractions?.()
    destroyTransitions?.()
    destroyFrameSnap?.()
    destroyInteractions = undefined
    destroyTransitions = undefined
    destroyFrameSnap = undefined
    context?.revert()
    context = undefined
  }

  const build = () => {
    teardown()
    if (reducedMotion.matches) return

    const mobile = breakpoint.matches
    context = gsap.context(() => {
    const motion = { root, mobile }
    initHeroAnimation(motion)
    initIntroAnimation(motion)
    initUploadAnimation(motion)
    initDashboardAnimation(motion)
    initWallpaperAnimation(motion)
    initFeatureAnimation(motion)
    initFinalCTAAnimation(motion)
    destroyTransitions = initPageTransitions(root, mobile)
    if (!mobile) {
      destroyInteractions = initMouseInteractions(root)
      destroyFrameSnap = initFrameSnap(root)
    }
    gsap.delayedCall(0.35, () => ScrollTrigger.refresh())
    }, root)
  }

  build()
  breakpoint.addEventListener('change', build)
  reducedMotion.addEventListener('change', build)

  return () => {
    breakpoint.removeEventListener('change', build)
    reducedMotion.removeEventListener('change', build)
    teardown()
  }
}