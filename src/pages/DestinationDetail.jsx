import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ArrowLeft, Clock, Sun, MapPin, Check } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollIndicator from '../components/ScrollIndicator.jsx'
import { ScrollProgress, CursorGlow, Reveal, Magnetic } from '../components/motionFx.jsx'
import { allDestinations, offers } from '../data/index.js'

const HERO_FX = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function DestinationDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dest = [...allDestinations, ...offers].find(d => d.slug === slug)

  // Hero parallax (hooks must run before any early return)
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.22])
  const heroImgY = useTransform(scrollY, [0, 700], [0, 150])
  const heroContentY = useTransform(scrollY, [0, 500], [0, 70])
  const heroFade = useTransform(scrollY, [0, 460], [1, 0])

  if (!dest) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingTop: 72 }}>
          <p style={{ fontSize: 64, margin: 0 }}>🗺️</p>
          <h1 style={{ margin: 0, fontWeight: 800, fontSize: 32, color: '#111' }}>Destination introuvable</h1>
          <Link to="/destinations" style={{ color: '#F58220', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={16} /> Voir toutes les destinations
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const baseName = dest.name.split(',')[0]
  const isOffer = Boolean(dest.oldPrice)
  const backTo = isOffer ? '/' : '/destinations'
  const backState = isOffer ? { scrollTo: 'offres' } : undefined
  const backLabel = isOffer ? 'Toutes les offres' : 'Toutes les destinations'
  const otherLabel = isOffer ? 'Autres offres' : 'Autres destinations'

  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", background: '#fafafa', minHeight: '100vh' }}>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>
        <motion.img
          src={dest.heroImg}
          alt={dest.name}
          style={{ position: 'absolute', inset: '-6% 0', width: '100%', height: '112%', objectFit: 'cover', scale: heroScale, y: heroImgY, willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden" animate="show"
          style={{ position: 'absolute', inset: '0 0 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1200, margin: '0 auto', left: 0, right: 0, padding: '0 24px 72px', y: heroContentY, opacity: heroFade }}
        >
          {/* Breadcrumb */}
          <motion.div variants={HERO_FX}>
          <Link
            to={backTo}
            state={backState}
            style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20, width: 'fit-content', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F58220'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          >
            <ArrowLeft size={14} /> {backLabel}
          </Link>
          </motion.div>

          {/* Badges */}
          <motion.div variants={HERO_FX} style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ background: '#F58220', color: 'white', padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{dest.tag}</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: 50, padding: '5px 14px', border: '1px solid rgba(255,255,255,0.2)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} color="#F58220" fill={i < Math.floor(dest.rating) ? '#F58220' : 'transparent'} />
              ))}
              <span style={{ color: 'white', fontSize: 13, marginLeft: 4, fontWeight: 600 }}>{dest.rating}/5</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={HERO_FX} style={{ margin: '0 0 12px', fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.05 }}>
            {dest.name}
          </motion.h1>

          {/* Price & duration */}
          <motion.div variants={HERO_FX} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
            {dest.oldPrice && (
              <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 18 }}>{dest.oldPrice}</span>
            )}
            <span style={{ color: '#F58220', fontWeight: 800, fontSize: 24 }}>{dest.price}</span>
            {dest.save && (
              <span style={{ background: '#F58220', color: 'white', borderRadius: 50, padding: '3px 12px', fontSize: 13, fontWeight: 800 }}>{dest.save}</span>
            )}
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15 }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>{dest.duration}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={HERO_FX} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Magnetic strength={0.4}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
              style={{ background: 'linear-gradient(135deg, #F58220, #D96E10)', color: 'white', border: 'none', borderRadius: 50, padding: '14px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(245,130,32,0.4)' }}
            >
              Réserver ce voyage
            </motion.button>
            </Magnetic>
            <Link to={backTo} state={backState} style={{ textDecoration: 'none' }}>
              <button style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '14px 32px', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              >
                ← {otherLabel}
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <ScrollIndicator targetId="detail-content" />
      </div>

      {/* ── Content ── */}
      <div id="detail-content" style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Quick stats */}
        <Reveal style={{ marginTop: -100, marginBottom: 60, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, background: 'white', borderRadius: 24, padding: '28px 32px', boxShadow: '0 18px 50px rgba(0,0,0,0.12)', border: '1px solid #f0f0f0' }}>
          {[
            { icon: Clock, label: 'Durée', value: dest.duration },
            { icon: Sun, label: 'Meilleure période', value: dest.bestTime },
            { icon: MapPin, label: 'Pays', value: dest.country },
            { icon: Star, label: 'Note voyageurs', value: `${dest.rating} / 5 ★` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color="#F58220" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 14, color: '#111', fontWeight: 700 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
        </Reveal>

        {/* About + Includes sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, marginBottom: 60, alignItems: 'start' }} className="detail-about-grid">
          <Reveal>
            <span style={{ color: '#F58220', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>À propos</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', margin: '10px 0 28px', letterSpacing: '-1px', lineHeight: 1.15 }}>
              Découvrez <span style={{ color: '#F58220' }}>{baseName}</span>
            </h2>
            {dest.about.map((p, i) => (
              <p key={i} style={{ color: '#555', lineHeight: 1.85, fontSize: 16, margin: '0 0 20px' }}>{p}</p>
            ))}
          </Reveal>

          {/* Includes card */}
          <Reveal delay={0.12}>
          <div style={{ background: 'linear-gradient(135deg, #0d0d0d, #1c1c1c)', borderRadius: 24, padding: 32, position: 'sticky', top: 96 }}>
            <h3 style={{ margin: '0 0 22px', fontWeight: 700, fontSize: 17, color: 'white' }}>Ce qui est inclus</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {dest.includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #F58220, #D96E10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Check size={12} color="white" strokeWidth={3} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <Magnetic strength={0.3} style={{ display: 'block', marginTop: 28 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
              style={{ width: '100%', background: 'linear-gradient(135deg, #F58220, #D96E10)', color: 'white', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(245,130,32,0.4)' }}
            >
              Demander un devis →
            </motion.button>
            </Magnetic>
          </div>
          </Reveal>
        </div>

        {/* Itinerary */}
        <div style={{ marginBottom: 60 }}>
          <Reveal>
          <span style={{ color: '#F58220', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>Planning</span>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', margin: '10px 0 40px', letterSpacing: '-1px' }}>
            Votre itinéraire <span style={{ color: '#F58220' }}>jour par jour</span>
          </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dest.itinerary.map((day, i) => (
              <DayCard key={i} day={day} index={i} total={dest.itinerary.length} />
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: 60 }}>
          <Reveal>
          <span style={{ color: '#F58220', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>Galerie</span>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#111', margin: '10px 0 28px', letterSpacing: '-1px' }}>
            Photos de la <span style={{ color: '#F58220' }}>destination</span>
          </h2>
          </Reveal>
          <Reveal y={50}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: '240px 240px', gap: 12 }} className="gallery-grid">
            {/* Image 0 : grande à gauche sur 2 rangées */}
            <div className="gallery-cell" style={{ borderRadius: 18, overflow: 'hidden', gridRow: '1 / 3', background: '#e0e0e0' }}>
              <img src={dest.gallery[0]} alt={`${dest.name} 1`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* Images 1 & 2 : petites à droite */}
            {dest.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="gallery-cell" style={{ borderRadius: 18, overflow: 'hidden', background: '#e0e0e0' }}>
                <img src={img} alt={`${dest.name} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          </Reveal>
        </div>

        {/* CTA Banner */}
        <Reveal y={50}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #F58220, #D96E10)', borderRadius: 28, padding: '48px 40px', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 16px 48px rgba(245,130,32,0.3)' }}>
          <div className="aurora-blob" style={{ top: '-40%', right: '-5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 28, color: 'white', letterSpacing: '-0.5px' }}>
              Prêt pour {baseName} ?
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.88)', fontSize: 16 }}>
              Nos experts créent un voyage 100% sur mesure selon vos envies et votre budget.
            </p>
          </div>
          <Magnetic strength={0.4} style={{ position: 'relative' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
            style={{ background: 'white', color: '#F58220', border: 'none', borderRadius: 50, padding: '16px 36px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}
          >
            Demander un devis gratuit →
          </motion.button>
          </Magnetic>
        </div>
        </Reveal>
      </div>

      <Footer />

      <style>{`
        .gallery-cell img { transition: transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98); }
        .gallery-cell:hover img { transform: scale(1.08); }
        @media(max-width: 900px) {
          .detail-about-grid { grid-template-columns: 1fr !important; }
          .detail-about-grid [style*="sticky"] { position: static !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: 180px 180px !important; }
          .gallery-grid > div:first-child { grid-row: auto !important; }
        }
        @media(max-width: 540px) {
          .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: unset !important; }
          .gallery-grid > div { height: 200px; }
        }
      `}</style>
    </div>
  )
}

function DayCard({ day, index, total }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ display: 'flex', gap: 20 }}>
      {/* Timeline column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 52, flexShrink: 0 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: hovered ? 'linear-gradient(135deg, #F58220, #D96E10)' : 'linear-gradient(135deg, #fff3e8, #ffe0bc)', border: hovered ? 'none' : '2px solid #F58220', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hovered ? 'white' : '#F58220', fontWeight: 800, fontSize: 13, flexShrink: 0, zIndex: 1, transition: 'all 0.3s' }}>
          J{day.day}
        </div>
        {index < total - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 28, background: 'linear-gradient(to bottom, rgba(245,130,32,0.4), rgba(245,130,32,0.08))', margin: '4px 0' }} />
        )}
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ flex: 1, background: 'white', borderRadius: 20, padding: '22px 26px', marginBottom: 16, boxShadow: hovered ? '0 8px 32px rgba(245,130,32,0.12)' : '0 2px 12px rgba(0,0,0,0.05)', border: hovered ? '1px solid rgba(245,130,32,0.25)' : '1px solid #f0f0f0', transition: 'all 0.3s ease', transform: hovered ? 'translateX(4px)' : 'none' }}
      >
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, fontSize: 17, color: '#111' }}>
          <span style={{ color: '#F58220', marginRight: 8, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Jour {day.day}</span>
          {day.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {day.activities.map((a, j) => (
            <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F58220', flexShrink: 0, marginTop: 8 }} />
              <span style={{ color: '#555', fontSize: 14.5, lineHeight: 1.6 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
