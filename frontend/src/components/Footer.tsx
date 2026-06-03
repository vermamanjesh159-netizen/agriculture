'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, #0a110b 0%, #050805 100%)', 
      color: '#cbd5e1', 
      padding: '5rem 2rem 2.5rem', 
      marginTop: 'auto',
      borderTop: '1px solid rgba(74, 140, 68, 0.15)',
      fontFamily: 'var(--font-sans, inherit)'
    }}>
      <div className="footer-grid" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '4rem' 
      }}>
        {/* Brand & Description Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>
                Agri<span style={{ color: 'var(--primary-light)' }}>Feed</span>
              </span>
            </Link>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
            Empowering the agricultural ecosystem with premium nutrition solutions. We deliver scientifically formulated feeds and supplements directly to modern farmers.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
              <a 
                key={social} 
                href={`#${social}`} 
                className="social-icon-link"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <span style={{ textTransform: 'capitalize', fontSize: '0.75rem', fontWeight: 600 }}>{social[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What We Do</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <li><Link href="/catalog?category=Concentrates" className="footer-link-item">Concentrates Feed</Link></li>
            <li><Link href="/catalog?category=Roughages" className="footer-link-item">Premium Roughages</Link></li>
            <li><Link href="/catalog?category=Supplements" className="footer-link-item">Health Supplements</Link></li>
            <li><Link href="/catalog?category=Aqua Feed" className="footer-link-item">Aqua Feed Nutrition</Link></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <li><Link href="/" className="footer-link-item">Home Platform</Link></li>
            <li><Link href="/catalog" className="footer-link-item">Marketplace Catalog</Link></li>
            <li><Link href="/orders" className="footer-link-item">Track My Orders</Link></li>
            <li><Link href="/profile" className="footer-link-item">Account Settings</Link></li>
          </ul>
        </div>

        {/* Stay Tuned Newsletter Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.25rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay Updated</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            Subscribe to our newsletter to receive expert agricultural feeding guides and catalog updates.
          </p>
          <form onSubmit={handleSubscribe} style={{ position: 'relative', display: 'flex', marginTop: '0.25rem' }}>
            <input 
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.9rem 3.5rem 0.9rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: 'white',
                outline: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              className="footer-input"
            />
            <button 
              type="submit"
              style={{
                position: 'absolute',
                right: '0.3rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--primary)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              className="footer-submit-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
          {subscribed && (
            <div style={{ color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 600, animation: 'fadeIn 0.3s' }}>
              ✓ Thank you for subscribing!
            </div>
          )}
        </div>
      </div>

      {/* Copyright Divider Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '4rem auto 0', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        <div>
          © {new Date().getFullYear()} AgriFeed Marketplace. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-bottom-link">Privacy Policy</a>
          <a href="#terms" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-bottom-link">Terms of Service</a>
        </div>
      </div>

      <style jsx global>{`
        .footer-link-item {
          color: #94a3b8; 
          text-decoration: none; 
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }
        
        .footer-link-item:hover {
          color: var(--primary-light) !important;
          transform: translateX(4px);
        }

        .social-icon-link:hover {
          color: white !important;
          background: var(--primary) !important;
          border-color: var(--primary-light) !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(74, 140, 68, 0.2);
        }

        .footer-input:focus {
          border-color: var(--primary-light) !important;
          background: rgba(255,255,255,0.07) !important;
          box-shadow: 0 0 0 3px rgba(74, 140, 68, 0.15);
        }

        .footer-submit-btn:hover {
          background: var(--primary-light) !important;
          transform: translateY(-50%) scale(1.05) !important;
        }

        .footer-bottom-link:hover {
          color: #f1f5f9 !important;
        }

        @media (max-width: 768px) {
          footer {
            padding: 4rem 1.5rem 2rem !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
