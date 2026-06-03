'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/config';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { 
    cart, removeFromCart, updateQuantity,
    subtotal, shipping, tax, total, clearCart 
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart View, 2: Shipping Form
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  // Track client mount to prevent flash/wrong redirects
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login?redirect=/cart');
    }
  }, [isAuthenticated, mounted, router]);

  // Autofill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.full_name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  if (!mounted || !isAuthenticated) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </main>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      customer_name: formData.name,
      customer_email: formData.email,
      items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price
      })),
      shipping_address: {
        address_line: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone
      }
    };

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/initiate-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.order_id) {
        window.location.href = `/checkout?order_id=${data.order_id}`;
      }
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2.5rem' }}>
          {checkoutStep === 1 ? 'Your Cart' : 'Checkout & Shipping'}
        </h1>

        {cart.length === 0 ? (
          <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '32px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Your cart is empty</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
              Explore our premium range of nutrient-rich livestock concentrates, supplements, and aqua feed.
            </p>
            <button className="btn-primary" onClick={() => router.push('/catalog')} style={{ padding: '0.75rem 2rem' }}>
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '3rem' }}>
            
            {/* Left Column: Cart items or Shipping form */}
            <div>
              {checkoutStep === 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map(item => (
                    <div key={item.id} className="glass-card cart-item-card" style={{ 
                      display: 'flex', 
                      gap: '1.5rem', 
                      alignItems: 'center', 
                      padding: '1.5rem', 
                      borderRadius: '24px',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--card-bg)',
                      boxShadow: 'var(--shadow)',
                      transition: 'transform 0.2s'
                    }}>
                      <div style={{ width: '100px', height: '100px', background: 'var(--badge-bg)', borderRadius: '16px', flexShrink: 0, overflow: 'hidden' }}>
                        <img 
                          src={item.image_url ? `${getApiUrl()}${item.image_url}` : `/robotic_feed_making.png`} 
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                        <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: '0 0 1rem 0' }}>₹{item.price.toLocaleString()}</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <div style={{ display: 'flex', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--background)', overflow: 'hidden' }}>
                            <button 
                              onClick={() => updateQuantity(item.id, -1)} 
                              style={{ width: '32px', height: '32px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--foreground)', fontWeight: 'bold' }}
                            >
                              -
                            </button>
                            <span style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              width: '36px', 
                              borderLeft: '1px solid var(--glass-border)', 
                              borderRight: '1px solid var(--glass-border)', 
                              color: 'var(--foreground)',
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)} 
                              style={{ width: '32px', height: '32px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--foreground)', fontWeight: 'bold' }}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            style={{ color: '#ef4444', border: 'none', background: 'none', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--glass-border)', background: 'var(--card-bg)', boxShadow: 'var(--shadow)' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Delivery Address Details</h2>
                  <form id="shipping-form" onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Full Name</label>
                      <input 
                        placeholder="Full Name" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Email Address</label>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Shipping Address</label>
                      <input 
                        placeholder="Shipping Address" 
                        required 
                        value={formData.address} 
                        onChange={e => setFormData({...formData, address: e.target.value})} 
                        style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>City</label>
                        <input 
                          placeholder="City" 
                          required 
                          value={formData.city} 
                          onChange={e => setFormData({...formData, city: e.target.value})} 
                          style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>State</label>
                        <input 
                          placeholder="State" 
                          required 
                          value={formData.state} 
                          onChange={e => setFormData({...formData, state: e.target.value})} 
                          style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Pincode</label>
                        <input 
                          placeholder="Pincode" 
                          required 
                          value={formData.pincode} 
                          onChange={e => setFormData({...formData, pincode: e.target.value})} 
                          style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Phone</label>
                        <input 
                          placeholder="Phone" 
                          required 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                          style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: Price details / checkout actions */}
            <div>
              <div className="glass-card" style={{ 
                padding: '2.5rem', 
                borderRadius: '32px', 
                border: '1px solid var(--glass-border)', 
                background: 'var(--card-bg)', 
                boxShadow: 'var(--shadow)',
                position: 'sticky',
                top: '8rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Price Details</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
                    <span>Shipping Charges</span>
                    <span>₹{shipping.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
                    <span>Tax (5%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.35rem', fontWeight: 'bold', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--glass-border)' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {checkoutStep === 1 ? (
                  <button 
                    onClick={() => setCheckoutStep(2)}
                    className="btn-primary animate-btn" 
                    style={{ width: '100%', padding: '1rem', borderRadius: '14px', fontSize: '1rem' }}
                  >
                    Proceed to Shipping
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                      type="submit" 
                      form="shipping-form"
                      disabled={loading}
                      className="btn-primary animate-btn" 
                      style={{ width: '100%', padding: '1rem', borderRadius: '14px', fontSize: '1rem' }}
                    >
                      {loading ? 'Processing Checkout...' : 'Pay with Stripe'}
                    </button>
                    
                    <button 
                      onClick={() => setCheckoutStep(1)} 
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        background: 'none', 
                        border: '1px solid var(--glass-border)', 
                        color: 'var(--foreground)', 
                        borderRadius: '14px', 
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        transition: 'background-color 0.2s'
                      }}
                      className="btn-back"
                    >
                      Back to Cart Items
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      <style jsx global>{`
        .cart-item-card:hover {
          transform: translateY(-2px);
        }
        .btn-back:hover {
          background: var(--badge-bg) !important;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 991px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </main>
  );
}
