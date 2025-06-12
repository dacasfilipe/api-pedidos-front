'use client';
import { useEffect, useState } from 'react';
import { getClientes, Client } from '@/lib/api';

export default function ClienteList() {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientes()
      .then(setClientes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando clientes...</p>;

  return (
    <ul>
      {clientes.map(c => (
        <li key={c.id}>{c.name} — {c.email}</li>
      ))}
    </ul>
  );
}