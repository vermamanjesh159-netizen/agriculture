'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductList from '@/components/ProductList';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/config';

export default function CatalogPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const fetchData = async () => {
      try {
        const apiUrl = getApiUrl();
        
        // Fetch categories
        const catRes = await fetch(`${apiUrl}/products/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(['All', ...catData]);
        }

        // Fetch products
        const prodRes = await fetch(`${apiUrl}/products`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
      } catch (err) {
        console.error("Failed to fetch catalog data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, authLoading]);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (authLoading || !isAuthenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--background)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748b', marginBottom: '1rem' }}>Redirecting to Login...</p>
          <div className="spinner-large" />
        </div>
        <style jsx global>{`
          .spinner-large {
            width: 50px;
            height: 50px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 className="catalog-page-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Agricultural Marketplace
          </h1>
          <p style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '1.1rem' }}>Browse our wide range of premium feed and supplements.</p>
        </div>

        {/* Search Bar */}
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto 3rem',
          position: 'relative'
        }}>
          <input 
            type="text"
            placeholder="Search for seeds, feed, supplements..."
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem 1.25rem 3.5rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              background: 'var(--card-bg)',
              color: 'var(--foreground)',
              boxShadow: 'var(--shadow)',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (query.length > 2) {
                // We can filter products locally for immediate feedback
                // and the ChatAssistant is also available
              }
            }}
          />
          <svg 
            style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {/* Category Tabs */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '4rem', 
          flexWrap: 'wrap',
          background: 'var(--card-bg)',
          border: '1px solid var(--glass-border)',
          padding: '0.75rem',
          borderRadius: '24px',
          boxShadow: 'var(--shadow)'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '16px',
                border: 'none',
                background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--foreground)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner-large" />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{activeCategory} Products</h2>
              <span style={{ color: 'var(--foreground)', opacity: 0.7 }}>{filteredProducts.length} items found</span>
            </div>
            
            <ProductList initialProducts={filteredProducts} showFilters={false} />
            
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '6rem', background: 'var(--card-bg)', borderRadius: '32px', border: '2px dashed var(--glass-border)' }}>
                <h3 style={{ color: 'var(--foreground)', opacity: 0.7, margin: 0 }}>No products found in this category yet.</h3>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .spinner-large {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .catalog-page-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </main>
  );
}
