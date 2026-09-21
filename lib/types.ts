export interface OfertaLoja {
  id: string;
  loja: string;
  logoLoja?: string;
  preco: number;
  precoAnterior?: number;
  link: string;
  freteGratis?: boolean;
  parcelamento?: string;
  cupom?: string;
  disponivel: boolean;
}

export interface Produto {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  marca: string;
  categoria: string;
  imagem: string;
  imagensGaleria?: string[];
  especificacoes?: Record<string, string>;
  ofertas: OfertaLoja[];
  destaque?: boolean;
  menorPreco: number;
  maiorPreco: number;
  maiorDescontoPorcentagem: number;
  avaliacao: {
    nota: number;
    quantidade: number;
  };
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  icone: string; // nome do icone lucide ou tag
  quantidadeProdutos?: number;
}

export interface FiltrosBusca {
  termo?: string;
  categoria?: string;
  marca?: string;
  loja?: string;
  precoMin?: number;
  precoMax?: number;
  ordem?: 'menor-preco' | 'maior-preco' | 'maior-desconto' | 'relevancia';
}
