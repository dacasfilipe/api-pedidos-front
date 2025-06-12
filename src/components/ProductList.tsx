'use client';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — R$ {p.price.toFixed(2)}</li>
      ))}
    </ul>
  );
}