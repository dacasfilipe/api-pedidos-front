'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientes, getProducts, Client, Product } from '@/lib/api';

export default function PedidoForm() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clienteId, setClienteId] = useState<number>();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    getClientes().then(setClientes);
    getProducts().then(setProducts);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteId || selectedProducts.length === 0) return;

    const response = await fetch('/api/orders', { // Envia para o backend em Spring
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clienteId, productIds: selectedProducts }),
    });

    if (response.ok) {
      router.push('/pedidos');
    } else {
      console.error('Erro ao criar pedido:', await response.text());
    }
  }

  function toggleProduct(id: number) {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Cliente:
        <select onChange={e => setClienteId(+e.target.value)} required>
          <option value="">Selecione</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend>Produtos:</legend>
        {products.map(prod => (
          <label key={prod.id}>
            <input
              type="checkbox"
              value={prod.id}
              checked={selectedProducts.includes(prod.id)}
              onChange={() => toggleProduct(prod.id)}
            /> {prod.name}
          </label>
        ))}
      </fieldset>

      <button type="submit">Salvar Pedido</button>
    </form>
  );
}