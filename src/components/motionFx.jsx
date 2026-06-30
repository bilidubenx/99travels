import { useRef, useState, useEffect } from 'react'
import {
  motion, useScroll, useSpring, useTransform,
  useMotionValue, useInView, animate, useReducedMotion,
} from 'motion/react'

/* ───────────────────────── Scroll progress bar (top) ───────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200,
        transformOrigin: '0%', scaleX,
        background: 'linear-gradient(90deg, #F58220, #ffb347, #D96E10)',
        boxShadow: '0 0 12px rgba(245,130,32,0.7)',
      }}
    />
  )
}

/* ───────────────────────── Cursor glow (desktop only) ───────────────────────── */
export function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (reduce) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => { x.set(e.clientX - 250); y.set(e.clientY - 250) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y, reduce])

  if (reduce) return null
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, width: 500, height: 500, x: sx, y: sy,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 5,
        background: 'radial-gradient(circle, rgba(245,130,32,0.13) 0%, rgba(245,130,32,0) 60%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

/* ───────────────────────── Reveal on scroll ───────────────────────── */
export function Reveal({ children, y = 36, delay = 0, once = true, style, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────── Animated count-up ───────────────────────── */
export function CountUp({ to, duration = 1.8, suffix = '', prefix = '', className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(to); return }
    const controls = animate(0, to, {
      duration, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  const display = Number.isInteger(to) ? Math.round(val) : val.toFixed(1)
  return <span ref={ref} className={className} style={style}>{prefix}{display}{suffix}</span>
}

/* ───────────────────────── 3D tilt wrapper ───────────────────────── */
export function Tilt({ children, max = 10, scale = 1.03, style, className }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 250, damping: 20 })
  const sry = useSpring(ry, { stiffness: 250, damping: 20 })

  function onMove(e) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  function reset() { rx.set(0); ry.set(0) }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={reduce ? undefined : { scale }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', transformPerspective: 1000, ...style }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────── Magnetic button ───────────────────────── */
export function Magnetic({ children, strength = 0.35, style, className }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  function onMove(e) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      className={className} style={{ x: sx, y: sy, display: 'inline-block', ...style }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────── Infinite marquee (text) ───────────────────────── */
export function Marquee({ items, speed = 28 }) {
  const row = [...items, ...items]
  return (
    <div className="fx-marquee" aria-hidden>
      <div className="fx-marquee__track" style={{ animationDuration: `${speed}s` }}>
        {row.map((it, i) => (
          <span key={i} className="fx-marquee__item">
            <span className="fx-marquee__dot" />{it}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Infinite logo marquee ───────────────────────── */
export function LogoMarquee({ logos, speed = 40, color = null }) {
  const row = [...logos, ...logos]
  return (
    <div className="fx-logos">
      <div className="fx-logos__track" style={{ animationDuration: `${speed}s` }}>
        {row.map((l, i) => (
          <span key={i} className="fx-logos__item" title={l.name}>
            <img
              src={`https://cdn.simpleicons.org/${l.slug}${l.light ? '/f5f5f5' : color ? '/' + color : ''}`}
              alt={l.name}
              loading="eager"
              draggable={false}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
