'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filter === 'All') {
      setProducts(initialProducts);
    } else {
      // In a real app, we might fetch from the API with a category query
      // For now, we'll filter locally or fetch based on filter change
      const fetchFiltered = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
          const res = await fetch(`${apiUrl}/products?category=${filter}`);
          if (res.ok) {
            const data = await res.json();
            setProducts(data);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchFiltered();
    }
  }, [filter, initialProducts]);

  const formatPrice = (p: number) => `₹${p.toLocaleString()}`;

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
      {/* Custom Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--primary)',
          color: 'white',
          padding: '1rem 2.5rem',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'slideUp 0.3s ease-out',
          fontWeight: 600
        }}>
          {notification}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{filter} Products</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['All', 'Concentrates', 'Roughages', 'Supplements', 'Aqua Feed'].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--primary)',
                background: filter === f ? 'var(--primary)' : 'transparent',
                color: filter === f ? 'white' : 'var(--primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {products.map((product: any) => (
          <div key={product.id} className="glass-card product-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '200px', background: '#ddd', position: 'relative' }}>
              <img 
                src={product.image_url ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${product.image_url}` : `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800&sig=${product.id}`} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>
                  {formatPrice(product.price)}
                </p>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: product.stock_quantity > 0 ? '#10b981' : '#ef4444',
                  background: product.stock_quantity > 0 ? '#ecfdf5' : '#fef2f2',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {product.stock_quantity > 0 ? `In Stock: ${product.stock_quantity}` : 'Out of Stock'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                {user?.is_admin && (
                  <Link 
                    href={`/admin/edit-product/${product.id}`}
                    style={{ 
                      padding: '0.75rem', 
                      border: '1px solid var(--primary)', 
                      borderRadius: '12px', 
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
