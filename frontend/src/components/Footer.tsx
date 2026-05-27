'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      background: '#0f172a', 
      color: 'white', 
      padding: '4rem 2rem 2rem', 
      marginTop: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '3rem' 
      }}>
        {/* Brand Section */}
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            Agri<span style={{ color: 'var(--secondary)' }}>Feed</span>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Empowering farmers with high-quality feed solutions. We bridge the gap between premium manufacturers and agricultural needs.
          </p>
        </div>

        {/* What We Do Section */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>What We Do</h4>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.9rem' }}>
            AgriFeed provides a digitized marketplace for agricultural concentrates, roughages, and supplements. We ensure that every farmer has access to lab-tested, nutrient-rich feed to maximize livestock productivity and health.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link></li>
            <li><Link href="/catalog" style={{ color: '#94a3b8', textDecoration: 'none' }}>Marketplace</Link></li>
            <li><Link href="/orders" style={{ color: '#94a3b8', textDecoration: 'none' }}>Track Orders</Link></li>
            <li><Link href="/profile" style={{ color: '#94a3b8', textDecoration: 'none' }}>My Profile</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <p style={{ margin: 0 }}>📍 123 Agriculture Lane, Rural Tech Park, IN</p>
            <p style={{ margin: 0 }}>📧 support@agrifeed.com</p>
            <p style={{ margin: 0 }}>📞 +91 98765 43210</p>
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '3rem auto 0', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        © {new Date().getFullYear()} AgriFeed Marketplace. All rights reserved. Built for the modern farmer.
      </div>

      <style jsx>{`
        footer a:hover {
          color: var(--primary) !important;
        }
        @media (max-width: 768px) {
          footer {
            padding: 3rem 1.5rem 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
