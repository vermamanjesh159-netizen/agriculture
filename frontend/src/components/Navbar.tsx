'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  const handleCheckout = () => {
    setCartOpen(true);
  };

  return (
    <nav className="glass-card" style={{
      position: 'fixed',
      top: '0.75rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '94%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '0.6rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-only"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <Link href="/" style={{ textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          Agri<span style={{ color: 'var(--secondary)' }}>Feed</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="nav-links desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Home</Link>
        <Link href="/catalog" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Marketplace</Link>
        {!user?.is_admin && (
          <Link href="/orders" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>My Orders</Link>
        )}
        {isAuthenticated && (
          <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Profile</Link>
        )}
        {user?.is_admin && (
          <Link href="/admin/add-product" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700 }}>Add Product</Link>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {!user?.is_admin && !isAuthPage && (
          <button 
            className="btn-primary cart-btn" 
            style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }} 
            onClick={handleCheckout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="desktop-only">Cart</span> ({cartCount})
          </button>
        )}

        {isAuthenticated ? (
          <button onClick={logout} style={{ background: 'none', border: '1px solid #ddd', padding: '0.4rem 0.8rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Logout</button>
        ) : (
          <Link href="/login" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>Login</Link>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 999
        }}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          <Link href="/catalog" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Marketplace</Link>
          {!user?.is_admin && (
            <Link href="/orders" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>My Orders</Link>
          )}
          {isAuthenticated && (
            <Link href="/profile" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
          )}
          {user?.is_admin && (
            <Link href="/admin/add-product" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700 }}>Add Product</Link>
          )}
        </div>
      )}

      <style jsx>{`
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
          nav { padding: 0.5rem 1rem !important; }
        }
        @media (max-width: 480px) {
          .cart-btn span { display: none; }
          nav { width: 96% !important; }
        }
      `}</style>
    </nav>
  );
}
