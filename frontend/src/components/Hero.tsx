'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" style={{
      height: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: '#f7f7f0', // Soft creamy background as per screenshot
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, #10b981, transparent)',
        opacity: 0.05,
        zIndex: -1
      }}></div>
      
      <h1 className="hero-title animate-fade-in" style={{
        fontSize: '4.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        color: '#2d4a22', // Dark earthy green
        letterSpacing: '-0.02em',
        lineHeight: '1.1'
      }}>
        Premium Feed for Your <span style={{ color: '#8b5e3c' }}>Livestock</span>
      </h1>
      
      <p className="hero-subtitle animate-fade-in" style={{
        fontSize: '1.4rem',
        maxWidth: '700px',
        marginBottom: '2.5rem',
        color: '#4a5568',
        lineHeight: '1.6'
      }}>
        Digitized agricultural marketplace connecting you with nutrient-rich, lab-tested animal feed concentrates, roughages, and minerals.
      </p>

      <div className="hero-buttons animate-fade-in" style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
        <button className="btn-custom-green animate-btn" onClick={() => window.location.href='/catalog?category=Concentrates'}>
          Browse Concentrates
        </button>
        <button className="btn-custom-brown animate-btn" onClick={() => window.location.href='/catalog?category=Roughages'}>
          Explore Roughages
        </button>
      </div>

      {/* New CTA Benefit Lines */}
      <div className="hero-benefits animate-fade-in" style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        padding: '1.5rem 3rem',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '50px',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d4a22', fontWeight: 600 }}>
          <span style={{ color: '#10b981' }}>✓</span> Optimize Your Herd Today
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d4a22', fontWeight: 600 }}>
          <span style={{ color: '#10b981' }}>✓</span> View Full Nutritional Profiles
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d4a22', fontWeight: 600 }}>
          <span style={{ color: '#10b981' }}>✓</span> Calculate Your Bulk Savings
        </div>
      </div>

      <style jsx>{`
        .btn-custom-green {
          background: #2d4a22;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.2s;
          box-shadow: 0 4px 15px rgba(45, 74, 34, 0.3);
        }
        .btn-custom-brown {
          background: #8b5e3c;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.2s;
          box-shadow: 0 4px 15px rgba(139, 94, 60, 0.3);
        }
        .btn-custom-green:hover, .btn-custom-brown:hover {
          transform: translateY(-2px);
        }
        .animate-btn:active {
          transform: translateY(0);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: auto !important;
            min-height: 80vh !important;
            padding: 8rem 1.5rem 4rem !important;
          }
          .hero-title {
            font-size: 2.25rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-subtitle {
            font-size: 1.05rem !important;
            margin-bottom: 2rem !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
            gap: 1rem !important;
            margin-bottom: 2.5rem !important;
          }
          .btn-custom-green, .btn-custom-brown {
            width: 100% !important;
            padding: 0.9rem !important;
          }
          .hero-benefits {
            padding: 1.25rem !important;
            border-radius: 24px !important;
            gap: 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
