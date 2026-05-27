'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from '@/components/Navbar';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  
  const [clientSecret, setClientSecret] = useState<string>("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const initCheckout = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        // 1. Fetch order details
        const orderRes = await fetch(`${apiUrl}/orders/${orderId}`);
        if (!orderRes.ok) throw new Error("Order not found");
        const orderData = await orderRes.json();
        setOrder(orderData);

        // 2. Create PaymentIntent
        const paymentRes = await fetch(`${apiUrl}/payments/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: parseInt(orderId) }),
        });
        
        if (!paymentRes.ok) {
           const errData = await paymentRes.json();
           throw new Error(errData.detail || "Failed to initialize payment");
        }
        
        const paymentData = await paymentRes.json();
        setClientSecret(paymentData.client_secret);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    initCheckout();
  }, [orderId]);

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#10b981',
      colorBackground: '#1e293b',
      colorText: '#ffffff',
      borderRadius: '8px',
    },
  };
  
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      <Navbar />
      
      <div className="checkout-container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '8rem 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '4rem'
      }}>
        
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <div className="spinner-large" />
            <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: '#94a3b8' }}>Securing your transaction...</p>
          </div>
        ) : error ? (
          <div style={{ gridColumn: '1 / -1', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid #f87171', color: '#f87171', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.href = '/'} style={{ marginTop: '1.5rem', background: '#f87171', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Return to Shop</button>
          </div>
        ) : (
          <>
            {/* Left Column: Payment */}
            <div className="payment-section">
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Payment Method</h2>
              <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>All transactions are secure and encrypted.</p>
              
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm orderId={parseInt(orderId!)} amount={order?.total_amount || 0} />
                </Elements>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="order-summary-section" style={{ 
              background: 'rgba(255,255,255,0.03)', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)',
              height: 'fit-content'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Order Summary</h3>
              
              <div className="items-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {order?.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
                      <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                    </div>
                    <span style={{ fontWeight: 600 }}>₹{(item.unit_price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="price-breakdown" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Subtotal</span>
                  <span>₹{order?.total_amount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Shipping</span>
                  <span>₹{order?.shipping_charges.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Tax (5%)</span>
                  <span>₹{order?.tax.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', color: '#10b981' }}>
                  <span>Total</span>
                  <span>₹{order?.total_amount.toLocaleString()}</span>
                </div>
              </div>

              {order?.shipping_address && (
                <div className="shipping-info" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Shipping To</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{order.customer_name}</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>{order.shipping_address.address_line}, {order.shipping_address.city}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{order.shipping_address.state} - {order.shipping_address.pincode}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner-large {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255,255,255,0.1);
          border-top: 4px solid #10b981;
          border-radius: 50%;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }
        @media (max-width: 1024px) {
          .checkout-container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding-top: 6rem !important;
          }
          .order-summary-section {
            order: -1; /* Show summary first on mobile */
          }
        }
      `}</style>
    </main>
  );
}
