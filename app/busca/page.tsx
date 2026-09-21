'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { buscarProdutos, obterLojasEMarcas } from '@/lib/produtos';
import { SearchBar } from '@/components/SearchBar';
import { SkeletonCard } from '@/components/SkeletonCard';
import { BuscaConteudo } from './BuscaConteudo';
import { Produto } from '@/lib/types';

function BuscaPageInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;
  const categoria = searchParams.get('categoria') || undefined;
  const marca = searchParams.get('marca') || undefined;
  const loja = searchParams.get('loja') || undefined;
  const minPreco = searchParams.get('minPreco') ? Number(searchParams.get('minPreco')) : undefined;
  const maxPreco = searchParams.get('maxPreco') ? Number(searchParams.get('maxPreco')) : undefined;
  const ordem = (searchParams.get('ordem') as any) || undefined;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [lojas, setLojas] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      const filtros = { termo: q, categoria, marca, loja, precoMin: minPreco, precoMax: maxPreco, ordem };
      const prods = await buscarProdutos(filtros);
      const { marcas: m, lojas: l } = await obterLojasEMarcas();
      setProdutos(prods);
      setMarcas(m);
      setLojas(l);
      setCarregando(false);
    }
    carregar();
  }, [q, categoria, marca, loja, minPreco, maxPreco, ordem]);

  if (carregando) {
    return <LoadingGrid />;
  }

  return (
    <BuscaConteudo
      produtos={produtos}
      marcas={marcas}
      lojas={lojas}
      termoBusca={q}
      filtrosAtivos={{ termo: q, categoria, marca, loja, precoMin: minPreco, precoMax: maxPreco, ordem }}
    />
  );
}

export default function BuscaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-border shadow-soft">
        <Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse rounded-xl" />}>
          <SearchBarWithParams />
        </Suspense>
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <BuscaPageInner />
      </Suspense>
    </div>
  );
}

function SearchBarWithParams() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  return <SearchBar size="normal" initialQuery={q} placeholder="Buscar outro produto..." />;
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
