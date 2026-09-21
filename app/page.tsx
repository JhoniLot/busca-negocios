import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductCard } from '@/components/ProductCard';
import { obterProdutosDestaque } from '@/lib/produtos';
import { Search, Scale, PiggyBank, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const revalidate = 3600; // SSG com ISR a cada 1 hora

export default async function HomePage() {
  const produtosDestaque = await obterProdutosDestaque(8);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION COM BUSCA DESTAQUE */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-white via-slate-50/70 to-brand-bg border-b border-brand-border overflow-hidden">
        {/* Elementos visuais decorativos de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/50 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge de Promessa da Marca */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs sm:text-sm font-bold mb-6 shadow-xs border border-emerald-200/60">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>O comparador de preços inteligente do Brasil</span>
          </div>

          {/* Título Principal Forte */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy font-display tracking-tight leading-[1.1] mb-6">
            Compare preços e <span className="text-brand-green underline decoration-brand-green/30">pague menos</span>.
          </h1>

          {/* Subtítulo Claro */}
          <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Pesquise qualquer produto e encontre o menor preço em lojas como Amazon, Mercado Livre, Magalu e Kabum lado a lado.
          </p>

          {/* BARRA DE BUSCA GRANDE (FOCO DA PÁGINA) */}
          <div className="mb-8">
            <SearchBar size="large" />
          </div>

          {/* Garantias rápidas */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-muted pt-2">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span>Preços Atualizados em Tempo Real</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Scale className="w-4 h-4 text-navy" />
              <span>Sem Preconceito de Lojas</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. COMO FUNCIONA EM 3 PASSOS SIMPLES */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-soft">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-display tracking-tight">
              Como funciona o Busca Descontos
            </h2>
            <p className="text-sm text-brand-muted mt-2">
              Economizar em suas compras online nunca foi tão simples e rápido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Passo 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-brand-green/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center font-extrabold text-xl mb-4 shadow-sm font-display">
                1
              </div>
              <h3 className="text-lg font-bold text-navy font-display mb-2 flex items-center gap-2">
                <Search className="w-5 h-5 text-brand-green" />
                Pesquise
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Digita o nome do produto que você deseja comprar na nossa barra de busca central.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-brand-green/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-brand-green text-white flex items-center justify-center font-extrabold text-xl mb-4 shadow-sm font-display">
                2
              </div>
              <h3 className="text-lg font-bold text-navy font-display mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5 text-brand-green" />
                Compare
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Veja o menor preço e compare as ofertas de várias lojas confiáveis lado a lado.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-brand-green/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center font-extrabold text-xl mb-4 shadow-sm font-display">
                3
              </div>
              <h3 className="text-lg font-bold text-navy font-display mb-2 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-brand-orange" />
                Economize
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Clique no botão "Ver na loja" e conclua a compra diretamente no site do parceiro com desconto.
              </p>
            </div>
          </div>
        </section>

        {/* 3. GRADE DE CATEGORIAS COM ÍCONES */}
        <CategoryGrid />

        {/* 4. OFERTAS EM DESTAQUE (8 PRODUTOS) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-display tracking-tight">
                Ofertas em Destaque
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Os produtos mais procurados com os maiores descontos da semana
              </p>
            </div>

            <Link
              href="/busca"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green hover:text-brand-green-hover transition-colors"
            >
              <span>Ver todos os {produtosDestaque.length} produtos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosDestaque.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
