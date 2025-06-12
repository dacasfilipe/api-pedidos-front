import Link from 'next/link';
import ClienteList from '@/components/ClienteList';

export default function ClientesPage() {
  return (
    <main>
      <h1>Clientes</h1>
      <Link href="/clientes/novo">+ Novo Cliente</Link>
      <ClienteList />
    </main>
  );
}