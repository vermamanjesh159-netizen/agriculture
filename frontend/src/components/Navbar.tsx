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
    <nav className="glass-card premium-navbar" style={{
      position: 'fixed',
      top: '1.25rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '92%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-only menu-toggle-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Premium Brand Logo */}
        <Link href="/" className="brand-logo" style={{ 
          textDecoration: 'none', 
          fontSize: '1.4rem', 
          fontWeight: '800', 
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          letterSpacing: '-0.03em'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-light)' }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={{ 
            background: 'linear-gradient(to right, var(--primary), var(--primary-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}>Agri</span>
          <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>Feed</span>
        </Link>
      </div>

      {/* Desktop Links with Animated Indicator */}
      <div className="nav-links desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" className={`nav-link-item ${pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link href="/catalog" className={`nav-link-item ${pathname.startsWith('/catalog') ? 'active' : ''}`}>Marketplace</Link>
        {!user?.is_admin && (
          <Link href="/orders" className={`nav-link-item ${pathname.startsWith('/orders') ? 'active' : ''}`}>My Orders</Link>
        )}
        {isAuthenticated && (
          <Link href="/profile" className={`nav-link-item ${pathname.startsWith('/profile') ? 'active' : ''}`}>Profile</Link>
        )}
        {user?.is_admin && (
          <Link href="/admin/add-product" className={`nav-link-item admin-link ${pathname.startsWith('/admin') ? 'active' : ''}`}>Admin Panel</Link>
        )}
      </div>
      
      {/* Right-Side Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* User Email Info Chip */}
        {isAuthenticated && user?.email && (
          <div className="desktop-only user-email-chip" style={{
            fontSize: '0.8rem',
            color: '#475569',
            background: 'rgba(74, 140, 68, 0.08)',
            padding: '0.4rem 0.9rem',
            borderRadius: '99px',
            border: '1px solid rgba(74, 140, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 600
          }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
            <span>{user.email}</span>
          </div>
        )}

        {isAuthenticated && !user?.is_admin && !isAuthPage && (
          <button 
            className="cart-btn" 
            style={{ 
              padding: '0.5rem 1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.85rem',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '14px',
              cursor: 'pointer',
              fontWeight: 700,
              color: '#334155',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
            onClick={handleCheckout}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="desktop-only">Cart</span>
            <span style={{
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '99px',
              minWidth: '20px',
              height: '20px',
              padding: '0 0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>{cartCount}</span>
          </button>
        )}

        {isAuthenticated ? (
          <button 
            onClick={logout} 
            className="logout-btn"
            style={{ 
              background: '#fee2e2', 
              border: 'none', 
              color: '#dc2626',
              padding: '0.5rem 1.25rem', 
              borderRadius: '14px', 
              cursor: 'pointer', 
              fontWeight: 700, 
              fontSize: '0.85rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            Logout
          </button>
        ) : (
          <Link 
            href="/login" 
            className="btn-primary"
            style={{ 
              textDecoration: 'none', 
              padding: '0.5rem 1.25rem', 
              borderRadius: '14px', 
              fontWeight: 700, 
              fontSize: '0.85rem',
              display: 'inline-block'
            }}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Dropdown with Animations */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute',
          top: '115%',
          left: '0',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 999,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          animation: 'slideDownMenu 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {isAuthenticated && user?.email && (
            <div style={{
              fontSize: '0.85rem',
              color: '#334155',
              background: 'rgba(74, 140, 68, 0.08)',
              padding: '0.6rem 1rem',
              borderRadius: '14px',
              border: '1px solid rgba(74, 140, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ wordBreak: 'break-all' }}>{user.email}</span>
            </div>
          )}
          <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600, padding: '0.5rem 0' }}>Home</Link>
          <Link href="/catalog" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600, padding: '0.5rem 0' }}>Marketplace</Link>
          {!user?.is_admin && (
            <Link href="/orders" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600, padding: '0.5rem 0' }}>My Orders</Link>
          )}
          {isAuthenticated && (
            <Link href="/profile" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600, padding: '0.5rem 0' }}>Profile</Link>
          )}
          {user?.is_admin && (
            <Link href="/admin/add-product" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, padding: '0.5rem 0' }}>Admin Panel</Link>
          )}
        </div>
      )}

      <style jsx global>{`
        .mobile-only { display: none !important; }
        .menu-toggle-btn {
          background: none; 
          border: none; 
          cursor: pointer; 
          padding: 0;
          color: #334155;
          display: flex;
          alignItems: center;
          justifyContent: center;
          transition: transform 0.2s ease;
        }
        .menu-toggle-btn:active {
          transform: scale(0.9);
        }
        
        .nav-link-item {
          text-decoration: none; 
          color: #475569; 
          font-weight: 600;
          font-size: 0.95rem;
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.2s ease;
        }
        
        .nav-link-item:hover {
          color: var(--primary-light);
        }
        
        .nav-link-item::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: var(--primary-light);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        
        .nav-link-item.active {
          color: var(--primary);
        }
        
        .cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.06) !important;
          border-color: rgba(74, 140, 68, 0.3) !important;
        }
        
        .cart-btn:active, .logout-btn:active {
          transform: translateY(0) scale(0.98);
        }
        
        .logout-btn:hover {
          background: #fecaca !important;
          transform: translateY(-1px);
        }
        
        @keyframes slideDownMenu {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .premium-navbar { 
            padding: 0.75rem 1.25rem !important; 
            width: 94% !important;
          }
        }
      `}</style>
    </nav>
  );
}
