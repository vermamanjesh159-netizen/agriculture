'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '4rem', textAlign: 'center', borderRadius: '32px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: '#dcfce7', 
            color: '#166534', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '3rem',
            margin: '0 auto 2rem'
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Confirmed!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Thank you for your purchase. Your order has been received and is being processed. 
            You will receive an email confirmation shortly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Continue Shopping</Link>
            <Link href="/orders" style={{ padding: '0.75rem 2rem', background: 'white', border: '1px solid #ddd', borderRadius: '12px', fontWeight: 600 }}>Track Order</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
