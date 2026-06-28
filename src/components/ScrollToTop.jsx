import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const scrollKey = (path) => 'scroll:' + path

export default function ScrollToTop() {
  const { pathname, state } = useLocation()
  const navType = useNavigationType()

  // On a genuine page load (F5 or direct URL), clear the stored scroll position
  // for the current path so POP restoration doesn't incorrectly fire.
  // This `[]` effect only runs on component mount — NOT on SPA re-renders —
  // so it correctly distinguishes a page reload from a SPA back navigation.
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    const navEntry = performance.getEntriesByType('navigation')[0]
    if (navEntry?.type === 'reload' || navEntry?.type === 'navigate') {
      sessionStorage.removeItem(scrollKey(window.location.pathname))
    }
  }, [])

  // Continuously save scroll position so it's always current before navigation.
  useEffect(() => {
    const save = () => sessionStorage.setItem(scrollKey(pathname), String(window.scrollY))
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      save() // flush final position on pathname change (scroll event may not have fired yet)
      window.removeEventListener('scroll', save)
    }
  }, [pathname])

  // Main scroll logic on every navigation
  useEffect(() => {
    // POP (browser Back/Forward or initial load): restore if we have a saved position,
    // otherwise go to top. On initial load the `[]` effect already cleared the entry,
    // so stored will be null → y = 0 → top.
    if (navType === 'POP') {
      const saved = sessionStorage.getItem(scrollKey(pathname))
      const y = saved !== null ? parseInt(saved, 10) : 0
      // setTimeout fires after React has fully committed and painted,
      // preventing rAF cancellation from intermediate re-renders.
      const timer = setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 0)
      return () => clearTimeout(timer)
    }

    // PUSH / REPLACE: scroll to top, unless a section is targeted via state.scrollTo.
    if (state?.scrollTo) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    return () => cancelAnimationFrame(raf)
  }, [pathname, state?.scrollTo, navType])

  return null
}
