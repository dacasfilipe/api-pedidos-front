import Link from 'next/link';
import PedidoList from '@/components/PedidoList';

export default function PedidosPage() {
  return (
    <main>
      <h1>Pedidos</h1>
      <Link href="/pedidos/novo">+ Novo Pedido</Link>
      <PedidoList />
    </main>
  );
}