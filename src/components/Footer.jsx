import { Link } from 'react-router-dom'
import { Plane, Camera, Share2, MessageCircle, Play } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#080808', color: 'rgba(255,255,255,0.65)', padding: '72px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 48, marginBottom: 64 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #F58220, #D96E10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plane size={20} color="white" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, color: 'white' }}><span style={{ color: '#F58220' }}>99</span>Travels</span>
            </Link>
            <p style={{ lineHeight: 1.75, marginBottom: 24, fontSize: 14 }}>
              Votre partenaire de confiance pour des voyages inoubliables depuis 2014.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Camera, Share2, MessageCircle, Play].map((Icon, i) => (
                <button key={i} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s',
                  border: 'none', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F58220'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            { title: 'Destinations', links: [['Europe', '/destinations'], ['Asie', '/destinations'], ['Amériques', '/destinations'], ['Afrique', '/destinations'], ['Océanie', '/destinations']] },
            { title: 'Services',     links: [['Voyages sur mesure', '/'], ['Croisières', '/'], ['Circuits guidés', '/'], ['Lune de miel', '/'], ["Voyages d'affaires", '/']] },
            { title: 'Infos',        links: [['À propos', '/'], ['Blog voyage', '/'], ['Avis clients', '/'], ['Partenaires', '/'], ['Contact', '/']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: 'white', fontWeight: 700, margin: '0 0 20px', fontSize: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#F58220'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          padding: '32px', borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(245,130,32,0.12), rgba(245,130,32,0.05))',
          border: '1px solid rgba(245,130,32,0.2)',
          display: 'flex', flexWrap: 'wrap', gap: 24,
          alignItems: 'center', justifyContent: 'space-between', marginBottom: 48,
        }}>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: 20, margin: '0 0 6px' }}>📧 Newsletter exclusive</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Recevez nos meilleures offres et inspirations voyage directement dans votre boîte.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="email" placeholder="votre@email.com" style={{
              padding: '12px 20px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: 14,
              outline: 'none', minWidth: 240,
            }} />
            <button style={{
              padding: '12px 24px', borderRadius: 50, border: 'none',
              background: 'linear-gradient(135deg, #F58220, #D96E10)',
              color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            }}>S'abonner</button>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: 13 }}>© 2025 99Travels. Tous droits réservés.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Mentions légales', 'CGV', 'Confidentialité', 'Cookies'].map(l => (
              <button key={l} style={{
                color: 'rgba(255,255,255,0.45)', fontSize: 13,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.target.style.color = '#F58220'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
