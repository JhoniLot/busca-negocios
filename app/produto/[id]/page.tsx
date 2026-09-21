import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarProdutoPorId, buscarProdutos } from '@/lib/produtos';
import { OfferTable } from '@/components/OfferTable';
import { ProductCard } from '@/components/ProductCard';
import { formatarMoeda, obterOfertaMaisBarata } from '@/lib/utils';
import { Metadata } from 'next';
import {
  ChevronRight,
  ShieldCheck,
  Star,
  Tag,
  ExternalLink,
  Store,
  Info,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface ProdutoPageProps {
  params: {
    id: string;
  };
}

// SEO Dinâmico por Produto
export async function generateMetadata({ params }: ProdutoPageProps): Promise<Metadata> {
  const produto = await buscarProdutoPorId(params.id);
  if (!produto) {
    return {
      title: 'Produto Não Encontrado | Busca Descontos',
    };
  }

  const melhorOferta = obterOfertaMaisBarata(produto.ofertas);

  return {
    title: `${produto.nome} - Menor preço a partir de ${formatarMoeda(
      melhorOferta?.preco || produto.menorPreco
    )} | Busca Descontos`,
    description: `Compare o preço de ${produto.nome} nas maiores lojas do Brasil. ${produto.descricao}`,
    openGraph: {
      title: `${produto.nome} - Menor Preço | Busca Descontos`,
      description: produto.descricao,
      images: [{ url: produto.imagem }],
    },
  };
}

export default async function ProdutoDetalhesPage({ params }: ProdutoPageProps) {
  const produto = await buscarProdutoPorId(params.id);

  if (!produto) {
    notFound();
  }

  const melhorOferta = obterOfertaMaisBarata(produto.ofertas);
  const produtosRelacionados = (await buscarProdutos({ categoria: produto.categoria }))
    .filter((p) => p.id !== produto.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-brand-muted font-medium overflow-x-auto pb-2">
        <Link href="/" className="hover:text-brand-green transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/busca" className="hover:text-brand-green transition-colors">
          Ofertas
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link
          href={`/busca?categoria=${produto.categoria}`}
          className="hover:text-brand-green transition-colors capitalize"
        >
          {produto.categoria}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-navy font-semibold truncate max-w-xs">{produto.nome}</span>
      </nav>

      {/* Seção Principal do Produto */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Foto Grande do Produto */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-square bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center overflow-hidden">
            {produto.destaque && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 px-3 py-1 bg-brand-green text-white text-xs font-bold rounded-lg shadow-sm">
                <Tag className="w-3.5 h-3.5" />
                Destaque
              </span>
            )}
            <Image
              src={produto.imagem}
              alt={produto.nome}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-6"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-muted mt-4">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Fotos reais fornecidas pelos parceiros</span>
          </div>
        </div>

        {/* Informações Resumidas e Destaque do Menor Preço */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Marca e Avaliação */}
            <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
              <span className="font-bold uppercase tracking-wider text-navy-800 bg-gray-100 px-2.5 py-1 rounded-md">
                {produto.marca}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{produto.avaliacao.nota.toFixed(1)}</span>
                <span className="text-gray-400 font-normal">({produto.avaliacao.quantidade} avaliações)</span>
              </div>
            </div>

            {/* Nome Completo */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-display leading-tight mb-4">
              {produto.nome}
            </h1>

            {/* Descrição Curta */}
            <p className="text-sm text-brand-muted leading-relaxed mb-6">{produto.descricao}</p>

            {/* Card de Destaque do Menor Preço Atual */}
            {melhorOferta && (
              <div className="p-6 bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-white rounded-2xl border border-emerald-200 shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <Tag className="w-4 h-4 text-brand-green" />
                    Menor preço hoje na {melhorOferta.loja}
                  </span>
                  {produto.maiorDescontoPorcentagem > 0 && (
                    <span className="px-2.5 py-1 bg-brand-orange text-white font-extrabold text-xs rounded-lg">
                      -{produto.maiorDescontoPorcentagem}% OFF
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                    {formatarMoeda(melhorOferta.preco)}
                  </span>
                  {melhorOferta.precoAnterior && (
                    <span className="text-base text-gray-400 line-through">
                      {formatarMoeda(melhorOferta.precoAnterior)}
                    </span>
                  )}
                </div>

                {melhorOferta.parcelamento && (
                  <p className="text-xs text-emerald-700 font-semibold mb-4">
                    {melhorOferta.parcelamento}
                  </p>
                )}

                <a
                  href={melhorOferta.link}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="w-full py-4 px-6 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-base rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-98"
                >
                  <span>Ver oferta na {melhorOferta.loja}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Vantagens adicionais */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-navy font-medium">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-green" />
              <span>{produto.ofertas.length} lojas comparadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-green" />
              <span>Opções com Frete Grátis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Comparação Completa de Ofertas por Loja */}
      <section>
        <OfferTable ofertas={produto.ofertas} nomeProduto={produto.nome} />
      </section>

      {/* Especificações Técnicas (se existirem) */}
      {produto.especificacoes && (
        <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-soft">
          <h3 className="text-xl font-bold text-navy font-display mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-green" />
            Especificações Técnicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {Object.entries(produto.especificacoes).map(([chave, valor]) => (
              <div
                key={chave}
                className="flex items-center justify-between py-2.5 border-b border-gray-100 text-xs sm:text-sm"
              >
                <span className="font-semibold text-brand-muted">{chave}</span>
                <span className="font-medium text-navy text-right max-w-xs">{valor}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Produtos Relacionados */}
      {produtosRelacionados.length > 0 && (
        <section className="pt-6">
          <h2 className="text-2xl font-extrabold text-navy font-display mb-6">
            Outros produtos parecidos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {produtosRelacionados.map((item) => (
              <ProductCard key={item.id} produto={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
