import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import VideoShowcase from '@/components/VideoShowcase';

export default async function Home() {
  let categorizedProducts: Record<string, any[]> = {
    "Concentrates": [],
    "Roughages": [],
    "Supplements": [],
    "Aqua Feed": []
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });

    if (res.ok) {
      const allProducts = await res.json();
      allProducts.forEach((p: any) => {
        const catName = p.category;
        if (categorizedProducts[catName]) {
          categorizedProducts[catName].push(p);
        }
      });
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  const categories = [
    { name: "Concentrates", img: "/fetured/pexels-mikhail-nilov-9269369.jpg", desc: "Scientific high-energy formulas" },
    { name: "Roughages", img: "/fetured/pexels-nc-farm-bureau-mark-31110992.jpg", desc: "Premium fiber and natural forage" },
    { name: "Supplements", img: "/fetured/pexels-fatma-cakir-69810614-36781379.jpg", desc: "Essential vitamins and health boosters" },
    { name: "Aqua Feed", img: "/fetured/pexels-curtis-wong-782833963-19757403.jpg", desc: "Advanced nutrition for aquatic life" }
  ];

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      
      <VideoShowcase />

      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em', color: '#0f172a' }}>Featured Catalog</h2>
            <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>Premium nutrition solutions for every agricultural sector.</p>
          </div>

          {categories.map((cat) => (
            <div key={cat.name} style={{ marginBottom: '6rem' }}>
              <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '350px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '2.5rem' }}>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '3rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <h3 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>{cat.name}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginTop: '0.5rem' }}>{cat.desc}</p>
                    </div>
                    <a href={`/catalog?category=${cat.name}`} className="btn-primary" style={{ 
                      textDecoration: 'none', 
                      padding: '0.75rem 2rem', 
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      background: 'white',
                      color: 'var(--primary)',
                      border: 'none'
                    }}>
                      Explore {cat.name} →
                    </a>
                  </div>
                </div>
              </div>

              {categorizedProducts[cat.name].length > 0 && (
                <div style={{ padding: '0 1rem' }}>
                  <ProductList initialProducts={categorizedProducts[cat.name].slice(0, 4)} />
                </div>
              )}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/catalog" className="btn-primary" style={{ textDecoration: 'none', padding: '1.5rem 5rem', fontSize: '1.2rem', borderRadius: '20px', fontWeight: 'bold' }}>
              View Full Marketplace
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}