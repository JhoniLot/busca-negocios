import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIAS } from '@/lib/produtos';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Coluna 1: Marca & Apresentação */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              O <strong>Busca Descontos</strong> é o seu assistente inteligente de economia no Brasil.
              Comparamos preços em tempo real nas maiores lojas e marketplaces para garantir que você compre pelo menor valor com total segurança.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-green font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Plataforma 100% gratuita para os consumidores</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Principal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-display">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/busca" className="hover:text-brand-green transition-colors">
                  Buscar Ofertas
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-brand-green transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-brand-green transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias Principais */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-display">
              Categorias
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {CATEGORIAS.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/busca?categoria=${cat.slug}`}
                    className="hover:text-brand-green transition-colors"
                  >
                    {cat.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Legal & Transparência */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-display">
              Transparência
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/privacidade" className="hover:text-brand-green transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/aviso-afiliados" className="hover:text-brand-green transition-colors">
                  Aviso de Afiliados
                </Link>
              </li>
              <li>
                <a
                  href="https://www.lomadee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-green transition-colors text-xs text-gray-400"
                >
                  <span>Rede de Parceiros</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Aviso Legal de Afiliados no Rodapé */}
        <div className="py-6 border-b border-navy-800 text-xs text-gray-400 leading-relaxed">
          <p>
            <strong className="text-gray-300">Aviso de Isenção e Transparência:</strong> O Busca Descontos é um comparador de preços independente.
            Podemos receber uma comissão quando você clica nos links de compra e conclui um pedido nos sites parceiros (Amazon, Mercado Livre, Magalu, Casas Bahia, Kabum, Fast Shop, etc.).
            Essa remuneração não altera o preço final do produto para você. As ofertas e a disponibilidade dos produtos estão sujeitas a alterações sem aviso prévio pelas lojas de origem.
          </p>
        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Busca Descontos. Todos os direitos reservados. Feito para o Brasil.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Desenvolvido com excelência e foco no consumidor</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
