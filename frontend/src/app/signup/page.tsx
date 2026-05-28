'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          full_name: fullName, 
          email, 
          password,
          is_admin: isAdmin
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Signup failed');
      }

      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', borderRadius: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Create Account</h1>
          <p style={{ textAlign: 'center', color: 'var(--foreground)', opacity: 0.7, marginBottom: '2.5rem' }}>Join the AgriFeed community</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
              <input 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #ddd' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="is_admin"
                checked={isAdmin} 
                onChange={(e) => setIsAdmin(e.target.checked)} 
              />
              <label htmlFor="is_admin" style={{ fontWeight: 600, cursor: 'pointer' }}>Register as Admin</label>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--foreground)', opacity: 0.7 }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--primary-light)', fontWeight: 700, textDecoration: 'none' }}>Log In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
