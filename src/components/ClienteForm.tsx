'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCliente } from '@/lib/api';

export default function ClienteForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createCliente({ name, email });
    router.push('/clientes');
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}