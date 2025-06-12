import Link from 'next/link';
import ProductList from '@/components/ProductList';

export default function ProdutosPage() {
  return (
    <main>
      <h1>Produtos</h1>
      <Link href="/produtos/novo">+ Novo Produto</Link>
      <ProductList />
    </main>
  );
}