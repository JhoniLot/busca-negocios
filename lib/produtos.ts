import { Produto, FiltrosBusca, Categoria, OfertaLoja } from './types';
import { calcularDesconto } from './utils';
import { buscarProdutosLomadee } from './lomadee';

// Lista de categorias do sistema
export const CATEGORIAS: Categoria[] = [
  { id: 'celulares', nome: 'Celulares & Smartphones', slug: 'celulares', icone: 'Smartphone' },
  { id: 'eletronicos', nome: 'Eletrônicos & Áudio', slug: 'eletronicos', icone: 'Headphones' },
  { id: 'eletrodomesticos', nome: 'Eletrodomésticos', slug: 'eletrodomesticos', icone: 'Zap' },
  { id: 'informatica', nome: 'Informática & Laptops', slug: 'informatica', icone: 'Laptop' },
  { id: 'games', nome: 'Games & Consoles', slug: 'games', icone: 'Gamepad2' },
  { id: 'casa-cozinha', nome: 'Casa & Cozinha', slug: 'casa-cozinha', icone: 'Home' },
  { id: 'moda-calcados', nome: 'Moda & Calçados', slug: 'moda-calcados', icone: 'ShoppingBag' },
  { id: 'beleza-saude', nome: 'Beleza & Cuidados', slug: 'beleza-saude', icone: 'Sparkles' },
];

// Base de Dados de Produtos Mockados
const PRODUTOS_BASE: Omit<Produto, 'menorPreco' | 'maiorPreco' | 'maiorDescontoPorcentagem'>[] = [
  {
    id: 'iphone-15-pro-128gb',
    nome: 'Apple iPhone 15 Pro (128 GB) Titanium Natural',
    slug: 'apple-iphone-15-pro-128gb',
    marca: 'Apple',
    categoria: 'celulares',
    descricao: 'O iPhone 15 Pro possui design em titânio de grau aeroespacial, chip A17 Pro revolucionário, botão de Ação personalizável e o sistema de câmera mais potente em um iPhone.',
    imagem: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 382 },
    especificacoes: {
      Tela: 'Super Retina XDR OLED de 6.1 polegadas ProMotion 120Hz',
      Processador: 'Apple A17 Pro (3nm)',
      Câmera: 'Tripla 48 MP + 12 MP + 12 MP com zoom óptico de 3x',
    },
    ofertas: [
      { id: 'off-1', loja: 'Amazon', preco: 6999.00, precoAnterior: 7999.00, link: 'https://www.amazon.com.br/dp/B0CHWT4DGB', freteGratis: true, parcelamento: '10x de R$ 699,90 sem juros', disponivel: true },
      { id: 'off-2', loja: 'Mercado Livre', preco: 6849.00, precoAnterior: 7899.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, parcelamento: '12x de R$ 570,75 sem juros', disponivel: true },
      { id: 'off-3', loja: 'Magalu', preco: 7199.00, precoAnterior: 7999.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, parcelamento: '10x de R$ 719,90 sem juros', disponivel: true },
    ],
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    nome: 'Samsung Galaxy S24 Ultra 512GB Titânio Cinza',
    slug: 'samsung-galaxy-s24-ultra',
    marca: 'Samsung',
    categoria: 'celulares',
    descricao: 'Galaxy S24 Ultra com Galaxy AI para tradução simultânea, assistente de notas, tela plana Dynamic AMOLED 2X de 6.8", caneta S Pen integrada e câmera de 200MP.',
    imagem: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.8, quantidade: 215 },
    ofertas: [
      { id: 's24-1', loja: 'Mercado Livre', preco: 6299.10, precoAnterior: 7499.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, parcelamento: '10x de R$ 629,91 sem juros', disponivel: true },
      { id: 's24-2', loja: 'Amazon', preco: 6499.00, precoAnterior: 7499.00, link: 'https://www.amazon.com.br', freteGratis: true, parcelamento: '10x de R$ 649,90 sem juros', disponivel: true },
    ],
  },
  {
    id: 'air-fryer-philips-walita-ri9200',
    nome: 'Fritadeira Elétrica Air Fryer Philips Walita XL 4.1L 1400W',
    slug: 'air-fryer-philips-walita-ri9200',
    marca: 'Philips Walita',
    categoria: 'casa-cozinha',
    descricao: 'Tecnologia RapidAir exclusiva em formato de estrela para alimentos crocantes por fora e macios por dentro usando 90% menos gordura.',
    imagem: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 610 },
    ofertas: [
      { id: 'af-1', loja: 'Amazon', preco: 379.90, precoAnterior: 499.00, link: 'https://www.amazon.com.br', freteGratis: true, parcelamento: '6x de R$ 63,33 sem juros', disponivel: true },
      { id: 'af-2', loja: 'Magalu', preco: 399.00, precoAnterior: 499.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, parcelamento: '5x de R$ 79,80 sem juros', disponivel: true },
    ],
  },
  {
    id: 'macbook-air-m3-15',
    nome: 'Notebook Apple MacBook Air 15" M3 (8GB RAM, 256GB SSD) Cinza Espacial',
    slug: 'macbook-air-m3-15',
    marca: 'Apple',
    categoria: 'informatica',
    descricao: 'Fino, leve e absurdamente rápido com o chip M3. Tela Liquid Retina brilhante de 15.3 polegadas e até 18 horas de autonomia de bateria.',
    imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 145 },
    ofertas: [
      { id: 'mac-1', loja: 'Amazon', preco: 10499.00, precoAnterior: 12999.00, link: 'https://www.amazon.com.br', freteGratis: true, parcelamento: '10x de R$ 1.049,90 sem juros', disponivel: true },
      { id: 'mac-2', loja: 'Mercado Livre', preco: 10290.00, precoAnterior: 12500.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, parcelamento: '12x de R$ 857,50 sem juros', disponivel: true },
    ],
  },
  {
    id: 'playstation-5-slim-1tb',
    nome: 'Console PlayStation 5 Slim Edição Digital 1TB SSD + 2 Jogos',
    slug: 'playstation-5-slim-1tb',
    marca: 'Sony',
    categoria: 'games',
    descricao: 'Explore mundos com novos níveis de realismo graças ao Ray Tracing, SSD ultrarrápido de 1TB, áudio 3D e resposta tátil do controle DualSense.',
    imagem: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 890 },
    ofertas: [
      { id: 'ps5-1', loja: 'Kabum', preco: 3499.00, precoAnterior: 4299.00, link: 'https://www.kabum.com.br', freteGratis: true, parcelamento: '10x de R$ 349,90 sem juros', disponivel: true },
      { id: 'ps5-2', loja: 'Amazon', preco: 3590.00, precoAnterior: 4299.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
];

export const PRODUTOS: Produto[] = PRODUTOS_BASE.map((item) => {
  const precos = item.ofertas.map((o) => o.preco);
  const menorPreco = Math.min(...precos);
  const maiorPreco = Math.max(...precos);

  let maiorDesconto = 0;
  item.ofertas.forEach((o) => {
    if (o.precoAnterior && o.precoAnterior > o.preco) {
      const desc = calcularDesconto(o.preco, o.precoAnterior);
      if (desc > maiorDesconto) maiorDesconto = desc;
    }
  });

  return {
    ...item,
    menorPreco,
    maiorPreco,
    maiorDescontoPorcentagem: maiorDesconto,
  };
});

/**
 * BUSCA DE PRODUTOS COMPATÍVEL COM GITHUB PAGES E API LOMADEE
 */
export async function buscarProdutos(filtros: FiltrosBusca = {}): Promise<Produto[]> {
  const { termo, categoria, marca, loja, precoMin, precoMax, ordem } = filtros;

  // 1. TENTA BUSCAR RESULTADOS EM TEMPO REAL DA LOMADEE
  try {
    const resultadosLomadee = await buscarProdutosLomadee(termo || 'oferta', categoria);
    if (resultadosLomadee && resultadosLomadee.length > 0) {
      let filtrados = [...resultadosLomadee];
      if (precoMin !== undefined) filtrados = filtrados.filter((p) => p.menorPreco >= precoMin);
      if (precoMax !== undefined) filtrados = filtrados.filter((p) => p.menorPreco <= precoMax);
      if (ordem === 'menor-preco') filtrados.sort((a, b) => a.menorPreco - b.menorPreco);
      if (ordem === 'maior-preco') filtrados.sort((a, b) => b.menorPreco - a.menorPreco);
      if (ordem === 'maior-desconto') filtrados.sort((a, b) => b.maiorDescontoPorcentagem - a.maiorDescontoPorcentagem);
      return filtrados;
    }
  } catch (err) {
    console.warn('Busca Lomadee indisponível, chaveando para catálogo padrão', err);
  }

  // 2. FALLBACK SEGURO PARA BASE LOCAL DE MOCK
  let resultado = [...PRODUTOS];

  if (termo && termo.trim() !== '') {
    const termoLower = termo.toLowerCase().trim();
    resultado = resultado.filter(
      (p) =>
        p.nome.toLowerCase().includes(termoLower) ||
        p.marca.toLowerCase().includes(termoLower) ||
        p.categoria.toLowerCase().includes(termoLower) ||
        p.descricao.toLowerCase().includes(termoLower)
    );
  }

  if (categoria && categoria !== 'todas') {
    const catLower = categoria.toLowerCase();
    resultado = resultado.filter(
      (p) => p.categoria.toLowerCase() === catLower || p.slug.toLowerCase().includes(catLower)
    );
  }

  if (marca && marca !== 'todas') {
    const marcaLower = marca.toLowerCase();
    resultado = resultado.filter((p) => p.marca.toLowerCase() === marcaLower);
  }

  if (loja && loja !== 'todas') {
    resultado = resultado.filter((p) =>
      p.ofertas.some((o) => o.loja.toLowerCase() === loja.toLowerCase() && o.disponivel)
    );
  }

  if (precoMin !== undefined && !isNaN(precoMin)) {
    resultado = resultado.filter((p) => p.menorPreco >= precoMin);
  }
  if (precoMax !== undefined && !isNaN(precoMax)) {
    resultado = resultado.filter((p) => p.menorPreco <= precoMax);
  }

  if (ordem) {
    switch (ordem) {
      case 'menor-preco':
        resultado.sort((a, b) => a.menorPreco - b.menorPreco);
        break;
      case 'maior-preco':
        resultado.sort((a, b) => b.menorPreco - a.menorPreco);
        break;
      case 'maior-desconto':
        resultado.sort((a, b) => b.maiorDescontoPorcentagem - a.maiorDescontoPorcentagem);
        break;
      case 'relevancia':
      default:
        resultado.sort((a, b) => b.avaliacao.nota - a.avaliacao.nota);
        break;
    }
  }

  return resultado;
}

export async function buscarProdutoPorId(idOuSlug: string): Promise<Produto | null> {
  const produto = PRODUTOS.find((p) => p.id === idOuSlug || p.slug === idOuSlug);
  return produto || null;
}

export async function obterProdutosDestaque(limite: number = 8): Promise<Produto[]> {
  const destaques = PRODUTOS.filter((p) => p.destaque);
  return destaques.slice(0, limite);
}

export async function obterLojasEMarcas() {
  const marcasSet = new Set<string>();
  const lojasSet = new Set<string>();

  PRODUTOS.forEach((p) => {
    marcasSet.add(p.marca);
    p.ofertas.forEach((o) => {
      lojasSet.add(o.loja);
    });
  });

  return {
    marcas: Array.from(marcasSet).sort(),
    lojas: Array.from(lojasSet).sort(),
  };
}
