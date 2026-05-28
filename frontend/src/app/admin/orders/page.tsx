'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      // In a real app, this would be a protected /admin/orders endpoint
      // For now, we'll fetch all if we had an endpoint, or just search by a common mock email
      const res = await fetch(`${apiUrl}/my-orders?email=admin@example.com`); 
      // NOTE: This is a placeholder for a real admin endpoint
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const updateStatus = async (orderId: number, newStatus: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/orders/${orderId}/status?status=${newStatus}`, { method: 'POST' });
      fetchAllOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '8rem auto 2rem', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Admin: Manage Orders</h1>
        
        <div className="glass-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f1f5f9' }}>
              <tr>
                <th style={{ padding: '1.25rem', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '1.25rem', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '1.25rem', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '1.25rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '1.25rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1.25rem' }}>#{order.id}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ fontWeight: 600 }}>{order.customer_name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{order.customer_email}</div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>₹{order.total_amount.toLocaleString()}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px', 
                      background: '#e0f2fe', 
                      color: '#0369a1',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <select 
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      value={order.status}
                      style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>No orders to display.</div>
          )}
        </div>
      </div>
    </main>
  );
}
