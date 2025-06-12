'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api';

export default function ProductForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createProduct({ name, price: parseFloat(price) });
    router.push('/produtos');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="number" step="0.01"
        placeholder="Preço"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}