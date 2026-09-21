import React from 'react';
import Link from 'next/link';
import { CATEGORIAS } from '@/lib/produtos';
import {
  Smartphone,
  Headphones,
  Zap,
  Laptop,
  Gamepad2,
  Home,
  ShoppingBag,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const ICONES_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Headphones,
  Zap,
  Laptop,
  Gamepad2,
  Home,
  ShoppingBag,
  Sparkles,
};

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-display tracking-tight">
            Navegue por Categorias
          </h2>
          <p className="text-sm text-brand-muted mt-1">
            Encontre o que você precisa com os melhores preços do mercado
          </p>
        </div>
        <Link
          href="/busca"
          className="hidden sm:flex items-center gap-1 text-sm font-bold text-brand-navy hover:text-brand-green transition-colors"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIAS.map((cat) => {
          const IconComponent = ICONES_MAP[cat.icone] || Smartphone;

          return (
            <Link
              key={cat.id}
              href={`/busca?categoria=${cat.slug}`}
              className="group p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-green/50 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-navy group-hover:bg-brand-green group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-3 shadow-xs">
                <IconComponent className="w-7 h-7 transition-transform group-hover:scale-110 duration-300" />
              </div>

              <h3 className="font-bold text-navy group-hover:text-brand-green text-sm sm:text-base transition-colors font-display line-clamp-1">
                {cat.nome}
              </h3>
              <span className="text-xs text-brand-muted mt-1">Comparar ofertas</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
