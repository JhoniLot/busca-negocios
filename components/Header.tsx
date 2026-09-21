'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { Search, Menu, X, Tag, HelpCircle, Home, Grid } from 'lucide-react';
import { CATEGORIAS } from '@/lib/produtos';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const isHomePage = pathname === '/';

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchTerm.trim()) {
      router.push(`/busca?q=${encodeURIComponent(headerSearchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logotipo */}
          <Link href="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-green/30 rounded-lg">
            <Logo variant="dark" />
          </Link>

          {/* Barra de busca reduzida para páginas internas (quando não for a Home) */}
          {!isHomePage && (
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <form onSubmit={handleHeaderSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Pesquisar produto, marca ou loja..."
                  value={headerSearchTerm}
                  onChange={(e) => setHeaderSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-brand-border focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 rounded-xl text-sm transition-all duration-200"
                />
                <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>
          )}

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy">
            <Link
              href="/"
              className={`hover:text-brand-green transition-colors py-2 ${
                pathname === '/' ? 'text-brand-green font-semibold border-b-2 border-brand-green' : ''
              }`}
            >
              Início
            </Link>
            <Link
              href="/busca"
              className={`hover:text-brand-green transition-colors py-2 ${
                pathname === '/busca' ? 'text-brand-green font-semibold border-b-2 border-brand-green' : ''
              }`}
            >
              Todas as Ofertas
            </Link>
            <Link
              href="/como-funciona"
              className={`hover:text-brand-green transition-colors py-2 ${
                pathname === '/como-funciona' ? 'text-brand-green font-semibold border-b-2 border-brand-green' : ''
              }`}
            >
              Como Funciona
            </Link>
            <Link
              href="/sobre"
              className={`hover:text-brand-green transition-colors py-2 ${
                pathname === '/sobre' ? 'text-brand-green font-semibold border-b-2 border-brand-green' : ''
              }`}
            >
              Sobre Nós
            </Link>
          </nav>

          {/* Botão de Destaque / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/busca?ordem=maior-desconto"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-brand-orange font-semibold text-xs transition-colors border border-orange-200"
            >
              <Tag className="w-4 h-4" />
              <span>Maiores Descontos</span>
            </Link>
          </div>

          {/* Botão de Menu Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-navy hover:bg-gray-100 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {!isHomePage && (
            <form onSubmit={handleHeaderSearch} className="relative mt-2">
              <input
                type="text"
                placeholder="Pesquisar produto ou marca..."
                value={headerSearchTerm}
                onChange={(e) => setHeaderSearchTerm(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 bg-gray-50 border border-brand-border rounded-xl text-sm"
              />
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-green text-white text-xs font-semibold rounded-lg"
              >
                Buscar
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-navy">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-navy"
            >
              <Home className="w-4 h-4 text-brand-muted" />
              Início
            </Link>
            <Link
              href="/busca"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-navy"
            >
              <Grid className="w-4 h-4 text-brand-muted" />
              Ver Todas as Ofertas
            </Link>
            <Link
              href="/como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-navy"
            >
              <HelpCircle className="w-4 h-4 text-brand-muted" />
              Como Funciona
            </Link>
            <Link
              href="/busca?ordem=maior-desconto"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-50 text-brand-orange font-semibold"
            >
              <Tag className="w-4 h-4" />
              Maiores Descontos da Semana
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2 px-3">
              Categorias Populares
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIAS.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/busca?categoria=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-navy font-medium truncate"
                >
                  {cat.nome}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
