'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const { user, token, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchProfile = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--background)' }}>
      <div className="spinner-large" />
    </div>
  );

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'var(--primary)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              {profileData?.full_name?.charAt(0)}
            </div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{profileData?.full_name}</h1>
              <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0.25rem 0 0' }}>{profileData?.is_admin ? 'Administrator' : 'Valued Customer'}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="profile-field" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Email Address</label>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', wordBreak: 'break-all' }}>{profileData?.email}</span>
            </div>
            <div className="profile-field" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Account Status</label>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.75rem', background: profileData?.is_admin ? '#ecfdf5' : '#eff6ff', color: profileData?.is_admin ? '#059669' : '#2563eb', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700 }}>
                {profileData?.is_admin ? 'Administrator' : 'Customer'}
              </span>
            </div>
            <div className="profile-field" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Member Since</label>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b' }}>{new Date(profileData?.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.location.href = '/orders'} className="btn-primary" style={{ padding: '1rem 2rem' }}>View Order History</button>
            <button onClick={logout} style={{ padding: '1rem 2rem', background: 'white', border: '1px solid #fee2e2', color: '#991b1b', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Sign Out</button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .spinner-large {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
