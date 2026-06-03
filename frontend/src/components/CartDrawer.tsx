'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/config';

export default function CartDrawer() {
  const { isAuthenticated } = useAuth();
  const { 
    cart, removeFromCart, updateQuantity, isCartOpen, setCartOpen,
    subtotal, shipping, tax, total, clearCart 
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Checkout Form
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  if (!isAuthenticated || !isCartOpen) return null;

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
    <div className="cart-drawer-container" style={{
      position: 'fixed',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow)',
      background: 'var(--card-bg)',
      color: 'var(--foreground)',
      border: '1px solid var(--glass-border)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        
        @media (min-width: 769px) {
          .cart-drawer-container {
            top: 6.5rem;
            right: 4%;
            width: 420px;
            height: calc(100vh - 8.5rem);
            border-radius: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .cart-drawer-container {
            top: 5.5rem;
            right: 3%;
            width: 94%;
            height: calc(100vh - 7rem);
            border-radius: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'var(--foreground)' }}>
          {checkoutStep === 1 ? 'Your Cart' : 'Shipping Details'}
        </h2>
        <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--foreground)', opacity: 0.8 }}>&times;</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {checkoutStep === 1 ? (
          <>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--foreground)', opacity: 0.6 }}>Your cart is empty</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--badge-bg)', borderRadius: '8px', flexShrink: 0 }}>
                      <img src={item.image_url ? `${getApiUrl()}${item.image_url}` : `/robotic_feed_making.png`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--foreground)' }}>{item.name}</h4>
                      <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: 0 }}>₹{item.price.toLocaleString()}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0 0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>-</button>
                          <span style={{ padding: '0 0.75rem', borderLeft: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', color: 'var(--foreground)' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0 0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', border: 'none', background: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>Remove</button>
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--foreground)' }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <form id="shipping-form" onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
            <input placeholder="Shipping Address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
              <input placeholder="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="Pincode" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
              <input placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--background)', color: 'var(--foreground)' }} />
            </div>
          </form>
        )}
      </div>

      {/* Footer / Summary */}
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', background: 'var(--badge-bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', opacity: 0.7 }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', opacity: 0.7 }}>
            <span>Shipping</span>
            <span>₹{shipping.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', opacity: 0.7 }}>
            <span>Tax (5%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--foreground)' }}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {checkoutStep === 1 ? (
          <button 
            onClick={() => cart.length > 0 && setCheckoutStep(2)}
            disabled={cart.length === 0}
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
          >
            Checkout Now
          </button>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <button onClick={() => setCheckoutStep(1)} style={{ padding: '1rem', background: 'none', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
            <button 
              type="submit" 
              form="shipping-form"
              disabled={loading}
              className="btn-primary" 
              style={{ padding: '1rem' }}
            >
              {loading ? 'Processing...' : 'Pay with Stripe'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
