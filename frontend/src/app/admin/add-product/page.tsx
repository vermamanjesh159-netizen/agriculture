'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Concentrates',
    price: '',
    stock_quantity: '',
    brand: '',
    protein_percentage: '',
    moisture_content: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      let uploadedImageUrl = null;

      // 1. Upload Image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const uploadRes = await fetch(`${apiUrl}/products/upload-image`, {
          method: 'POST',
          body: imageFormData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedImageUrl = uploadData.image_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      // 2. Create Product
      const productPayload = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        brand: formData.brand,
        image_url: uploadedImageUrl,
        attributes: {
          protein_percentage: formData.protein_percentage,
          moisture_content: formData.moisture_content
        }
      };

      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload)
      });

      if (res.ok) {
        setMessage('Product added successfully!');
        setFormData({
          name: '',
          category: 'Concentrates',
          price: '',
          stock_quantity: '',
          brand: '',
          protein_percentage: '',
          moisture_content: ''
        });
        setImageFile(null);
        setImagePreview(null);
      } else {
        const err = await res.json();
        const errorMsg = Array.isArray(err.detail) 
          ? err.detail.map((d: any) => `${d.loc[1]}: ${d.msg}`).join(', ') 
          : err.detail || 'Failed to add product';
        setMessage(`Error: ${errorMsg}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message || 'Failed to connect to the server.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem', background: 'var(--background)' }}>
      <Navbar />
      
      <div style={{ maxWidth: '800px', margin: '8rem auto 2rem', padding: '2rem' }}>
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '24px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '2rem' }}>
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Image Upload Section */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Product Image</label>
              <div style={{ 
                border: '2px dashed #e2e8f0', 
                borderRadius: '16px', 
                padding: '2rem', 
                textAlign: 'center',
                background: '#f8fafc',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px' }} />
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', color: '#94a3b8', marginBottom: '0.5rem' }}>+</div>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Click to upload product image</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }}
                >
                  <option value="Concentrates">Concentrates</option>
                  <option value="Roughages">Roughages</option>
                  <option value="Supplements">Supplements</option>
                  <option value="Aqua Feed">Aqua Feed</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Price (₹)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Quantity</label>
                <input 
                  type="number" 
                  name="stock_quantity" 
                  value={formData.stock_quantity} 
                  onChange={handleChange} 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Brand</label>
                <input 
                  type="text" 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange} 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#f1f5f9', borderRadius: '16px', marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#64748b' }}>Attributes (JSON)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Protein %</label>
                  <input 
                    type="text" 
                    name="protein_percentage" 
                    value={formData.protein_percentage} 
                    onChange={handleChange} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Moisture %</label>
                  <input 
                    type="text" 
                    name="moisture_content" 
                    value={formData.moisture_content} 
                    onChange={handleChange} 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}
            >
              {loading ? 'Adding Product...' : 'Create Product'}
            </button>

            {message && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                borderRadius: '12px', 
                textAlign: 'center',
                background: message.startsWith('Error') ? '#fef2f2' : '#f0fdf4',
                color: message.startsWith('Error') ? '#991b1b' : '#166534',
                fontWeight: 600
              }}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
