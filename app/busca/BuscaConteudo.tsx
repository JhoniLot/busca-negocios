'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Produto, FiltrosBusca } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Filter, SlidersHorizontal, SearchX, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

interface BuscaConteudoProps {
  produtos: Produto[];
  marcas: string[];
  lojas: string[];
  termoBusca?: string;
  filtrosAtivos: FiltrosBusca;
}

export function BuscaConteudo({
  produtos,
  marcas,
  lojas,
  termoBusca,
  filtrosAtivos,
}: BuscaConteudoProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleOrdenacaoChange = (ordem: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ordem', ordem);
    router.push(`/busca?${params.toString()}`);
  };

  const ordemAtual = searchParams.get('ordem') || 'relevancia';

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar de Filtros Desktop & Mobile */}
      <FilterSidebar
        marcas={marcas}
        lojas={lojas}
        isOpenMobile={mobileFilterOpen}
        onCloseMobile={() => setMobileFilterOpen(false)}
      />

      {/* Conteúdo Principal de Resultados */}
      <div className="flex-1 w-full space-y-6">
        {/* Barra Superior de Status e Ordenação */}
        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-navy font-display">
              {termoBusca ? (
                <>
                  Resultados para <span className="text-brand-green">"{termoBusca}"</span>
                </>
              ) : (
                'Todas as Ofertas Disponíveis'
              )}
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão de Filtro Mobile */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy font-semibold text-xs rounded-xl transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-green" />
              <span>Filtros</span>
            </button>

            {/* Select de Ordenação */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-brand-muted shrink-0 hidden sm:block" />
              <select
                value={ordemAtual}
                onChange={(e) => handleOrdenacaoChange(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-gray-50 hover:bg-white border border-brand-border rounded-xl text-xs font-semibold text-navy focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              >
                <option value="relevancia">Mais Relevantes</option>
                <option value="menor-preco">Menor Preço Primeiro</option>
                <option value="maior-preco">Maior Preço Primeiro</option>
                <option value="maior-desconto">Maior % de Desconto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estado Vazio Amigável */}
        {produtos.length === 0 ? (
          <div className="bg-white rounded-3xl border border-brand-border p-12 text-center shadow-soft my-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-brand-orange mx-auto flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-navy font-display mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
              Não encontramos nenhum produto que corresponda à sua pesquisa ou filtros aplicados. Tente usar outras palavras-chave ou remover filtros de preço e loja.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/busca"
                className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Limpar Todos os Filtros
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy font-bold text-xs rounded-xl transition-colors"
              >
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        ) : (
          /* Grid de Produtos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto, index) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                isCheapestInCategory={index === 0 && ordemAtual === 'menor-preco'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
