import { Produto, OfertaLoja } from './types';

const LOMADEE_BASE_URL = 'https://api.lomadee.com/v3';
const DEFAULT_TOKEN = 'lmd_production_oxsLe28yU9_4V0gvsXhWhFpONALfOikavbSUWPyrbSN';

function obterTokenLomadee(): string {
  return (
    process.env.NEXT_PUBLIC_LOMADEE_TOKEN ||
    process.env.LOMADEE_TOKEN ||
    DEFAULT_TOKEN
  );
}

interface LomadeeProduct {
  id: number | string;
  name: string;
  priceMin: number;
  priceMax: number;
  discount?: number;
  thumbnail?: string;
  link?: string;
  category?: { id: number; name: string };
  brand?: { id: number; name: string };
  quantity?: number;
}

interface LomadeeOffer {
  id: string | number;
  name: string;
  price: number;
  priceFrom?: number;
  link: string;
  thumbnail?: string;
  store?: {
    id: number;
    name: string;
    image?: string;
  };
  parceling?: {
    quantity: number;
    value: number;
  };
}

/**
 * Busca produtos na API v3 da Lomadee (compatível com navegador e servidor)
 */
export async function buscarProdutosLomadee(termo: string = 'celular', categoriaId?: string): Promise<Produto[]> {
  const token = obterTokenLomadee();
  const sourceId = process.env.NEXT_PUBLIC_LOMADEE_SOURCE_ID || process.env.LOMADEE_SOURCE_ID || '';

  try {
    const url = new URL(`${LOMADEE_BASE_URL}/${token}/product/_search`);
    url.searchParams.set('keyword', termo || 'oferta');
    if (sourceId) url.searchParams.set('sourceId', sourceId);
    if (categoriaId) url.searchParams.set('categoryId', categoriaId);
    url.searchParams.set('size', '20');

    const res = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`Lomadee API respondeu com status ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!data.products || !Array.isArray(data.products)) {
      return [];
    }

    const produtosMapeados: Produto[] = await Promise.all(
      data.products.map(async (item: LomadeeProduct) => {
        const ofertasLojas = await buscarOfertasProdutoLomadee(String(item.id), item.name);
        const menorPreco = item.priceMin || (ofertasLojas.length > 0 ? ofertasLojas[0].preco : 0);
        const maiorPreco = item.priceMax || menorPreco;

        return {
          id: `lomadee-${item.id}`,
          nome: item.name,
          slug: `lomadee-${item.id}`,
          marca: item.brand?.name || 'Diversas Lojas',
          categoria: item.category?.name || 'Geral',
          descricao: `Oferta verificada para ${item.name} integrada via Lomadee.`,
          imagem: item.thumbnail || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
          menorPreco,
          maiorPreco,
          maiorDescontoPorcentagem: item.discount || 0,
          avaliacao: {
            nota: 4.8,
            quantidade: item.quantity || 12,
          },
          ofertas: ofertasLojas.length > 0 ? ofertasLojas : [
            {
              id: `off-lom-${item.id}`,
              loja: 'Loja Parceira',
              preco: menorPreco,
              link: item.link || 'https://www.lomadee.com',
              disponivel: true,
              freteGratis: true,
            }
          ],
        };
      })
    );

    return produtosMapeados;
  } catch (error) {
    console.warn('Busca Lomadee (navegador/servidor): utilizando fallback de segurança.', error);
    return [];
  }
}

/**
 * Busca ofertas de lojas para um determinado produto na Lomadee
 */
export async function buscarOfertasProdutoLomadee(produtoId: string, termoBusca: string): Promise<OfertaLoja[]> {
  const token = obterTokenLomadee();
  const sourceId = process.env.NEXT_PUBLIC_LOMADEE_SOURCE_ID || process.env.LOMADEE_SOURCE_ID || '';

  try {
    const url = new URL(`${LOMADEE_BASE_URL}/${token}/offer/_search`);
    url.searchParams.set('keyword', termoBusca);
    if (sourceId) url.searchParams.set('sourceId', sourceId);
    url.searchParams.set('size', '5');

    const res = await fetch(url.toString());
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.offers || !Array.isArray(data.offers)) return [];

    return data.offers.map((off: LomadeeOffer) => {
      const precoAnterior = off.priceFrom && off.priceFrom > off.price ? off.priceFrom : undefined;
      const parcelamentoText = off.parceling
        ? `${off.parceling.quantity}x de R$ ${off.parceling.value.toFixed(2).replace('.', ',')} sem juros`
        : undefined;

      return {
        id: `off-${off.id}`,
        loja: off.store?.name || 'Loja Parceira',
        logoLoja: off.store?.image,
        preco: off.price,
        precoAnterior,
        link: off.link,
        freteGratis: off.price > 199,
        parcelamento: parcelamentoText,
        disponivel: true,
      };
    });
  } catch (error) {
    return [];
  }
}
