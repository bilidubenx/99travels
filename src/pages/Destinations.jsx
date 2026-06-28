import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, ArrowLeft, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { allDestinations } from '../data/index.js'

const FILTERS = [
  { key: 'tous',     label: 'Tous',      emoji: '🌍' },
  { key: 'plage',    label: 'Plage',     emoji: '🏖️' },
  { key: 'ville',    label: 'Ville',     emoji: '🏙️' },
  { key: 'montagne', label: 'Montagne',  emoji: '⛰️' },
  { key: 'culture',  label: 'Culture',   emoji: '🏛️' },
  { key: 'nature',   label: 'Nature',    emoji: '🌿' },
]

function DestinationCard({ d }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={`/destination/${d.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24, overflow: 'hidden', cursor: 'pointer', background: 'white',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.18)' : '0 4px 20px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
      }}
    >
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <span style={{ position: 'absolute', top: 14, left: 14, background: '#F58220', color: 'white', padding: '5px 13px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{d.tag}</span>
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 3 }}>
          {[...Array(5)].map((_, k) => <Star key={k} size={11} color="#F58220" fill={k < Math.floor(d.rating) ? '#F58220' : 'transparent'} />)}
          <span style={{ color: 'white', fontSize: 12, marginLeft: 4, fontWeight: 600 }}>{d.rating}</span>
        </div>
        {/* Type badges */}
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {d.types.map(t => {
            const f = FILTERS.find(f => f.key === t)
            return f ? (
              <span key={t} style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', color: 'white', padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>
                {f.emoji} {f.label}
              </span>
            ) : null
          })}
        </div>
      </div>
      <div style={{ padding: '18px 22px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 5px', fontWeight: 700, fontSize: 17, color: '#111' }}>{d.name}</h3>
          <p style={{ margin: 0, color: '#F58220', fontWeight: 600, fontSize: 14 }}>{d.price}</p>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: hovered ? 'linear-gradient(135deg, #F58220, #D96E10)' : '#fff3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}>
          <ArrowRight size={17} color={hovered ? 'white' : '#F58220'} />
        </div>
      </div>
    </div>
    </Link>
  )
}

export default function Destinations() {
  const [activeFilter, setActiveFilter] = useState('tous')


  const filtered = activeFilter === 'tous'
    ? allDestinations
    : allDestinations.filter(d => d.types.includes(activeFilter))

  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", minHeight: '100vh', background: '#fafafa' }}>
      <Navbar />

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1c1c1c 100%)', paddingTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 56px' }}>
          {/* Breadcrumb */}
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 14, marginBottom: 28, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F58220'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          >
            <ArrowLeft size={15} /> Retour à l'accueil
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,130,32,0.15)', border: '1px solid rgba(245,130,32,0.4)', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
                <MapPin size={13} color="#F58220" />
                <span style={{ color: '#F58220', fontSize: 13, fontWeight: 600 }}>{allDestinations.length} destinations disponibles</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.05 }}>
                Explorez le <span style={{ color: '#F58220' }}>monde</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, marginTop: 16, marginBottom: 0, maxWidth: 500 }}>
                Des plages paradisiaques aux sommets enneigés, toutes nos destinations vous attendent.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[['15', 'Destinations'], ['50k+', 'Voyageurs'], ['4.8★', 'Note moyenne']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: 26, color: '#F58220' }}>{n}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 72, zIndex: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 8, overflowX: 'auto', paddingTop: 16, paddingBottom: 16 }}>
          {FILTERS.map(f => {
            const active = activeFilter === f.key
            const count = f.key === 'tous' ? allDestinations.length : allDestinations.filter(d => d.types.includes(f.key)).length
            return (
              <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 50, whiteSpace: 'nowrap',
                border: active ? 'none' : '2px solid #f0f0f0',
                background: active ? 'linear-gradient(135deg, #F58220, #D96E10)' : 'white',
                color: active ? 'white' : '#555',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                boxShadow: active ? '0 4px 16px rgba(245,130,32,0.35)' : 'none',
                transition: 'all 0.2s', fontFamily: 'inherit', flexShrink: 0,
              }}>
                <span>{f.emoji}</span>
                {f.label}
                <span style={{ background: active ? 'rgba(255,255,255,0.25)' : '#f5f5f5', color: active ? 'white' : '#888', borderRadius: 50, padding: '1px 8px', fontSize: 12, fontWeight: 700 }}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Result count */}
        <p style={{ color: '#888', fontSize: 15, marginBottom: 32, marginTop: 0 }}>
          <span style={{ fontWeight: 700, color: '#111' }}>{filtered.length}</span> destination{filtered.length > 1 ? 's' : ''} {activeFilter !== 'tous' ? `· ${FILTERS.find(f => f.key === activeFilter)?.label}` : ''}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#999' }}>
            <p style={{ fontSize: 48, margin: '0 0 16px' }}>🗺️</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#555', margin: 0 }}>Aucune destination trouvée</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {filtered.map(d => <DestinationCard key={d.id} d={d} />)}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 64, borderRadius: 28, background: 'linear-gradient(135deg, #F58220, #D96E10)', padding: '48px 40px', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 16px 48px rgba(245,130,32,0.3)' }}>
          <div>
            <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 28, color: 'white', letterSpacing: '-0.5px' }}>
              Vous ne trouvez pas votre bonheur ?
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>
              Nos experts créent un voyage 100% sur mesure selon vos envies.
            </p>
          </div>
          <Link to="/" state={{ scrollTo: 'contact' }} style={{ textDecoration: 'none' }}>
            <button style={{ background: 'white', color: '#F58220', border: 'none', borderRadius: 50, padding: '16px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Nous contacter →
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
