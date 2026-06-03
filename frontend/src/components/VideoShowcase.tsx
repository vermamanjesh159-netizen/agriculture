'use client';

import React from 'react';

const showcases = [
  {
    title: "What We Do",
    desc: "A digital bridge between premium feed science and sustainable farming.",
    img: "/pexels-goszton-33491689.jpg",
  },
  {
    title: "How We Make Products",
    desc: "Strict quality control and nutrient-rich formulas in our modern processing units.",
    img: "/pexels-magda-ehlers-pexels-9775515.jpg",
  },
  {
    title: "Why It's Useful",
    desc: "Optimizing livestock growth and ensuring peak health for better yields.",
    img: "/pexels-nc-farm-bureau-mark-27207630.jpg",
  }
];

export default function VideoShowcase() {
  return (
    <section style={{ padding: '6rem 2rem', background: 'var(--badge-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--foreground)' }}>Our Process & Impact</h2>
          <p style={{ color: 'var(--foreground)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>See how we combine technology and nature to deliver the best agricultural feed.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {showcases.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              background: 'var(--card-bg)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                <img 
                  src={item.img} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="hover-zoom"
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1rem', 
                  left: '1rem', 
                  background: 'rgba(16, 185, 129, 0.95)', 
                  color: 'white', 
                  padding: '0.4rem 1.2rem', 
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Agri Showcase
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{item.title}</h3>
                <p style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hover-zoom:hover {
          transform: scale(1.1);
        }
        .glass-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
}
