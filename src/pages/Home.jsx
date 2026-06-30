import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import {
  MapPin, Star, Phone, Mail, Clock, Shield, HeartHandshake,
  BadgePercent, Headphones, ChevronRight, Send, ArrowRight, Check,
  Globe, Plane, Users, Calendar,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useInView from '../hooks/useInView.js'
import { allDestinations, features, offers, testimonials, partners } from '../data/index.js'
import {
  motion, useScroll, useTransform, useSpring, useMotionValue,
} from 'motion/react'
import {
  ScrollProgress, CursorGlow, Reveal, CountUp, Tilt, Magnetic, LogoMarquee,
} from '../components/motionFx.jsx'

/* ─── scroll-to on forward-navigation (not on POP — ScrollToTop handles that) ─── */
function useScrollToSection() {
  const location = useLocation()
  const navType = useNavigationType()
  useEffect(() => {
    if (navType === 'POP') return // back/forward: ScrollToTop restores saved position
    if (!location.state?.scrollTo) return
    const id = location.state.scrollTo
    const attempt = (n) => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (n > 0) setTimeout(() => attempt(n - 1), 80)
    }
    attempt(5)
  }, [location.key]) // location.key is unique per navigation
}

/* ── Hero (cinematic) ── */
const TITLE_LINE1 = ['Votre', 'prochaine']
const TITLE_LINE3 = ['ici']
const HERO_STATS = [
  { to: 10, suffix: ' ans', label: "d'expérience" },
  { to: 50, suffix: 'k+', label: 'avis 5 étoiles' },
  { to: 99, suffix: '%', label: 'clients satisfaits' },
]

function Hero() {
  const [dest, setDest] = useState('')
  const [date, setDate] = useState('')

  // Parallax: scroll-based + mouse-based
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 160])
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.18])
  const contentY = useTransform(scrollY, [0, 600], [0, 90])
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 18 })
  const smy = useSpring(my, { stiffness: 60, damping: 18 })
  const badgeAX = useTransform(smx, (v) => v * 28)
  const badgeAY = useTransform(smy, (v) => v * 28)
  const badgeBX = useTransform(smx, (v) => v * -22)
  const badgeBY = useTransform(smy, (v) => v * 18)
  const bgShiftX = useTransform(smx, (v) => v * -18)

  function onPointerMove(e) {
    const w = window.innerWidth, h = window.innerHeight
    mx.set((e.clientX - w / 2) / w)
    my.set((e.clientY - h / 2) / h)
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  }
  const word = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  }

  return (
    <section
      id="hero"
      onPointerMove={onPointerMove}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0b0b0d', paddingBottom: 48 }}
    >
      {/* Ken-burns background image with parallax */}
      <motion.div
        style={{
          position: 'absolute', inset: '-8% -4%', y: bgY, scale: bgScale, x: bgShiftX,
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85)',
          backgroundSize: 'cover', backgroundPosition: 'center', willChange: 'transform',
        }}
      />

      {/* Aurora color blobs */}
      <div className="aurora-blob" style={{ top: '-10%', left: '-5%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(245,130,32,0.55), transparent 70%)' }} />
      <div className="aurora-blob" style={{ bottom: '-15%', right: '-8%', width: 620, height: 620, background: 'radial-gradient(circle, rgba(99,102,241,0.40), transparent 70%)', animationDelay: '-6s' }} />
      <div className="aurora-blob" style={{ top: '30%', right: '20%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(236,72,153,0.30), transparent 70%)', animationDelay: '-11s' }} />

      {/* Readability gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(8,8,12,0.82) 0%, rgba(8,8,12,0.45) 55%, rgba(245,130,32,0.10) 100%)' }} />

      {/* Floating glass badges */}
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 16 }}
        style={{ position: 'absolute', top: '18%', right: '8%', x: badgeAX, y: badgeAY, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 18, padding: '12px 20px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3 }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #F58220, #D96E10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Globe size={20} color="white" /></div>
        <div><p style={{ margin: 0, fontWeight: 800, fontSize: 18, color: 'white' }}>50+</p><p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Destinations</p></div>
      </motion.div>
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 16 }}
        style={{ position: 'absolute', bottom: '24%', right: '6%', x: badgeBX, y: badgeBY, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 18, padding: '12px 20px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 3 }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #F58220, #D96E10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={20} color="white" /></div>
        <div><p style={{ margin: 0, fontWeight: 800, fontSize: 18, color: 'white' }}>12k+</p><p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Voyageurs heureux</p></div>
      </motion.div>

      <motion.div style={{ position: 'relative', zIndex: 4, maxWidth: 1200, margin: '0 auto', padding: '0 24px', paddingTop: 80, width: '100%', y: contentY, opacity: contentOpacity }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 720 }}>
          <motion.div variants={word} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,130,32,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(245,130,32,0.5)', borderRadius: 50, padding: '7px 16px', marginBottom: 24 }}>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }} style={{ display: 'inline-flex' }}>
              <Star size={14} color="#F58220" fill="#F58220" />
            </motion.span>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>Agence de voyage #1 en France</span>
          </motion.div>

          <h1 style={{ margin: '0 0 22px', fontSize: 'clamp(42px, 6.4vw, 84px)', fontWeight: 900, lineHeight: 1.04, color: 'white', letterSpacing: '-2.5px' }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              {TITLE_LINE1.map((w) => <motion.span key={w} variants={word} style={{ display: 'inline-block', marginRight: '0.28em' }}>{w}</motion.span>)}
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span variants={word} className="hero-gradient-word" style={{ display: 'inline-block', marginRight: '0.28em' }}>aventure</motion.span>
              <motion.span variants={word} style={{ display: 'inline-block' }}>commence</motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              {TITLE_LINE3.map((w) => <motion.span key={w} variants={word} style={{ display: 'inline-block', marginRight: '0.28em' }}>{w}</motion.span>)}
              <motion.span variants={word} animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>✈️</motion.span>
            </span>
          </h1>

          <motion.p variants={word} style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
            Des voyages inoubliables, des prix imbattables. Laissez-vous inspirer et partez explorer le monde avec 99Travels.
          </motion.p>

          <motion.div variants={word} style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 20, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 8, boxShadow: '0 24px 70px rgba(0,0,0,0.35)', maxWidth: 640, backdropFilter: 'blur(4px)' }}>
            <div style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRight: '1px solid #f0f0f0' }}>
              <MapPin size={18} color="#F58220" />
              <input type="text" placeholder="Où voulez-vous aller ?" value={dest} onChange={e => setDest(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: 14, width: '100%', color: '#333', background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px' }}>
              <Calendar size={18} color="#F58220" />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent' }} />
            </div>
            <Magnetic strength={0.4}>
              <motion.button whileTap={{ scale: 0.94 }} style={{ background: 'linear-gradient(135deg, #F58220, #D96E10)', color: 'white', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: 'inherit', boxShadow: '0 8px 24px rgba(245,130,32,0.5)' }}>
                <Plane size={16} style={{ transform: 'rotate(-45deg)' }} /> Chercher
              </motion.button>
            </Magnetic>
          </motion.div>

          <motion.div variants={word} style={{ display: 'flex', gap: 40, marginTop: 40, flexWrap: 'wrap' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label} style={{ color: 'white' }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 30, color: '#F58220' }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade: blend the hero smoothly into the partners band (#0c0c0e) */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to bottom, transparent 0%, rgba(12,12,14,0.55) 55%, #0c0c0e 100%)', zIndex: 3, pointerEvents: 'none' }} />

      <style>{`
        @media(max-width:768px){ .hero-badge{display:none!important} }
        .hero-gradient-word{
          background:linear-gradient(90deg,#F58220,#ffd089,#F58220,#ff8a3d);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent; color:transparent;
          animation:shimmer 4s linear infinite;
        }
      `}</style>
    </section>
  )
}

/* ── Partners (logos qui défilent) ── */
function PartnersSection() {
  return (
    <section style={{ background: '#0c0c0e', padding: '24px 0 26px' }}>
      <Reveal>
        <p style={{ textAlign: 'center', margin: '0 0 18px', color: 'rgba(255,255,255,0.42)', fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
          Ils nous font confiance
        </p>
      </Reveal>
      <LogoMarquee logos={partners} speed={45} />
    </section>
  )
}

/* ── Destinations section (6 aperçus) ── */
function DestinationsSection() {
  const [ref, visible] = useInView()
  const [hovered, setHovered] = useState(null)
  const preview = allDestinations.slice(0, 6)

  return (
    <section id="destinations" style={{ padding: '100px 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 64, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <span style={{ color: '#F58220', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 3 }}>Explorez le monde</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', margin: '12px 0 16px', letterSpacing: '-1px' }}>
            Destinations <span style={{ color: '#F58220' }}>populaires</span>
          </h2>
          <p style={{ color: '#666', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
            Découvrez nos destinations phares, sélectionnées pour leur beauté, leur culture et leurs expériences uniques.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
          {preview.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
            <Link to={`/destination/${d.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <Tilt max={9} scale={1.04}
              style={{ borderRadius: 24, cursor: 'pointer' }}
            >
            <div
              onMouseEnter={() => setHovered(d.id)} onMouseLeave={() => setHovered(null)}
              style={{ borderRadius: 24, overflow: 'hidden', background: 'white', boxShadow: hovered === d.id ? '0 26px 70px rgba(245,130,32,0.28)' : '0 4px 20px rgba(0,0,0,0.08)', transition: 'box-shadow 0.35s ease' }}>
              <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered === d.id ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                <span style={{ position: 'absolute', top: 16, left: 16, background: '#F58220', color: 'white', padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700, transform: 'translateZ(40px)' }}>{d.tag}</span>
                <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {[...Array(5)].map((_, k) => <Star key={k} size={12} color="#F58220" fill={k < Math.floor(d.rating) ? '#F58220' : 'transparent'} />)}
                  <span style={{ color: 'white', fontSize: 12, marginLeft: 4 }}>{d.rating}</span>
                </div>
              </div>
              <div style={{ padding: '20px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 18, color: '#111' }}>{d.name}</h3>
                  <p style={{ margin: 0, color: '#F58220', fontWeight: 600, fontSize: 15 }}>{d.price}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: hovered === d.id ? 'linear-gradient(135deg, #F58220, #D96E10)' : '#fff3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', transform: 'translateZ(30px)' }}>
                  <ArrowRight size={18} color={hovered === d.id ? 'white' : '#F58220'} />
                </div>
              </div>
            </div>
            </Tilt>
            </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/destinations" style={{ textDecoration: 'none' }}>
            <Magnetic strength={0.3}>
            <button style={{ background: 'transparent', border: '2px solid #F58220', color: '#F58220', borderRadius: 50, padding: '14px 36px', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.3s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F58220'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F58220' }}
            >
              Voir toutes les destinations <ChevronRight size={18} />
            </button>
            </Magnetic>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Why us ── */
const ICONS = [BadgePercent, Headphones, HeartHandshake, Shield]
function FeaturesSection() {
  const [ref, visible] = useInView()
  return (
    <section id="pourquoi-nous" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: '#F58220', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 3 }}>Notre engagement</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', margin: '12px 0 16px', letterSpacing: '-1px' }}>Pourquoi choisir <span style={{ color: '#F58220' }}>99Travels</span> ?</h2>
            <p style={{ color: '#666', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Parce que chaque voyage mérite d'être parfait.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 28 }}>
            {features.map((f, i) => {
              const Icon = ICONS[i]
              return (
                <div key={i} style={{ padding: '36px 28px', borderRadius: 24, background: 'white', border: '1px solid #f0f0f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', transition: 'all 0.35s ease', opacity: visible ? 1 : 0, transitionDelay: `${i * 0.12}s` }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(245,130,32,0.12)'; e.currentTarget.style.borderColor = 'rgba(245,130,32,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, #fff3e8, #ffe0bc)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Icon size={28} color="#F58220" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 19, color: '#111', margin: '0 0 12px' }}>{f.title}</h3>
                  <p style={{ color: '#666', lineHeight: 1.7, margin: 0, fontSize: 15 }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Offers ── */
function OffersSection() {
  const [ref, visible] = useInView()
  return (
    <section id="offres" style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: '#F58220', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 3 }}>Économisez jusqu'à -35%</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'white', margin: '12px 0 16px', letterSpacing: '-1px' }}>Offres & <span style={{ color: '#F58220' }}>Promotions</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Des offres exclusives, valables pour une durée limitée.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
            {offers.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 0.12} y={50} style={{ height: '100%' }}>
              <Link to={`/offre/${o.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Tilt max={8} scale={1.03} style={{ borderRadius: 24, cursor: 'pointer', height: '100%' }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.06)', transition: 'box-shadow 0.35s ease, border-color 0.35s ease', height: '100%', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 26px 70px rgba(245,130,32,0.28)'; e.currentTarget.style.borderColor = 'rgba(245,130,32,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={o.img} alt={o.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <span style={{ position: 'absolute', top: 16, right: 16, background: '#F58220', color: 'white', padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700, transform: 'translateZ(40px)' }}>{o.badge}</span>
                  <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(245,130,32,0.9)', color: 'white', borderRadius: 50, padding: '4px 14px', fontSize: 14, fontWeight: 800, transform: 'translateZ(40px)' }}>{o.save}</div>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: 'white', margin: '0 0 6px' }}>{o.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 20px' }}>{o.sub}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div>
                      <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>{o.oldPrice}</span>
                      <p style={{ margin: 0, color: '#F58220', fontWeight: 800, fontSize: 26, lineHeight: 1.1 }}>{o.price}</p>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>par personne</span>
                    </div>
                    <motion.button type="button" whileTap={{ scale: 0.94 }} style={{ background: 'linear-gradient(135deg, #F58220, #D96E10)', border: 'none', borderRadius: 14, color: 'white', padding: '12px 22px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(245,130,32,0.35)' }}>Réserver</motion.button>
                  </div>
                </div>
              </div>
              </Tilt>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const [ref, visible] = useInView()
  return (
    <section id="témoignages" style={{ padding: '100px 24px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: '#F58220', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 3 }}>Ce qu'ils disent</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', margin: '12px 0 16px', letterSpacing: '-1px' }}>Nos <span style={{ color: '#F58220' }}>voyageurs</span> témoignent</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '32px', borderRadius: 24, background: 'white', border: '1px solid #f0f0f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', transition: 'all 0.35s ease', opacity: visible ? 1 : 0, transitionDelay: `${i * 0.15}s` }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[...Array(t.rating)].map((_, k) => <Star key={k} size={16} color="#F58220" fill="#F58220" />)}
                </div>
                <p style={{ color: '#444', lineHeight: 1.75, fontSize: 15, margin: '0 0 28px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff3e8' }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#111' }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#F58220' }}>{t.dest}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ── */
const EMPTY_FORM = { name: '', email: '', dest: '', msg: '' }
function ContactSection() {
  const [ref, visible] = useInView()
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mwvdbadv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, destination: form.dest, message: form.msg }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm(EMPTY_FORM)
    } catch { setStatus('error') }
  }

  const inputStyle = { width: '100%', padding: '14px 18px', border: '2px solid #f0f0f0', borderRadius: 14, fontSize: 15, outline: 'none', fontFamily: 'inherit', color: '#111', background: 'white', transition: 'border-color 0.2s', boxSizing: 'border-box' }

  return (
    <section id="contact" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: '#F58220', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 3 }}>On prend contact</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', margin: '12px 0 16px', letterSpacing: '-1px' }}>Planifiez votre <span style={{ color: '#F58220' }}>voyage</span></h2>
            <p style={{ color: '#666', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>Une question, un projet de voyage ? Notre équipe vous répond sous 24h.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }} className="contact-grid">
            {/* Info */}
            <div>
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 24px', borderRadius: 18, background: 'linear-gradient(135deg, #fff3e8, #ffe5c8)', marginBottom: 16 }}>
                  <Phone size={22} color="#F58220" />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#111' }}>+33 1 23 45 67 89</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#888' }}>Lun–Sam, 9h–19h</p>
                  </div>
                </div>
              </div>
              {[{ icon: Mail, label: 'Email', value: 'bonjour@99travels.fr' }, { icon: Clock, label: 'Horaires', value: 'Lun–Ven 9h–19h · Sam 10h–17h' }, { icon: MapPin, label: 'Adresse', value: '12 rue de la Paix, 75001 Paris' }].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 24, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={20} color="#F58220" /></div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#111' }}>{value}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: 24, borderRadius: 20, background: 'linear-gradient(135deg, #F58220, #D96E10)', marginTop: 32 }}>
                <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 18, color: 'white' }}>Rappel gratuit</p>
                <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>Nous vous rappelons dans les 2h pour discuter de votre projet.</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="white" /></div>)}
                  <span style={{ color: 'white', fontSize: 13, lineHeight: '28px' }}>Gratuit · Sans engagement · Rapide</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 28, padding: 40, border: '1px solid #f0f0f0', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
              {status === 'success' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 16, padding: '18px 20px', marginBottom: 24 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Check size={16} color="white" /></div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15, color: '#15803d' }}>Message envoyé !</p>
                    <p style={{ margin: 0, fontSize: 14, color: '#166534' }}>Merci, votre message a bien été envoyé. Notre équipe vous répond sous 24h.</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#fff1f2', border: '1.5px solid #fca5a5', borderRadius: 16, padding: '18px 20px', marginBottom: 24 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, color: 'white', fontSize: 16 }}>!</div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15, color: '#b91c1c' }}>Une erreur est survenue</p>
                    <p style={{ margin: 0, fontSize: 14, color: '#991b1b' }}>Impossible d'envoyer le message. Veuillez réessayer.</p>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Prénom & Nom</label>
                  <input required type="text" placeholder="Jean Dupont" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#F58220'} onBlur={e => e.target.style.borderColor = '#f0f0f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Email</label>
                  <input required type="email" placeholder="vous@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#F58220'} onBlur={e => e.target.style.borderColor = '#f0f0f0'} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Destination souhaitée</label>
                <select value={form.dest} onChange={e => setForm({ ...form, dest: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={e => e.target.style.borderColor = '#F58220'} onBlur={e => e.target.style.borderColor = '#f0f0f0'}>
                  <option value="">Choisissez une destination…</option>
                  {allDestinations.map(d => <option key={d.id}>{d.name}</option>)}
                  <option>Autre / Sur mesure</option>
                </select>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Votre message</label>
                <textarea required rows={5} placeholder="Parlez-nous de votre projet de voyage…" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#F58220'} onBlur={e => e.target.style.borderColor = '#f0f0f0'} />
              </div>
              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: 16, borderRadius: 16, border: 'none', background: status === 'loading' ? 'linear-gradient(135deg, #f9a95c, #e8903a)' : 'linear-gradient(135deg, #F58220, #D96E10)', color: 'white', fontWeight: 700, fontSize: 16, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 6px 24px rgba(245,130,32,0.35)', transition: 'all 0.25s', fontFamily: 'inherit', opacity: status === 'loading' ? 0.8 : 1 }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(245,130,32,0.45)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,130,32,0.35)' }}
              >
                {status === 'loading' ? (<><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>Envoi en cours…</>) : (<><Send size={18} />Envoyer ma demande</>)}
              </button>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

/* ── Page ── */
export default function Home() {
  useScrollToSection()
  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <PartnersSection />
      <DestinationsSection />
      <FeaturesSection />
      <OffersSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
