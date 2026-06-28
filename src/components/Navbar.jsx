import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Plane, Menu, X } from 'lucide-react'
import { navLinks } from '../data/index.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNavClick = (label) => {
    const sectionId = label.toLowerCase().replace(/\s/g, '-')
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
    setOpen(false)
  }

  const forcedWhite = !isHome
  const bg = forcedWhite || scrolled

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: bg ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: bg ? 'blur(12px)' : 'none',
      boxShadow: bg ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      borderBottom: bg ? '1px solid rgba(245,130,32,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/partner_99travels.png"
            alt="99Travels"
            style={{
              height: 48, width: 'auto', objectFit: 'contain',
              filter: bg ? 'none' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
          {navLinks.map(l => (
            <li key={l}>
              <button onClick={() => handleNavClick(l)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 500, fontSize: 15,
                color: bg ? '#333' : 'rgba(255,255,255,0.9)',
                padding: '4px 0', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.target.style.color = '#F58220'}
                onMouseLeave={e => e.target.style.color = bg ? '#333' : 'rgba(255,255,255,0.9)'}
              >{l}</button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button onClick={() => handleNavClick('Contact')} className="nav-desktop" style={{
          background: 'linear-gradient(135deg, #F58220, #D96E10)',
          color: 'white', border: 'none', borderRadius: 50,
          padding: '10px 24px', fontWeight: 600, fontSize: 14,
          cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,130,32,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
        }}
          onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; e.target.style.boxShadow = '0 6px 20px rgba(245,130,32,0.5)' }}
          onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 14px rgba(245,130,32,0.4)' }}
        >Réserver maintenant</button>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: bg ? '#111' : 'white',
        }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'white', padding: '16px 24px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map(l => (
            <button key={l} onClick={() => handleNavClick(l)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontWeight: 500, fontSize: 16, color: '#333', textAlign: 'left',
              padding: '12px 0', borderBottom: '1px solid #f5f5f5', fontFamily: 'inherit',
            }}>{l}</button>
          ))}
          <button onClick={() => handleNavClick('Contact')} style={{
            marginTop: 12, background: 'linear-gradient(135deg, #F58220, #D96E10)',
            color: 'white', border: 'none', borderRadius: 50,
            padding: '14px', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
          }}>Réserver maintenant</button>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none  !important; }
        @media(max-width:768px){
          .nav-desktop { display: none  !important; }
          .nav-mobile  { display: flex  !important; }
        }
      `}</style>
    </nav>
  )
}
