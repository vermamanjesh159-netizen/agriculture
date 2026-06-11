'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

import { getApiUrl } from '@/config';

export default function ProfilePage() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchProfile = async () => {
      try {
        const apiUrl = getApiUrl();
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
  }, [token, authLoading]);

  if (authLoading || loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--background)' }}>
      <div className="spinner-large" />
    </div>
  );

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '8rem auto 4rem', padding: '0 2rem' }}>
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
          <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
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
              <p style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: '1.1rem', margin: '0.25rem 0 0' }}>{profileData?.is_admin ? 'Administrator' : 'Valued Customer'}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="profile-field" style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--foreground)', opacity: 0.7, textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Email Address</label>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--foreground)', wordBreak: 'break-all' }}>{profileData?.email}</span>
            </div>
            <div className="profile-field" style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--foreground)', opacity: 0.7, textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Account Status</label>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.75rem', background: profileData?.is_admin ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)', color: profileData?.is_admin ? '#10b981' : '#3b82f6', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700 }}>
                {profileData?.is_admin ? 'Administrator' : 'Customer'}
              </span>
            </div>
            <div className="profile-field" style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--foreground)', opacity: 0.7, textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Member Since</label>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--foreground)' }}>{new Date(profileData?.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div className="profile-buttons" style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.location.href = '/orders'} className="btn-primary" style={{ padding: '1rem 2rem' }}>View Order History</button>
            <button onClick={logout} style={{ padding: '1rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: '#dc2626', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Sign Out</button>
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
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1.25rem !important;
          }
          .profile-header h1 {
            font-size: 1.75rem !important;
          }
          .profile-buttons {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .profile-buttons button {
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}
