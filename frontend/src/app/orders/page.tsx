'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

import { getApiUrl } from '@/config';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      handleSearch(user.email);
    }
  }, [isAuthenticated, user]);

  const handleSearch = async (searchEmail: string) => {
    setLoading(true);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/my-orders?email=${searchEmail}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setSearched(true);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch(status) {
      case 'Confirmed': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const getEstimatedDelivery = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 6);
    return date.toLocaleDateString();
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Track Your Orders</h1>

        {!isAuthenticated && !searched && (
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <input 
              type="email" 
              placeholder="Enter your email to track guest orders" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={() => handleSearch(email)}
              className="btn-primary" 
              style={{ padding: '0.75rem 2rem' }}
            >
              Search
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.length > 0 ? (
              orders.map((order) => {
                const step = getStatusStep(order.status);
                return (
                  <div key={order.id} className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px' }}>
                    <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Order ID: #{order.id}</span>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0' }}>₹{order.total_amount}</h2>
                        <p style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>
                          Estimated Delivery: {getEstimatedDelivery(order.created_at)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: '#fef3c7', color: '#92400e', fontWeight: 600, fontSize: '0.85rem', height: 'fit-content' }}>{order.status}</span>
                        <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: order.payment_status === 'Paid' ? '#dcfce7' : '#fee2e2', color: order.payment_status === 'Paid' ? '#166534' : '#991b1b', fontWeight: 600, fontSize: '0.85rem', height: 'fit-content' }}>{order.payment_status}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div style={{ marginBottom: '3rem', position: 'relative', padding: '0 2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                        {[
                          { label: 'Confirmed', val: 1 },
                          { label: 'Shipped', val: 2 },
                          { label: 'Delivered', val: 3 }
                        ].map((s) => (
                          <div key={s.val} style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ 
                              width: '40px', 
                              height: '40px', 
                              borderRadius: '50%', 
                              background: step >= s.val ? '#10b981' : 'white', 
                              border: step >= s.val ? 'none' : '2px solid #cbd5e1',
                              color: step >= s.val ? 'white' : '#64748b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 0.5rem',
                              fontWeight: 'bold',
                              boxShadow: step >= s.val ? '0 0 15px rgba(16, 185, 129, 0.3)' : 'none'
                            }}>
                              {step >= s.val ? '✓' : s.val}
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: step >= s.val ? '#1e293b' : '#94a3b8' }}>{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ 
                        position: 'absolute', 
                        top: '20px', 
                        left: '10%', 
                        right: '10%', 
                        height: '4px', 
                        background: '#e2e8f0', 
                        borderRadius: '2px',
                        zIndex: 0 
                      }}>
                        <div style={{ 
                          width: `${((step - 1) / 2) * 100}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #10b981, #34d399)', 
                          borderRadius: '2px',
                          transition: 'width 0.5s ease' 
                        }} />
                      </div>
                    </div>

                    <div className="order-info-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                      {/* Left Column: Items & Price Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Section: Order Details (Items) */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                          <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: '#64748b', letterSpacing: '1px', marginBottom: '1.5rem', fontWeight: 700 }}>Order Details (Items)</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {order.items.map((item: any) => (
                              <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>{item.name}</span>
                                  <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.5rem' }}>x {item.quantity}</span>
                                  <div style={{ fontSize: '0.75rem', color: item.remaining_stock < 10 ? '#ef4444' : '#10b981', marginTop: '0.25rem' }}>
                                    Stock Availability: {item.remaining_stock} units left
                                  </div>
                                </div>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{item.unit_price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section: Price Details */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                          <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: '#64748b', letterSpacing: '1px', marginBottom: '1.5rem', fontWeight: 700 }}>Price Details</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.95rem' }}>
                              <span>Subtotal</span>
                              <span>₹{(order.subtotal || (order.total_amount - (order.shipping_charges || 50) - (order.tax || 0))).toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.95rem' }}>
                              <span>Shipping Charges</span>
                              <span>₹{(order.shipping_charges || 50).toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.95rem' }}>
                              <span>Estimated Tax (5%)</span>
                              <span>₹{(order.tax || (order.total_amount * 0.05)).toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', color: '#10b981' }}>
                              <span>Total Amount Paid</span>
                              <span>₹{order.total_amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Delivery Details & Help/Support */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Section: Delivery Details */}
                        <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                          <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: '#475569', letterSpacing: '1px', marginBottom: '1.5rem', fontWeight: 700 }}>Delivery Details</h4>
                          {order.shipping_address ? (
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.7' }}>
                              <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{order.customer_name}</p>
                              <p style={{ margin: '0.5rem 0 0.25rem' }}>{order.shipping_address.address_line}</p>
                              <p style={{ margin: '0.25rem 0' }}>{order.shipping_address.city}, {order.shipping_address.state}</p>
                              <p style={{ margin: '0.25rem 0 0.75rem' }}>PIN: <span style={{ fontWeight: 600 }}>{order.shipping_address.pincode}</span></p>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'white', borderRadius: '12px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '0.9rem' }}>📞 Phone:</span>
                                <span style={{ fontWeight: 600, color: '#334155' }}>{order.shipping_address.phone}</span>
                              </div>
                              
                              <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#166534', fontWeight: 700, letterSpacing: '0.5px' }}>Delivery Target</span>
                                <span style={{ fontSize: '0.9rem', color: '#14532d', fontWeight: 600 }}>Arriving by {getEstimatedDelivery(order.created_at)}</span>
                              </div>
                            </div>
                          ) : (
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No delivery address provided.</p>
                          )}
                        </div>

                        {/* Section: Need Help / Support */}
                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>Need Support?</h4>
                          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                            Have questions about this order, feed products, or delivery tracking? Contact our 24/7 AgriFeed helpdesk.
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <a href="mailto:support@agrifeed.com" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.75rem 1rem', fontSize: '0.85rem', borderRadius: '12px' }}>
                              Contact Helpdesk
                            </a>
                            <a href="/faq" style={{ textAlign: 'center', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                              Browse Returns & Refunds FAQs
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', color: '#94a3b8', fontSize: '0.85rem' }}>
                      Placed on: {formatDate(order.created_at)}
                    </div>
                  </div>
                );
              })
            ) : (
              searched && (
                <div style={{ textAlign: 'center', padding: '6rem', background: 'white', borderRadius: '32px' }}>
                  <h3 style={{ color: '#94a3b8' }}>No orders found for this account.</h3>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <style jsx global>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .order-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
          }
          .order-info-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </main>
  );
}
