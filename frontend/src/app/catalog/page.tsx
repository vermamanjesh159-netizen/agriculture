'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductList from '@/components/ProductList';

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
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
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Agricultural Marketplace
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Browse our wide range of premium feed and supplements.</p>
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
              border: 'none',
              background: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
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
          background: 'white',
          padding: '0.75rem',
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
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
                color: activeCategory === cat ? 'white' : '#64748b',
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
              <span style={{ color: '#94a3b8' }}>{filteredProducts.length} items found</span>
            </div>
            
            <ProductList initialProducts={filteredProducts} />
            
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '6rem', background: 'white', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                <h3 style={{ color: '#94a3b8', margin: 0 }}>No products found in this category yet.</h3>
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
      `}</style>
    </main>
  );
}
