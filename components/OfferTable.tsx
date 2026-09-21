import React from 'react';
import { OfertaLoja } from '@/lib/types';
import { formatarMoeda } from '@/lib/utils';
import { ExternalLink, Truck, Tag, ShieldCheck } from 'lucide-react';

interface OfferTableProps {
  ofertas: OfertaLoja[];
  nomeProduto: string;
}

export function OfferTable({ ofertas }: OfferTableProps) {
  // Ordena ofertas do menor para o maior preço
  const ofertasOrdenadas = [...ofertas].sort((a, b) => a.preco - b.preco);
  const idMenorPreco = ofertasOrdenadas[0]?.id;

  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
      <div className="px-6 py-4 bg-gray-50/80 border-b border-brand-border flex items-center justify-between">
        <h3 className="text-base font-bold text-navy font-display flex items-center gap-2">
          <span>Comparativo de Lojas & Preços</span>
          <span className="text-xs font-normal text-brand-muted bg-gray-200/70 px-2.5 py-0.5 rounded-full">
            {ofertas.length} ofertas encontradas
          </span>
        </h3>
        <span className="hidden sm:flex items-center gap-1 text-xs text-brand-green font-medium">
          <ShieldCheck className="w-4 h-4" />
          Lojas parceiras verificadas
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {ofertasOrdenadas.map((oferta) => {
          const isMenor = oferta.id === idMenorPreco;

          return (
            <div
              key={oferta.id}
              className={`p-4 sm:p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isMenor ? 'bg-emerald-50/40 border-l-4 border-l-brand-green' : 'hover:bg-gray-50/60'
              }`}
            >
              {/* Loja e Informações */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center font-bold text-navy text-xs shrink-0 shadow-xs">
                  {oferta.loja}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy text-base">{oferta.loja}</span>
                    {isMenor && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-brand-green text-white px-2 py-0.5 rounded-md">
                        <Tag className="w-3 h-3" />
                        Menor Preço
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted mt-1">
                    {oferta.parcelamento && <span>{oferta.parcelamento}</span>}
                    {oferta.freteGratis && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">
                        <Truck className="w-3 h-3" />
                        Frete Grátis
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Preço e Botão de Compra */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  {oferta.precoAnterior && oferta.precoAnterior > oferta.preco && (
                    <span className="block text-xs text-gray-400 line-through">
                      {formatarMoeda(oferta.precoAnterior)}
                    </span>
                  )}
                  <span className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
                    {formatarMoeda(oferta.preco)}
                  </span>
                </div>

                <a
                  href={oferta.link}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 ${
                    isMenor
                      ? 'bg-brand-green hover:bg-brand-green-hover text-white ring-2 ring-brand-green/20'
                      : 'bg-navy hover:bg-navy-800 text-white'
                  }`}
                >
                  <span>Ver na loja</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
