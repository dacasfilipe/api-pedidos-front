'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientes, getProducts, Client, Product, createPedido, getPedidos

 } from '@/lib/api';

export default function PedidoForm() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    getClientes().then(setClientes);
    getProducts().then(setProducts);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (clienteId === null || selectedProducts.length === 0) return;

    const orderData = {
      clientId: clienteId, // Envia o ID do cliente diretamente
      productIds: selectedProducts, // Envia os IDs dos produtos diretamente
      ok: true, // Adiciona a propriedade 'ok' conforme exigido pela interface
    };

    const result = await createPedido(orderData);
    if (!result) {
      console.error('Erro ao criar pedido');
      return;
    }
    if (result.ok) {
      router.push('/pedidos');
    } else {
      console.error('Erro ao criar pedido:', result.ok ? 'Erro desconhecido' : 'Detalhes do erro não disponíveis');
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