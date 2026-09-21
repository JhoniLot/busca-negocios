import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AffiliateNotice } from '@/components/AffiliateNotice';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B1F3A',
};

export const metadata: Metadata = {
  title: 'Busca Descontos | Compare Preços e Pague Menos no Brasil',
  description:
    'O comparador de preços mais simples, rápido e transparente do Brasil. Compare ofertas da Amazon, Mercado Livre, Magalu, Casas Bahia, Kabum e economize de verdade.',
  keywords: [
    'comparador de preços',
    'busca descontos',
    'menor preço',
    'ofertas brasil',
    'desconto iphone',
    'cupom de desconto',
    'promocoes',
  ],
  authors: [{ name: 'Busca Descontos' }],
  openGraph: {
    title: 'Busca Descontos | Compare Preços e Pague Menos',
    description:
      'Compare ofertas em mais de 40.000 produtos nas maiores lojas do Brasil. Economize tempo e dinheiro.',
    url: 'https://buscadescontos.com.br',
    siteName: 'Busca Descontos',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busca Descontos | Compare Preços no Brasil',
    description: 'Encontre o menor preço em lojas parceiras verificadas.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-bg text-navy antialiased">
        <Header />
        
        {/* Banner Global de Transparência de Afiliados */}
        <div className="bg-white border-b border-brand-border py-2 px-4">
          <div className="max-w-7xl mx-auto">
            <AffiliateNotice />
          </div>
        </div>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
