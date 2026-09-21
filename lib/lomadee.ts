import { Produto, OfertaLoja, FiltrosBusca } from './types';
import { calcularDesconto } from './utils';

const LOMADEE_BASE_URL = 'https://api.lomadee.com/v3';

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
 * Busca produtos na API v3 da Lomadee
 */
export async function buscarProdutosLomadee(termo: string = 'celular', categoriaId?: string): Promise<Produto[]> {
  const token = process.env.LOMADEE_TOKEN;
  const sourceId = process.env.LOMADEE_SOURCE_ID || '';

  if (!token || token === 'seu_token_aqui_123456') {
    return [];
  }

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
      next: { revalidate: 1800 }, // Cache de 30 minutos
    });

    if (!res.ok) {
      console.warn(`Lomadee API respondeu com status ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!data.products || !Array.isArray(data.products)) {
      return [];
    }

    // Mapeia resposta da Lomadee para o tipo Produto do Busca Descontos
    const produtosMapeados: Produto[] = await Promise.all(
      data.products.map(async (item: LomadeeProduct) => {
        // Busca ofertas das lojas para este produto específico na Lomadee
        const ofertasLojas = await buscarOfertasProdutoLomadee(String(item.id), item.name);

        const menorPreco = item.priceMin || (ofertasLojas.length > 0 ? ofertasLojas[0].preco : 0);
        const maiorPreco = item.priceMax || menorPreco;

        return {
          id: `lomadee-${item.id}`,
          nome: item.name,
          slug: `lomadee-${item.id}`,
          marca: item.brand?.name || 'Diversas Lojas',
          categoria: item.category?.name || 'Geral',
          descricao: `Ofertas encontradas para ${item.name} comparadas através da rede Lomadee.`,
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
    console.error('Erro ao integrar com API Lomadee:', error);
    return [];
  }
}

/**
 * Busca ofertas de lojas para um determinado produto na Lomadee
 */
export async function buscarOfertasProdutoLomadee(produtoId: string, termoBusca: string): Promise<OfertaLoja[]> {
  const token = process.env.LOMADEE_TOKEN;
  const sourceId = process.env.LOMADEE_SOURCE_ID || '';

  if (!token || token === 'seu_token_aqui_123456') {
    return [];
  }

  try {
    const url = new URL(`${LOMADEE_BASE_URL}/${token}/offer/_search`);
    url.searchParams.set('keyword', termoBusca);
    if (sourceId) url.searchParams.set('sourceId', sourceId);
    url.searchParams.set('size', '5');

    const res = await fetch(url.toString(), {
      next: { revalidate: 1800 },
    });

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
    console.error('Erro ao buscar ofertas Lomadee:', error);
    return [];
  }
}
