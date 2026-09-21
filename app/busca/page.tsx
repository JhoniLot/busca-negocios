import React, { Suspense } from 'react';
import { buscarProdutos, obterLojasEMarcas } from '@/lib/produtos';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { SkeletonCard } from '@/components/SkeletonCard';
import { BuscaConteudo } from './BuscaConteudo';

interface BuscaPageProps {
  searchParams: {
    q?: string;
    categoria?: string;
    marca?: string;
    loja?: string;
    minPreco?: string;
    maxPreco?: string;
    ordem?: 'menor-preco' | 'maior-preco' | 'maior-desconto' | 'relevancia';
  };
}

export const metadata = {
  title: 'Resultados da Busca | Busca Descontos',
  description: 'Compare preços de milhares de produtos nas principais lojas do Brasil.',
};

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const { q, categoria, marca, loja, minPreco, maxPreco, ordem } = searchParams;

  const filtros = {
    termo: q,
    categoria,
    marca,
    loja,
    precoMin: minPreco ? Number(minPreco) : undefined,
    precoMax: maxPreco ? Number(maxPreco) : undefined,
    ordem,
  };

  const produtos = await buscarProdutos(filtros);
  const { marcas, lojas } = await obterLojasEMarcas();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Barra de Busca Secundária no Topo da Página de Busca */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-border shadow-soft">
        <SearchBar size="normal" initialQuery={q || ''} placeholder="Buscar outro produto..." />
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <BuscaConteudo
          produtos={produtos}
          marcas={marcas}
          lojas={lojas}
          termoBusca={q}
          filtrosAtivos={filtros}
        />
      </Suspense>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
