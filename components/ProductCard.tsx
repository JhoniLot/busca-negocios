import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/lib/types';
import { formatarMoeda, obterOfertaMaisBarata } from '@/lib/utils';
import { ExternalLink, Star, Tag, Store } from 'lucide-react';

interface ProductCardProps {
  produto: Produto;
  isCheapestInCategory?: boolean;
}

export function ProductCard({ produto, isCheapestInCategory = false }: ProductCardProps) {
  const melhorOferta = obterOfertaMaisBarata(produto.ofertas);
  if (!melhorOferta) return null;

  const temDesconto = melhorOferta.precoAnterior && melhorOferta.precoAnterior > melhorOferta.preco;
  const porcentagemDesconto = produto.maiorDescontoPorcentagem;

  return (
    <div className="group relative bg-white rounded-2xl border border-brand-border hover:border-brand-green/40 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Selos no Topo */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-1 pointer-events-none">
        {/* Selo Menor Preço */}
        {isCheapestInCategory || produto.destaque ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-green text-white text-[11px] font-bold rounded-lg shadow-sm tracking-wide">
            <Tag className="w-3 h-3" />
            Menor Preço
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-navy/90 text-white text-[11px] font-semibold rounded-lg backdrop-blur-xs">
            {produto.ofertas.length} lojas
          </span>
        )}

        {/* Selo Porcentagem Desconto Laranja */}
        {porcentagemDesconto > 0 && (
          <span className="inline-flex items-center px-2 py-1 bg-brand-orange text-white text-[11px] font-extrabold rounded-lg shadow-sm">
            -{porcentagemDesconto}%
          </span>
        )}
      </div>

      {/* Imagem do Produto */}
      <Link href={`/produto/${produto.slug}`} className="relative w-full pt-[85%] bg-gray-50/60 p-6 flex items-center justify-center overflow-hidden block">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Conteúdo do Cartão */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Marca & Categoria */}
          <div className="flex items-center justify-between text-xs text-brand-muted mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-navy-800">{produto.marca}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{produto.avaliacao.nota.toFixed(1)}</span>
            </div>
          </div>

          {/* Nome do Produto */}
          <Link href={`/produto/${produto.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-navy group-hover:text-brand-green transition-colors line-clamp-2 leading-snug mb-3 font-display">
              {produto.nome}
            </h3>
          </Link>
        </div>

        <div>
          {/* Loja de Menor Preço */}
          <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-2">
            <Store className="w-3.5 h-3.5 text-navy-800" />
            <span>Vendida por <strong className="text-navy">{melhorOferta.loja}</strong></span>
          </div>

          {/* Preços */}
          <div className="mb-4">
            {temDesconto && (
              <span className="block text-xs text-gray-400 line-through">
                {formatarMoeda(melhorOferta.precoAnterior!)}
              </span>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
                {formatarMoeda(melhorOferta.preco)}
              </span>
            </div>
            {melhorOferta.parcelamento && (
              <span className="block text-[11px] text-emerald-700 font-medium mt-0.5">
                ou {melhorOferta.parcelamento}
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <Link
              href={`/produto/${produto.slug}`}
              className="w-full py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-navy font-semibold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Comparar ({produto.ofertas.length})</span>
            </Link>

            <a
              href={melhorOferta.link}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="w-full py-2.5 px-3 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95"
            >
              <span>Ver na loja</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
