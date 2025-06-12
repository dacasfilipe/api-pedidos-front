import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Dashboard' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <nav>
          <Link href="/produtos">Produtos</Link> |{' '}
          <Link href="/clientes">Clientes</Link> |{' '}
          <Link href="/pedidos">Pedidos</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}