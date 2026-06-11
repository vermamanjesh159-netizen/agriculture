'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', paddingBottom: '6rem' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: '10rem 2rem 5rem',
        background: 'linear-gradient(180deg, rgba(74, 140, 68, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--primary)',
            background: 'rgba(74, 140, 68, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: '99px',
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}>
            Nurturing Livestock, Empowering Farmers
          </span>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            About <span style={{ color: 'var(--primary)' }}>AgriFeed</span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            lineHeight: '1.8',
            maxWidth: '750px',
            margin: '0 auto 2.5rem'
          }}>
            At AgriFeed, our commitment is to lead the future of animal nutrition. We combine veterinary science, high-quality ingredients, and farmer-focused accessibility to help livestock owners achieve higher productivity, better animal health, and sustainable growth.
          </p>
        </div>
      </section>

      {/* Company Overview & Mission */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 5rem', padding: '0 2rem' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(74, 140, 68, 0.1), rgba(59, 130, 246, 0.1))',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.02)'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Our Mission</h2>
            <p style={{ color: '#475569', lineHeight: '1.75', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Our mission is to provide livestock farmers with the absolute best-in-class, scientifically formulated feed solutions that enhance the health and productivity of their cattle.
            </p>
            <p style={{ color: '#475569', lineHeight: '1.75', fontSize: '1.05rem', margin: 0 }}>
              We strive to make balanced animal nutrition easy to understand and readily accessible, fostering agricultural prosperity through reliable quality and transparent commerce.
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Commitment to Animal Nutrition
            </h2>
            <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
              Proper nutrition is the cornerstone of sustainable animal farming. Livestock that receive a carefully balanced diet are happier, healthier, and substantially more productive.
            </p>
            <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1.5rem' }}>
              AgriFeed partners with leading animal scientists to engineer custom feeds tailored to meet the varying dietary demands of cattle across their life stages.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Quality Assured</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>10k+</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Farmers Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Guide Section */}
      <section style={{ background: '#f8fafc', padding: '5rem 2rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3.5rem', letterSpacing: '-0.02em' }}>
            Educational Guide: Cattle Nutrition
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Card 1: What is Cattle Feed? */}
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(74, 140, 68, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>What is Cattle Feed & Why is it Important?</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                Cattle feed is a mixture of raw materials and supplements formulated specifically for consumption by cows and buffaloes. Unlike grazing alone, quality feed provides structured nourishment containing all essential trace elements. It is critical because natural pastures often lack the full spectrum of energy and protein needed for high-producing dairy or beef cattle.
              </p>
            </div>

            {/* Card 2: Nutritional Requirements */}
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(74, 140, 68, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Nutritional Requirements</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                Cattle require a combination of:
              </p>
              <ul style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0 }}>
                <li><strong>Energy (Carbohydrates & Fats):</strong> For basic metabolism and movement.</li>
                <li><strong>Proteins:</strong> Crucial for growth, tissue repair, and milk synthesis.</li>
                <li><strong>Minerals (Calcium, Phosphorus):</strong> Supporting bone health and milk production.</li>
                <li><strong>Vitamins (A, D, E):</strong> Essential for immunity and fertility.</li>
              </ul>
            </div>

            {/* Card 3: Quality Feed Impact */}
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(74, 140, 68, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>How Quality Feed Improves Productivity</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                Feeding cattle top-grade nutrition yields direct biological improvements:
              </p>
              <ul style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0 }}>
                <li><strong>Enhanced Milk Yield:</strong> Increases volume and fat percentage in milk.</li>
                <li><strong>Accelerated Growth:</strong> Calves reach maturity faster and healthier.</li>
                <li><strong>Better Overall Health:</strong> Reduced veterinary costs and lowered susceptibility to infections.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Balanced Nutrition */}
      <section style={{ maxWidth: '1100px', margin: '5rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '3.5rem', letterSpacing: '-0.02em' }}>
          Benefits of Balanced Nutrition
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { title: "🛡️ Immune Support", desc: "Strengthens resistance against diseases and structural infections." },
            { title: "🐄 Higher Milk Production", desc: "Improves daily milk volume and boosts essential milk fats." },
            { title: "🔄 Improved Fertility", desc: "Supports successful breeding cycles and calving health." },
            { title: "⚙️ Feed Conversion", desc: "Helps animals extract maximal nutrient value from every kilogram of feed." }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Types of Feed Offered Section */}
      <section style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', padding: '5rem 2rem', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Our Product Range & Solutions
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.05rem', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            We provide a diverse portfolio of cattle nutrition solutions, custom-formulated to maximize the output and longevity of your herd.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: "Concentrates",
                desc: "High-energy, high-protein formulations containing grains and oilcakes. Essential for milking dairy cows to maintain milk fat and energy balance.",
                badge: "Popular"
              },
              {
                title: "Roughages",
                desc: "Rich dietary fibers including dry fodder and processed silage. Critical for maintaining healthy rumen function and digestive system activity in ruminants.",
                badge: "Essential"
              },
              {
                title: "Supplements",
                desc: "Formulated mineral mixtures, vitamins, and calcium tonics. Prevents common deficiencies and supports bone density, reproduction, and hoof strength.",
                badge: "Specialized"
              },
              {
                title: "Aqua Feed",
                desc: "Specifically engineered pellets for local freshwater fish and shrimp. High protein content for optimal marine growth and disease resistance.",
                badge: "New Release"
              }
            ].map((prod, idx) => (
              <div key={idx} style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '2.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 20px rgba(0,0,0,0.01)'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  background: 'rgba(74, 140, 68, 0.1)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '99px'
                }}>
                  {prod.badge}
                </span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>{prod.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>{prod.desc}</p>
                <Link href={`/catalog?category=${prod.title}`} className="btn-primary" style={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  fontWeight: 600
                }}>
                  Explore {prod.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '5rem auto 0',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, var(--primary), #1e3a1f)',
        borderRadius: '32px',
        color: '#fff',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(74, 140, 68, 0.25)'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Ready to Enhance Your Herd's Nutrition?
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#d1fae5', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
          Explore our fully certified catalog of premium concentrates, roughages, and supplements designed to optimize livestock yields.
        </p>
        <Link href="/catalog" className="btn-primary" style={{
          background: '#fff',
          color: 'var(--primary)',
          padding: '1rem 2rem',
          borderRadius: '16px',
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
          display: 'inline-block',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          View Full Marketplace
        </Link>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}
