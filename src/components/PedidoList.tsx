'use client';
import { useEffect, useState } from 'react';
import { getPedidos, Order, getClientes, getProducts } from '@/lib/api';

export default function PedidoList() {
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPedidos()
      .then(setPedidos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;

  return (
    <ul>
      {pedidos.map(p => (
        <li key={p.id}>
          Pedido #{p.id} — Cliente: {p.clientId} — Produtos: {p.productIds.join(', ')}
        </li>
      ))}
    </ul>
  );
}