'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoShowcase from '@/components/VideoShowcase';

export default function Home() {
  const categories = [
    { name: "Concentrates", img: "/fetured/pexels-mikhail-nilov-9269369.jpg", desc: "Scientific high-energy formulas" },
    { name: "Roughages", img: "/fetured/pexels-nc-farm-bureau-mark-31110992.jpg", desc: "Premium fiber and natural forage" },
    { name: "Supplements", img: "/fetured/pexels-fatma-cakir-69810614-36781379.jpg", desc: "Essential vitamins and health boosters" },
    { name: "Aqua Feed", img: "/fetured/pexels-curtis-wong-782833963-19757403.jpg", desc: "Advanced nutrition for aquatic life" }
  ];

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      
      <VideoShowcase />

      <section style={{ padding: '6rem 2rem', background: '#ffffff' }} className="catalog-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '5rem', textAlign: 'center' }} className="catalog-header">
            <h2 className="catalog-title" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em', color: '#0f172a' }}>Featured Catalog</h2>
            <p className="catalog-subtitle" style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>Premium nutrition solutions for every agricultural sector.</p>
          </div>

          {categories.map((cat) => (
            <div key={cat.name} style={{ marginBottom: '3rem' }}>
              <div className="cat-banner-container" style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '350px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '2.5rem' }}>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '3rem'
                }} className="cat-banner-overlay">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} className="cat-banner-row">
                    <div>
                      <h3 className="cat-banner-title" style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>{cat.name}</h3>
                      <p className="cat-banner-desc" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginTop: '0.5rem' }}>{cat.desc}</p>
                    </div>
                    <a href={`/catalog?category=${cat.name}`} className="btn-primary cat-banner-btn" style={{ 
                      textDecoration: 'none', 
                      padding: '0.75rem 2rem', 
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      background: 'white',
                      color: 'var(--primary)',
                      border: 'none',
                      flexShrink: 0
                    }}>
                      Explore {cat.name} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/catalog" className="btn-primary marketplace-btn" style={{ textDecoration: 'none', padding: '1.5rem 5rem', fontSize: '1.2rem', borderRadius: '20px', fontWeight: 'bold' }}>
              View Full Marketplace
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .catalog-section {
            padding: 4rem 1.25rem !important;
          }
          .catalog-header {
            margin-bottom: 3rem !important;
          }
          .catalog-title {
            font-size: 2.25rem !important;
          }
          .catalog-subtitle {
            font-size: 1rem !important;
          }
          .cat-banner-container {
            height: 320px !important;
          }
          .cat-banner-overlay {
            padding: 1.5rem !important;
          }
          .cat-banner-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
          .cat-banner-title {
            font-size: 1.75rem !important;
          }
          .cat-banner-desc {
            font-size: 0.95rem !important;
          }
          .cat-banner-btn {
            width: 100% !important;
            text-align: center !important;
            padding: 0.85rem !important;
          }
          .marketplace-btn {
            padding: 1.25rem 2.5rem !important;
            font-size: 1rem !important;
            display: inline-block !important;
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}