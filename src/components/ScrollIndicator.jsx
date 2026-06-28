import { useState, useEffect } from 'react'

export default function ScrollIndicator({ targetId = null, threshold = 80 }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])

  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        cursor: 'pointer',
        opacity: scrolled ? 0 : 1,
        pointerEvents: scrolled ? 'none' : 'auto',
        transition: 'opacity 0.5s ease',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 26, height: 42,
          border: '2px solid rgba(255,255,255,0.55)',
          borderRadius: 13,
          display: 'flex', justifyContent: 'center',
          paddingTop: 7,
          boxShadow: '0 0 12px rgba(245,130,32,0.25)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(245,130,32,0.8)'
          e.currentTarget.style.boxShadow = '0 0 18px rgba(245,130,32,0.45)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'
          e.currentTarget.style.boxShadow = '0 0 12px rgba(245,130,32,0.25)'
        }}
      >
        <div style={{
          width: 4, height: 9,
          background: '#F58220',
          borderRadius: 2,
          animation: 'scrollDot 1.6s ease-in-out infinite',
        }} />
      </div>
      <span style={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
      }}>Défiler</span>
    </div>
  )
}
