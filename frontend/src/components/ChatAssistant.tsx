'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getApiUrl } from '@/config';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product';
  product?: any;
}

export default function ChatAssistant() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! How can I help you today? I can help you find products, check delivery status, and more.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !isAuthenticated || products.length > 0) return;
    const fetchProducts = async () => {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Chat assistant failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [isOpen, isAuthenticated, products.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Bot Logic
    setTimeout(() => {
      processBotResponse(inputValue.toLowerCase());
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSelect = (text: string) => {
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Bot Logic
    setTimeout(() => {
      processBotResponse(text.toLowerCase());
      setIsTyping(false);
    }, 1500);
  };

  const processBotResponse = (query: string) => {
    let response: Message = {
      id: Date.now() + 1,
      text: "I'm not sure how to help with that. Select one of the quick options above or ask about 'delivery' or a product name.",
      sender: 'bot',
      timestamp: new Date()
    };

    if (query.includes('delivery') || query.includes('track') || query.includes('shipping')) {
      response.text = "To track your order, please go to the 'My Orders' page in the top menu. Enter your email to track order status and estimated delivery dates.";
    } else if (query.includes('return') || query.includes('exchange')) {
      response.text = "We offer a 10-day return policy for unused products. Please keep the original packaging. Exchanges can be processed via support@agrifeed.com.";
    } else if (query.includes('refund') || query.includes('payment')) {
      response.text = "Refunds are processed within 5-7 business days after we receive and inspect the returned item. Payments are secured via Stripe.";
    } else if (query.includes('cancel') || query.includes('modify') || query.includes('cancellation')) {
      response.text = "Orders can be cancelled or modified before they are marked as 'Shipped'. Please check your 'My Orders' section or contact customer service.";
    } else if (query.includes('account') || query.includes('login') || query.includes('profile')) {
      response.text = "You can manage your account, change email, or sign out directly from the 'Profile' page. If you cannot log in, contact support@agrifeed.com.";
    } else if (query.includes('support') || query.includes('contact')) {
      response.text = "You can contact our 24/7 helpdesk at support@agrifeed.com or track guest or logged-in orders in the 'My Orders' section.";
    } else if (query.includes('help') || query.includes('hi') || query.includes('hello')) {
      response.text = "Hello! I'm your AgriFeed assistant. Please select one of the support categories from the dropdown or search for a product.";
    } else if (query.includes('my products') || query.includes('provide me my products')) {
      response.text = "I can help you browse our marketplace! We have a wide range of premium agricultural products. Here's one of our popular items:";
      if (products.length > 0) {
        response.type = 'product';
        response.product = products[0];
      }
    } else {
      // Search products
      const foundProducts = products.filter(p => 
        (p.name && p.name.toLowerCase().includes(query)) || 
        (p.category?.name && p.category.name.toLowerCase().includes(query))
      );

      if (foundProducts.length > 0) {
        const first = foundProducts[0];
        response.text = `I found "${first.name}"! It costs ₹${first.toLocaleString ? first.price.toLocaleString() : first.price}. Would you like more details?`;
        response.type = 'product';
        response.product = first;
      }
    }

    setMessages(prev => [...prev, response]);
  };

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '500px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.25rem',
            background: 'linear-gradient(to right, #10b981, #3b82f6)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%', border: '2px solid white' }}></div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>AgriFeed Assistant</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => {
                  if (confirm("Start a new conversation?")) {
                    setMessages([
                      {
                        id: 1,
                        text: "Hi! How can I help you today? I can help you find products, check delivery status, and more.",
                        sender: 'bot',
                        timestamp: new Date()
                      }
                    ]);
                  }
                }}
                title="Start a new conversation"
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{ 
                  maxWidth: '85%', 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#3b82f6' : '#f1f5f9',
                  color: msg.sender === 'user' ? 'white' : '#1e293b',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  position: 'relative',
                  animation: 'fadeIn 0.3s ease-out'
                }}
              >
                {msg.text}
                {msg.type === 'product' && msg.product && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ height: '80px', background: '#f8fafc', borderRadius: '8px', marginBottom: '0.5rem', overflow: 'hidden' }}>
                      <img 
                        src={msg.product.image_url ? `${getApiUrl()}${msg.product.image_url}` : `/robotic_feed_making.png`} 
                        alt={msg.product.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: '#1e293b' }}>{msg.product.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>₹{msg.product.price.toLocaleString()}</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.7rem', color: '#64748b' }}>Delivery in 3 days</p>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '0.75rem 1rem', borderRadius: '18px 18px 18px 2px', display: 'flex', gap: '4px' }}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Menu Options */}
          <div style={{ 
            padding: '0 1rem 0.5rem', 
            display: 'flex', 
            gap: '0.5rem', 
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }} className="hide-scrollbar">
            {[
              { label: "📦 Track Order", value: "Track Order / Delivery" },
              { label: "🔄 Returns & Exchange", value: "Returns & Exchange" },
              { label: "💰 Refunds & Payments", value: "Refunds & Payments" },
              { label: "❌ Cancellations", value: "Cancellations & Modifications" },
              { label: "👤 Account Help", value: "Account & Login Assistance" }
            ].map(chip => (
              <button
                key={chip.value}
                onClick={() => handleQuickSelect(chip.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  color: '#10b981',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: '0 2px 4px rgba(16, 185, 129, 0.05)',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about products or delivery..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                fontSize: '0.9rem',
                background: '#f8fafc'
              }}
            />
            <button 
              onClick={handleSend}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dot {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          borderRadius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
