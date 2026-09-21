'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIAS } from '@/lib/produtos';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  marcas: string[];
  lojas: string[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function FilterSidebar({
  marcas,
  lojas,
  isOpenMobile = false,
  onCloseMobile,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const termoAtual = searchParams.get('q') || '';
  const categoriaAtual = searchParams.get('categoria') || '';
  const marcaAtual = searchParams.get('marca') || '';
  const lojaAtual = searchParams.get('loja') || '';
  const minPrecoAtual = searchParams.get('minPreco') || '';
  const maxPrecoAtual = searchParams.get('maxPreco') || '';
  const ordemAtual = searchParams.get('ordem') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'todas') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/busca?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (termoAtual) params.set('q', termoAtual);
    router.push(`/busca?${params.toString()}`);
  };

  const hasActiveFilters =
    categoriaAtual || marcaAtual || lojaAtual || minPrecoAtual || maxPrecoAtual;

  const content = (
    <div className="space-y-6">
      {/* Cabeçalho do Filtro */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2 font-bold text-navy font-display">
          <Filter className="w-5 h-5 text-brand-green" />
          <span>Filtrar Resultados</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-brand-orange hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        )}
      </div>

      {/* Categorias */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
          Categorias
        </h4>
        <div className="space-y-1.5 text-sm">
          <button
            onClick={() => updateFilters('categoria', 'todas')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium ${
              !categoriaAtual || categoriaAtual === 'todas'
                ? 'bg-brand-green text-white font-bold'
                : 'hover:bg-gray-100 text-navy'
            }`}
          >
            Todas as Categorias
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters('categoria', cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium truncate ${
                categoriaAtual === cat.slug
                  ? 'bg-brand-green text-white font-bold'
                  : 'hover:bg-gray-100 text-navy'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
          Faixa de Preço (R$)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Mínimo</label>
            <input
              type="number"
              placeholder="R$ 0"
              value={minPrecoAtual}
              onChange={(e) => updateFilters('minPreco', e.target.value)}
              className="w-full px-3 py-2 border border-brand-border rounded-xl text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-gray-50/50"
            />
          </div>
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">Máximo</label>
            <input
              type="number"
              placeholder="R$ 10.000"
              value={maxPrecoAtual}
              onChange={(e) => updateFilters('maxPreco', e.target.value)}
              className="w-full px-3 py-2 border border-brand-border rounded-xl text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-gray-50/50"
            />
          </div>
        </div>
      </div>

      {/* Lojas Parceiras */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
          Loja
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => updateFilters('loja', 'todas')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
              !lojaAtual || lojaAtual === 'todas'
                ? 'font-bold text-brand-green bg-emerald-50'
                : 'text-navy hover:bg-gray-50'
            }`}
          >
            Todas as Lojas
          </button>
          {lojas.map((lj) => (
            <button
              key={lj}
              onClick={() => updateFilters('loja', lj)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                lojaAtual.toLowerCase() === lj.toLowerCase()
                  ? 'font-bold text-brand-green bg-emerald-50'
                  : 'text-navy hover:bg-gray-50'
              }`}
            >
              {lj}
            </button>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
          Marca
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => updateFilters('marca', 'todas')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
              !marcaAtual || marcaAtual === 'todas'
                ? 'font-bold text-brand-green bg-emerald-50'
                : 'text-navy hover:bg-gray-50'
            }`}
          >
            Todas as Marcas
          </button>
          {marcas.map((mc) => (
            <button
              key={mc}
              onClick={() => updateFilters('marca', mc)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                marcaAtual.toLowerCase() === mc.toLowerCase()
                  ? 'font-bold text-brand-green bg-emerald-50'
                  : 'text-navy hover:bg-gray-50'
              }`}
            >
              {mc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-6 rounded-2xl border border-brand-border shadow-soft h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <span className="font-bold text-navy text-lg font-display">Filtros</span>
                <button
                  onClick={onCloseMobile}
                  className="p-2 rounded-xl text-gray-400 hover:text-navy hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-xl text-sm"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
