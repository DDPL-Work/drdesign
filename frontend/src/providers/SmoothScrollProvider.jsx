import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScrollProvider
 * - Initialises Lenis smooth scroll globally
 * - Syncs Lenis raf with GSAP ticker so ScrollTrigger stays in lock-step
 * - Exposes nothing to children — just wraps them
 */
const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis
    window.lenis = lenis // Expose to window for ScrollManager

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP ticker for frame-perfect sync
    const tickerCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return children
}

export default SmoothScrollProvider
