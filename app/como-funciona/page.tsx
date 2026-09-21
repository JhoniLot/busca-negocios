import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { Search, Scale, PiggyBank, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const metadata = {
  title: 'Como Funciona | Busca Descontos',
  description: 'Entenda como o Busca Descontos ajuda você a encontrar o menor preço em lojas virtuais do Brasil.',
};

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
          Como Funciona o Busca Descontos?
        </h1>
        <p className="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Nossa missão é simples: fazer você economizar dinheiro em todas as suas compras online, sem complicações e sem nenhum custo.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-soft space-y-10">
        {/* Passo 1 */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm font-display">
            1
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-navy font-display flex items-center gap-2">
              <Search className="w-5 h-5 text-brand-green" />
              1. Você pesquisa o produto desejado
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Utilize nossa barra de busca inteligente na página inicial ou no topo do site. Digite o nome do produto (como "iPhone 15", "Air Fryer" ou "Notebook"), marca ou categoria. Nosso sistema de busca inteligente apresenta sugestões instantâneas para agilizar sua busca.
            </p>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="flex flex-col sm:flex-row gap-6 items-start pt-6 border-t border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-brand-green text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm font-display">
            2
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-navy font-display flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-green" />
              2. Comparamos os preços nas maiores lojas
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Buscamos em tempo real os preços atuais em lojas parceiras de alta reputação, como Amazon, Mercado Livre, Magazine Luiza, Casas Bahia, Kabum e Fast Shop. Mostramos quem está cobrando mais barato, condições de parcelamento e frete grátis.
            </p>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="flex flex-col sm:flex-row gap-6 items-start pt-6 border-t border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm font-display">
            3
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-navy font-display flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-brand-orange" />
              3. Você clica e compra diretamente na loja
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Ao clicar no botão verde "Ver na loja", você é redirecionado em uma nova aba com segurança para o site oficial do vendedor, onde poderá concluir o pedido pelo preço promocional garantido.
            </p>
          </div>
        </div>
      </div>

      {/* Por que confiar? */}
      <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200/70 p-8 space-y-4">
        <h3 className="text-lg font-bold text-navy font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-green" />
          Por que usar o Busca Descontos?
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-navy">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>100% Gratuito para os consumidores</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>Apenas lojas oficiais e confiáveis</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>Sem anúncios poluidos ou pop-ups chatinhos</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>Informações claras de parcelamento e frete</span>
          </li>
        </ul>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green-hover text-white font-bold rounded-2xl transition-all duration-200 shadow-md"
        >
          <span>Experimente buscar um produto agora</span>
        </Link>
      </div>
    </div>
  );
}
