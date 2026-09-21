'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, ChevronRight, Tag } from 'lucide-react';
import { PRODUTOS } from '@/lib/produtos';
import { formatarMoeda } from '@/lib/utils';
import Image from 'next/image';

interface SearchBarProps {
  placeholder?: string;
  size?: 'large' | 'normal';
  initialQuery?: string;
}

const SUGESTOES_POPULARES = ['iPhone', 'Air Fryer', 'Smart TV', 'Tênis', 'PlayStation 5', 'MacBook'];

export function SearchBar({
  placeholder = 'O que você quer comprar hoje? Ex: iPhone, Air Fryer, Smart TV...',
  size = 'large',
  initialQuery = '',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof PRODUTOS>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Atualiza sugestões conforme o usuário digita
  useEffect(() => {
    if (query.trim().length >= 2) {
      const qLower = query.toLowerCase().trim();
      const filtrados = PRODUTOS.filter(
        (p) =>
          p.nome.toLowerCase().includes(qLower) ||
          p.marca.toLowerCase().includes(qLower) ||
          p.categoria.toLowerCase().includes(qLower)
      ).slice(0, 5); // Limita a 5 sugestões instantâneas

      setSuggestions(filtrados);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (productSlug: string) => {
    setIsOpen(false);
    router.push(`/produto/${productSlug}`);
  };

  const handleChipClick = (termo: string) => {
    setQuery(termo);
    router.push(`/busca?q=${encodeURIComponent(termo)}`);
  };

  const isLarge = size === 'large';

  return (
    <div className="w-full max-w-3xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div
          className={`relative flex items-center bg-white rounded-2xl border-2 transition-all duration-300 shadow-soft hover:shadow-hover ${
            isOpen ? 'border-brand-green ring-4 ring-brand-green/15 rounded-b-none' : 'border-gray-200 focus-within:border-brand-green focus-within:ring-4 focus-within:ring-brand-green/15'
          }`}
        >
          {/* Ícone de Busca */}
          <div className="pl-4 sm:pl-6 text-brand-muted pointer-events-none">
            <Search className={isLarge ? 'w-6 h-6 text-navy-800' : 'w-5 h-5 text-navy-800'} />
          </div>

          {/* Campo de Texto */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            className={`w-full bg-transparent text-navy font-medium placeholder-gray-400 border-0 focus:outline-none focus:ring-0 ${
              isLarge ? 'py-4 sm:py-5 px-3 sm:px-4 text-base sm:text-lg' : 'py-3 px-3 text-sm sm:text-base'
            }`}
          />

          {/* Botão de Limpar */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-navy mr-2 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Botão de Pesquisar Verde */}
          <div className="pr-2 sm:pr-3">
            <button
              type="submit"
              className={`flex items-center justify-center bg-brand-green hover:bg-brand-green-hover text-white font-bold rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98] ${
                isLarge ? 'px-5 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg' : 'px-4 py-2.5 text-sm'
              }`}
            >
              <span>Buscar</span>
            </button>
          </div>
        </div>

        {/* Autocomplete Dropdown de Sugestões em Tempo Real */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-white rounded-b-2xl border-x-2 border-b-2 border-brand-green shadow-xl z-50 overflow-hidden animate-in fade-in-50 duration-150">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-brand-muted font-semibold">
              <span>Sugestões de Produtos</span>
              <span>{suggestions.length} encontrados</span>
            </div>
            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {suggestions.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectSuggestion(item.slug)}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50/60 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative bg-gray-50 rounded-lg p-1 border border-gray-200 shrink-0 overflow-hidden">
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{item.marca}</p>
                        <p className="text-sm font-medium text-navy group-hover:text-brand-green line-clamp-1">
                          {item.nome}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-brand-muted">Menor preço</p>
                      <p className="text-sm font-bold text-brand-green">
                        {formatarMoeda(item.menorPreco)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-green transition-colors"
              >
                <span>Ver todos os resultados para "{query}"</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Sugestões Populares em Chips */}
      {isLarge && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="flex items-center gap-1 font-semibold text-navy-800">
            <TrendingUp className="w-4 h-4 text-brand-orange" />
            Mais buscados:
          </span>
          {SUGESTOES_POPULARES.map((termo) => (
            <button
              key={termo}
              onClick={() => handleChipClick(termo)}
              className="px-3.5 py-1.5 bg-white hover:bg-brand-green hover:text-white border border-brand-border text-navy rounded-full transition-all duration-200 shadow-xs font-medium cursor-pointer"
            >
              {termo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
