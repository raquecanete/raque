import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initEditorialPageMotion = (root: HTMLElement) => {
  const media = gsap.matchMedia()

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      const title = root.querySelector<HTMLElement>('[data-page-title]')
      if (title) {
        gsap.fromTo(title, { autoAlpha: 0, y: 34, clipPath: 'inset(0 0 22% 0)' }, {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.85,
          delay: 0.08,
          ease: 'power3.out',
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 24, filter: 'blur(5px)' }, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    }, root)

    return () => context.revert()
  })

  return () => media.revert()
}