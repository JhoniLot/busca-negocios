import { Produto, FiltrosBusca, Categoria, OfertaLoja } from './types';
import { calcularDesconto } from './utils';

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

// Base de Dados de Produtos (40+ Itens com ofertas em múltiplas lojas)
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
      Bateria: 'Até 23 horas de reprodução de vídeo',
      Conectividade: 'USB-C 3.0, 5G, Wi-Fi 6E, Bluetooth 5.3',
    },
    ofertas: [
      {
        id: 'off-1',
        loja: 'Amazon',
        preco: 6999.00,
        precoAnterior: 7999.00,
        link: 'https://www.amazon.com.br/dp/B0CHWT4DGB',
        freteGratis: true,
        parcelamento: '10x de R$ 699,90 sem juros',
        disponivel: true,
      },
      {
        id: 'off-2',
        loja: 'Mercado Livre',
        preco: 6849.00,
        precoAnterior: 7899.00,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '12x de R$ 570,75 sem juros',
        disponivel: true,
      },
      {
        id: 'off-3',
        loja: 'Magalu',
        preco: 7199.00,
        precoAnterior: 7999.00,
        link: 'https://www.magazineluiza.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 719,90 sem juros',
        disponivel: true,
      },
      {
        id: 'off-4',
        loja: 'Fast Shop',
        preco: 7090.00,
        precoAnterior: 7999.00,
        link: 'https://www.fastshop.com.br',
        freteGratis: false,
        parcelamento: '10x de R$ 709,00 sem juros',
        disponivel: true,
      },
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
    especificacoes: {
      Tela: 'Dynamic AMOLED 2X 6.8" Quad HD+ 120Hz',
      Processador: 'Snapdragon 8 Gen 3 for Galaxy',
      Câmera: '200 MP + 50 MP (5x) + 12 MP + 10 MP (3x)',
      Bateria: '5000 mAh com carregamento rápido de 45W',
    },
    ofertas: [
      {
        id: 's24-1',
        loja: 'Mercado Livre',
        preco: 6299.10,
        precoAnterior: 7499.00,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 629,91 sem juros',
        disponivel: true,
      },
      {
        id: 's24-2',
        loja: 'Amazon',
        preco: 6499.00,
        precoAnterior: 7499.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 649,90 sem juros',
        disponivel: true,
      },
      {
        id: 's24-3',
        loja: 'Casas Bahia',
        preco: 6599.00,
        precoAnterior: 7699.00,
        link: 'https://www.casasbahia.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 659,90 sem juros',
        disponivel: true,
      },
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
    especificacoes: {
      Capacidade: '4.1 Litros',
      Potência: '1400 W',
      Controle: 'Analógico de temperatura (80°C a 200°C) e Timer 60 min',
      Garantia: '2 anos de garantia oficial Philips',
    },
    ofertas: [
      {
        id: 'af-1',
        loja: 'Amazon',
        preco: 379.90,
        precoAnterior: 499.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '6x de R$ 63,33 sem juros',
        disponivel: true,
      },
      {
        id: 'af-2',
        loja: 'Magalu',
        preco: 399.00,
        precoAnterior: 499.00,
        link: 'https://www.magazineluiza.com.br',
        freteGratis: true,
        parcelamento: '5x de R$ 79,80 sem juros',
        disponivel: true,
      },
      {
        id: 'af-3',
        loja: 'Casas Bahia',
        preco: 419.90,
        precoAnterior: 529.00,
        link: 'https://www.casasbahia.com.br',
        freteGratis: false,
        parcelamento: '4x de R$ 104,97 sem juros',
        disponivel: true,
      },
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
    especificacoes: {
      Processador: 'Apple M3 (CPU 8-core, GPU 10-core)',
      Memória: '8 GB de memória unificada',
      Armazenamento: '256 GB SSD ultrarrápido',
      Tela: '15.3" Liquid Retina com True Tone',
    },
    ofertas: [
      {
        id: 'mac-1',
        loja: 'Amazon',
        preco: 10499.00,
        precoAnterior: 12999.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 1.049,90 sem juros',
        disponivel: true,
      },
      {
        id: 'mac-2',
        loja: 'Mercado Livre',
        preco: 10290.00,
        precoAnterior: 12500.00,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '12x de R$ 857,50 sem juros',
        disponivel: true,
      },
      {
        id: 'mac-3',
        loja: 'Fast Shop',
        preco: 10799.00,
        precoAnterior: 12999.00,
        link: 'https://www.fastshop.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 1.079,90 sem juros',
        disponivel: true,
      },
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
    especificacoes: {
      Armazenamento: '1 TB SSD PCIe Gen 4',
      Resolução: 'Até 4K 120Hz com HDR',
      Controle: 'DualSense Wireless com gatilhos adaptáveis',
    },
    ofertas: [
      {
        id: 'ps5-1',
        loja: 'Kabum',
        preco: 3499.00,
        precoAnterior: 4299.00,
        link: 'https://www.kabum.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 349,90 sem juros',
        disponivel: true,
      },
      {
        id: 'ps5-2',
        loja: 'Amazon',
        preco: 3590.00,
        precoAnterior: 4299.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 359,00 sem juros',
        disponivel: true,
      },
      {
        id: 'ps5-3',
        loja: 'Mercado Livre',
        preco: 3450.00,
        precoAnterior: 4199.00,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 345,00 sem juros',
        disponivel: true,
      },
    ],
  },
  {
    id: 'fone-sony-wh-1000xm5',
    nome: 'Headphone Bluetooth Sony WH-1000XM5 com Cancelamento de Ruído',
    slug: 'headphone-sony-wh-1000xm5',
    marca: 'Sony',
    categoria: 'eletronicos',
    descricao: 'O padrão da indústria em cancelamento de ruído com dois processadores e oito microfones. Chamadas nítidas com captação de voz precisa.',
    imagem: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.8, quantidade: 310 },
    especificacoes: {
      Bateria: 'Até 30 horas com ANC ligado',
      Conexão: 'Bluetooth 5.2, Conexão multiponto',
      Recursos: 'High-Resolution Audio, LDAC, Speak-to-Chat',
    },
    ofertas: [
      {
        id: 'sony-1',
        loja: 'Amazon',
        preco: 2199.00,
        precoAnterior: 2799.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 219,90 sem juros',
        disponivel: true,
      },
      {
        id: 'sony-2',
        loja: 'Mercado Livre',
        preco: 2150.00,
        precoAnterior: 2699.00,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '12x de R$ 179,16 sem juros',
        disponivel: true,
      },
      {
        id: 'sony-3',
        loja: 'Fast Shop',
        preco: 2399.00,
        precoAnterior: 2899.00,
        link: 'https://www.fastshop.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 239,90 sem juros',
        disponivel: true,
      },
    ],
  },
  {
    id: 'tenis-nike-air-force-1-07',
    nome: 'Tênis Nike Air Force 1 \'07 Masculino Branco',
    slug: 'tenis-nike-air-force-1-07',
    marca: 'Nike',
    categoria: 'moda-calcados',
    descricao: 'O brilho vive no Nike Air Force 1 \'07, o ícone do basquete que dá um toque moderno ao que você conhece bem: sobreposições costuradas e amortecimento Air.',
    imagem: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 1420 },
    especificacoes: {
      Material: 'Couro legítimo e sintético',
      Amortecimento: 'Unidade Nike Air no calcanhar',
      Solado: 'Borracha com ponto de rotação clássico',
    },
    ofertas: [
      {
        id: 'af1-1',
        loja: 'Amazon',
        preco: 699.90,
        precoAnterior: 899.90,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 69,99 sem juros',
        disponivel: true,
      },
      {
        id: 'af1-2',
        loja: 'Mercado Livre',
        preco: 679.00,
        precoAnterior: 899.90,
        link: 'https://www.mercadolivre.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 67,90 sem juros',
        disponivel: true,
      },
    ],
  },
  {
    id: 'secador-dyson-supersonic',
    nome: 'Secador de Cabelo Dyson Supersonic HD07 Níquel e Cobre',
    slug: 'secador-dyson-supersonic',
    marca: 'Dyson',
    categoria: 'beleza-saude',
    descricao: 'Secagem rápida sem calor extremo. Projetado para cuidar dos cabelos e do couro cabeludo com controle inteligente de temperatura.',
    imagem: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 98 },
    especificacoes: {
      Motor: 'Digital Dyson V9 (110.000 rpm)',
      Acessórios: '5 bicos magnéticos incluídos',
      Tecnologia: 'Íons negativos e controle de calor',
    },
    ofertas: [
      {
        id: 'dyson-1',
        loja: 'Amazon',
        preco: 3199.00,
        precoAnterior: 3799.00,
        link: 'https://www.amazon.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 319,90 sem juros',
        disponivel: true,
      },
      {
        id: 'dyson-2',
        loja: 'Fast Shop',
        preco: 3290.00,
        precoAnterior: 3899.00,
        link: 'https://www.fastshop.com.br',
        freteGratis: true,
        parcelamento: '10x de R$ 329,00 sem juros',
        disponivel: true,
      },
    ],
  },

  // --- Adicionais da categoria Celulares ---
  {
    id: 'xiaomi-14-ultra',
    nome: 'Smartphone Xiaomi 14 Ultra 5G 512GB 16GB RAM Leica Black',
    slug: 'xiaomi-14-ultra',
    marca: 'Xiaomi',
    categoria: 'celulares',
    descricao: 'Fotografia profissional Leica com sensor de 1 polegada com abertura variável, chip Snapdragon 8 Gen 3 e carregamento ultrarrápido de 90W.',
    imagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 74 },
    ofertas: [
      { id: 'x14-1', loja: 'Amazon', preco: 6999.00, precoAnterior: 8499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'x14-2', loja: 'Mercado Livre', preco: 6799.00, precoAnterior: 8299.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'samsung-galaxy-a55-5g',
    nome: 'Samsung Galaxy A55 5G 256GB 8GB RAM Azul Escuro',
    slug: 'samsung-galaxy-a55-5g',
    marca: 'Samsung',
    categoria: 'celulares',
    descricao: 'Design em metal e vidro premium, câmera de 50MP com Nightography, resistência à água e poeira IP67 e bateria de 5000 mAh.',
    imagem: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 420 },
    ofertas: [
      { id: 'a55-1', loja: 'Magalu', preco: 1899.00, precoAnterior: 2499.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
      { id: 'a55-2', loja: 'Amazon', preco: 1949.00, precoAnterior: 2499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'a55-3', loja: 'Casas Bahia', preco: 1999.00, precoAnterior: 2599.00, link: 'https://www.casasbahia.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'motorola-edge-50-ultra',
    nome: 'Smartphone Motorola Edge 50 Ultra 512GB 12GB RAM Madeirado',
    slug: 'motorola-edge-50-ultra',
    marca: 'Motorola',
    categoria: 'celulares',
    descricao: 'Acabamento em madeira natural e couro vegano, câmera quádrupla telefoto de 100x com IA, carregamento TurboPower de 125W.',
    imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.6, quantidade: 65 },
    ofertas: [
      { id: 'mot-1', loja: 'Amazon', preco: 4899.00, precoAnterior: 5999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'mot-2', loja: 'Mercado Livre', preco: 4750.00, precoAnterior: 5899.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'iphone-13-128gb',
    nome: 'Apple iPhone 13 (128 GB) Meia-Noite',
    slug: 'apple-iphone-13-128gb',
    marca: 'Apple',
    categoria: 'celulares',
    descricao: 'O iPhone 13 traz o chip A15 Bionic super-rápido, modo Cinema para gravações com profundidade de campo e durabilidade extraordinária.',
    imagem: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 2150 },
    ofertas: [
      { id: 'i13-1', loja: 'Amazon', preco: 3599.00, precoAnterior: 4499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'i13-2', loja: 'Mercado Livre', preco: 3499.00, precoAnterior: 4399.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
      { id: 'i13-3', loja: 'Magalu', preco: 3699.00, precoAnterior: 4599.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Adicionais de Eletrônicos & Áudio ---
  {
    id: 'jbl-boombox-3',
    nome: 'Caixa de Som Bluetooth JBL Boombox 3 Wi-Fi e Bluetooth Preta',
    slug: 'caixa-de-som-jbl-boombox-3',
    marca: 'JBL',
    categoria: 'eletronicos',
    descricao: 'Som massivo JBL Original Pro Sound com graves profundos, subwoofer integrado, resistente à água IP67 e bateria para até 24 horas de reprodução.',
    imagem: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 389 },
    ofertas: [
      { id: 'jbl-1', loja: 'Amazon', preco: 2499.00, precoAnterior: 3199.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'jbl-2', loja: 'Kabum', preco: 2399.00, precoAnterior: 3199.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'jbl-3', loja: 'Fast Shop', preco: 2549.00, precoAnterior: 3299.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'airpods-pro-2-usb-c',
    nome: 'Fones de Ouvido Apple AirPods Pro (2ª geração) com Estojo USB-C',
    slug: 'apple-airpods-pro-2-usbc',
    marca: 'Apple',
    categoria: 'eletronicos',
    descricao: 'Cancelamento Ativo de Ruído até 2x mais eficiente, Áudio Adaptativo, detecção de conversa e estojo de recarga MagSafe USB-C com alto-falante.',
    imagem: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 950 },
    ofertas: [
      { id: 'app-1', loja: 'Amazon', preco: 1899.00, precoAnterior: 2599.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'app-2', loja: 'Mercado Livre', preco: 1799.00, precoAnterior: 2499.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'jbl-flip-6',
    nome: 'Caixa de Som Portátil JBL Flip 6 Bluetooth À Prova D\'Água',
    slug: 'caixa-jbl-flip-6',
    marca: 'JBL',
    categoria: 'eletronicos',
    descricao: 'Sistema de alto-falantes de 2 vias projetado para entregar som nítido e potente com 12 horas de autonomia.',
    imagem: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 1120 },
    ofertas: [
      { id: 'f6-1', loja: 'Amazon', preco: 549.00, precoAnterior: 749.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'f6-2', loja: 'Kabum', preco: 529.00, precoAnterior: 749.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'f6-3', loja: 'Magalu', preco: 569.00, precoAnterior: 799.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'soundbar-samsung-hw-q800c',
    nome: 'Soundbar Samsung HW-Q800C 5.1.2 canais com Subwoofer Sem Fio',
    slug: 'soundbar-samsung-hw-q800c',
    marca: 'Samsung',
    categoria: 'eletronicos',
    descricao: 'Som imersivo de cinema com Dolby Atmos sem fio, DTS:X e tecnologia de Sincronia Sonora perfeita com TVs Samsung.',
    imagem: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 112 },
    ofertas: [
      { id: 'sb-1', loja: 'Fast Shop', preco: 2699.00, precoAnterior: 3499.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
      { id: 'sb-2', loja: 'Amazon', preco: 2799.00, precoAnterior: 3499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Eletrodomésticos ---
  {
    id: 'geladeira-brastemp-frost-free-463l',
    nome: 'Geladeira Brastemp Frost Free Duplex 463L Inox BRM54HK',
    slug: 'geladeira-brastemp-frost-free-463l',
    marca: 'Brastemp',
    categoria: 'eletrodomesticos',
    descricao: 'Design moderno em inox, compartimento Freeze Control Avançado e controle eletrônico externo de temperatura.',
    imagem: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 340 },
    ofertas: [
      { id: 'gel-1', loja: 'Casas Bahia', preco: 3899.00, precoAnterior: 4699.00, link: 'https://www.casasbahia.com.br', freteGratis: true, disponivel: true },
      { id: 'gel-2', loja: 'Magalu', preco: 3999.00, precoAnterior: 4799.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
      { id: 'gel-3', loja: 'Amazon', preco: 4099.00, precoAnterior: 4899.00, link: 'https://www.amazon.com.br', freteGratis: false, disponivel: true },
    ],
  },
  {
    id: 'robo-aspirador-eufy-g30',
    nome: 'Robô Aspirador de Pó Eufy RoboVac G30 Mapeamento Inteligente',
    slug: 'robo-aspirador-eufy-g30',
    marca: 'Eufy',
    categoria: 'eletrodomesticos',
    descricao: 'Navegação Smart Dynamic 2.0 com sensor de trajetória, sucção forte de 2000Pa e controle total via aplicativo no smartphone.',
    imagem: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 180 },
    ofertas: [
      { id: 'rob-1', loja: 'Amazon', preco: 1399.00, precoAnterior: 1899.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'rob-2', loja: 'Mercado Livre', preco: 1349.00, precoAnterior: 1849.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'microondas-electrolux-31l',
    nome: 'Micro-ondas Electrolux 31L Painel Integrado Espelhado MI41S',
    slug: 'microondas-electrolux-31l',
    marca: 'Electrolux',
    categoria: 'eletrodomesticos',
    descricao: 'Porta espelhada com painel numérico escondido que acende ao toque. Receitas pré-programadas e função tira odor.',
    imagem: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 520 },
    ofertas: [
      { id: 'mic-1', loja: 'Magalu', preco: 699.00, precoAnterior: 899.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
      { id: 'mic-2', loja: 'Casas Bahia', preco: 719.00, precoAnterior: 899.00, link: 'https://www.casasbahia.com.br', freteGratis: true, disponivel: true },
      { id: 'mic-3', loja: 'Amazon', preco: 739.00, precoAnterior: 929.00, link: 'https://www.amazon.com.br', freteGratis: false, disponivel: true },
    ],
  },
  {
    id: 'lavadora-lg-vc5-11kg',
    nome: 'Lava e Seca LG VC5 11kg Inteligência Artificial AIDD Inox',
    slug: 'lavadora-lg-vc5-11kg',
    marca: 'LG',
    categoria: 'eletrodomesticos',
    descricao: 'A inteligência artificial detecta o peso e a textura dos tecidos para garantir 18% mais proteção às suas roupas durante a lavagem.',
    imagem: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 430 },
    ofertas: [
      { id: 'lav-1', loja: 'Fast Shop', preco: 3599.00, precoAnterior: 4399.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
      { id: 'lav-2', loja: 'Magalu', preco: 3699.00, precoAnterior: 4499.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Informática & Laptops ---
  {
    id: 'notebook-dell-g15-i7',
    nome: 'Notebook Gamer Dell G15 (Intel Core i7 13ª Gen, RTX 4050, 16GB, 512GB SSD)',
    slug: 'notebook-dell-g15-i7',
    marca: 'Dell',
    categoria: 'informatica',
    descricao: 'Desempenho gráfico avançado com a NVIDIA GeForce RTX 4050, tela Full HD 165Hz com G-Sync e sistema de refrigeração inspirado na Alienware.',
    imagem: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 190 },
    ofertas: [
      { id: 'dell-1', loja: 'Amazon', preco: 5899.00, precoAnterior: 7199.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'dell-2', loja: 'Kabum', preco: 5799.00, precoAnterior: 7199.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'dell-3', loja: 'Mercado Livre', preco: 5699.00, precoAnterior: 6999.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'monitor-lg-ultragear-27-144hz',
    nome: 'Monitor Gamer LG UltraGear 27" IPS Full HD 144Hz 1ms HDR10',
    slug: 'monitor-lg-ultragear-27-144hz',
    marca: 'LG',
    categoria: 'informatica',
    descricao: 'Tempo de resposta ultra-rápido de 1ms MBR, painel IPS com cores vivas e suporte AMD FreeSync Premium para jogabilidade suave.',
    imagem: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 870 },
    ofertas: [
      { id: 'mon-1', loja: 'Kabum', preco: 999.00, precoAnterior: 1399.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'mon-2', loja: 'Amazon', preco: 1049.00, precoAnterior: 1399.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'ipad-air-m2-11',
    nome: 'Apple iPad Air 11" M2 (128 GB, Wi-Fi) Azul',
    slug: 'apple-ipad-air-m2-11',
    marca: 'Apple',
    categoria: 'informatica',
    descricao: 'Impulsionado pelo chip M2 ultraveloz, com tela Liquid Retina espetacular, suporte ao Apple Pencil Pro e Magic Keyboard.',
    imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 160 },
    ofertas: [
      { id: 'ipad-1', loja: 'Amazon', preco: 5299.00, precoAnterior: 6499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'ipad-2', loja: 'Mercado Livre', preco: 5190.00, precoAnterior: 6299.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'teclado-logitech-mx-keys-s',
    nome: 'Teclado Sem Fio Logitech MX Keys S Avançado ILuminado',
    slug: 'teclado-logitech-mx-keys-s',
    marca: 'Logitech',
    categoria: 'informatica',
    descricao: 'Digitado fluida e precisa com teclas côncavas moldadas para as pontas dos dedos, iluminação inteligente e conexão multidispositivos.',
    imagem: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 340 },
    ofertas: [
      { id: 'tec-1', loja: 'Amazon', preco: 649.00, precoAnterior: 849.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'tec-2', loja: 'Kabum', preco: 629.00, precoAnterior: 849.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Games & Consoles ---
  {
    id: 'nintendo-switch-oled',
    nome: 'Console Nintendo Switch Edição OLED 64GB com Joy-Con Branco',
    slug: 'nintendo-switch-oled',
    marca: 'Nintendo',
    categoria: 'games',
    descricao: 'Tela OLED vibrante de 7 polegadas com cores vivas e alto contraste, suporte ajustável amplo e áudio aprimorado.',
    imagem: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 1120 },
    ofertas: [
      { id: 'nint-1', loja: 'Amazon', preco: 2099.00, precoAnterior: 2699.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'nint-2', loja: 'Mercado Livre', preco: 1999.00, precoAnterior: 2599.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
      { id: 'nint-3', loja: 'Kabum', preco: 2149.00, precoAnterior: 2699.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'xbox-series-x-1tb',
    nome: 'Console Xbox Series X 1TB SSD Preto',
    slug: 'xbox-series-x-1tb',
    marca: 'Microsoft',
    categoria: 'games',
    descricao: 'O Xbox mais rápido e poderoso de todos os tempos. Jogos em 4K até 120 FPS, Ray Tracing e Xbox Velocity Architecture.',
    imagem: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 650 },
    ofertas: [
      { id: 'xbx-1', loja: 'Amazon', preco: 4199.00, precoAnterior: 4999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'xbx-2', loja: 'Kabum', preco: 4099.00, precoAnterior: 4999.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'controle-dualsense-ps5-white',
    nome: 'Controle Sem Fio DualSense PlayStation 5 - White',
    slug: 'controle-dualsense-ps5-white',
    marca: 'Sony',
    categoria: 'games',
    descricao: 'Descubra uma experiência de jogo mais profunda e imersiva com o novo controle inovador para PS5 com feedback tátil.',
    imagem: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 1840 },
    ofertas: [
      { id: 'ctrl-1', loja: 'Amazon', preco: 389.00, precoAnterior: 469.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'ctrl-2', loja: 'Kabum', preco: 379.00, precoAnterior: 469.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'headset-hyperx-cloud-iii',
    nome: 'Headset Gamer HyperX Cloud III Preto e Vermelho',
    slug: 'headset-hyperx-cloud-iii',
    marca: 'HyperX',
    categoria: 'games',
    descricao: 'Evolução do lendário Cloud II. Conforto exclusivo HyperX, drivers angulados de 53 mm sintonizados e microfone de 10 mm com cancelamento de ruído.',
    imagem: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 410 },
    ofertas: [
      { id: 'hyp-1', loja: 'Kabum', preco: 499.00, precoAnterior: 699.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'hyp-2', loja: 'Amazon', preco: 519.00, precoAnterior: 699.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Casa & Cozinha ---
  {
    id: 'panela-eletrica-electrolux-pcc20',
    nome: 'Panela de Pressão Elétrica Electrolux 6L Digital PCC20',
    slug: 'panela-eletrica-electrolux-pcc20',
    marca: 'Electrolux',
    categoria: 'casa-cozinha',
    descricao: '15 receitas pré-programadas, display digital e 10 dispositivos de segurança para cozinhar de forma rápida e completamente segura.',
    imagem: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 730 },
    ofertas: [
      { id: 'pan-1', loja: 'Amazon', preco: 449.00, precoAnterior: 599.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'pan-2', loja: 'Magalu', preco: 469.00, precoAnterior: 599.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'cafeteira-nespresso-vertuo-pop',
    nome: 'Cafeteira Nespresso Vertuo Pop Preta com Extrator Centrifusion',
    slug: 'cafeteira-nespresso-vertuo-pop',
    marca: 'Nespresso',
    categoria: 'casa-cozinha',
    descricao: 'Extração inteligente por código de barras em cada cápsula. Prepara 4 tamanhos de xícara com uma crema incrível ao toque de um botão.',
    imagem: 'https://images.unsplash.com/photo-1517668808822-9eaa03afd2a7?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 380 },
    ofertas: [
      { id: 'nes-1', loja: 'Amazon', preco: 389.00, precoAnterior: 529.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'nes-2', loja: 'Magalu', preco: 399.00, precoAnterior: 529.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'cadeira-ergonomica-flexform-lite',
    nome: 'Cadeira de Escritório Ergonômica Flexform Lite Black',
    slug: 'cadeira-ergonomica-flexform-lite',
    marca: 'Flexform',
    categoria: 'casa-cozinha',
    descricao: 'Certificação ergonômica ABNT 13962, encosto em tela Mesh respirável, apoio lombar ajustável e mecanismo de inclinação síncrono.',
    imagem: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 520 },
    ofertas: [
      { id: 'cad-1', loja: 'Amazon', preco: 699.00, precoAnterior: 899.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'cad-2', loja: 'Mercado Livre', preco: 679.00, precoAnterior: 879.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'umidificador-xiaomi-smart-2',
    nome: 'Umidificador de Ar Ultrassônico Xiaomi Smart Humidifier 2',
    slug: 'umidificador-xiaomi-smart-2',
    marca: 'Xiaomi',
    categoria: 'casa-cozinha',
    descricao: 'Esterilização UV-C de alta intensidade para névoa purificada, reservatório de 4.5L para até 32h de funcionamento e Wi-Fi.',
    imagem: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 290 },
    ofertas: [
      { id: 'umi-1', loja: 'Amazon', preco: 349.00, precoAnterior: 499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'umi-2', loja: 'Mercado Livre', preco: 335.00, precoAnterior: 479.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Moda & Calçados ---
  {
    id: 'tenis-adidas-ultraboost-light',
    nome: 'Tênis Adidas Ultraboost Light Masculino Preto',
    slug: 'tenis-adidas-ultraboost-light',
    marca: 'Adidas',
    categoria: 'moda-calcados',
    descricao: 'O Ultraboost mais leve de todos os tempos com amortecimento Light BOOST de última geração e cabedal Primeknit+ confortável.',
    imagem: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 670 },
    ofertas: [
      { id: 'ub-1', loja: 'Amazon', preco: 899.00, precoAnterior: 1199.90, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'ub-2', loja: 'Mercado Livre', preco: 859.00, precoAnterior: 1199.90, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'mochila-samsonite-guard-it-2',
    nome: 'Mochila Para Notebook Samsonite Guard IT 2.0 15.6" Preta',
    slug: 'mochila-samsonite-guard-it-2',
    marca: 'Samsonite',
    categoria: 'moda-calcados',
    descricao: 'Design executivo elegante em poliéster de alta densidade, compartimento acolchoado para laptop e organizadores internos.',
    imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 310 },
    ofertas: [
      { id: 'moc-1', loja: 'Amazon', preco: 299.00, precoAnterior: 399.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'moc-2', loja: 'Mercado Livre', preco: 289.00, precoAnterior: 389.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'relogio-casio-g-shock-ga-2100',
    nome: 'Relógio Casio G-Shock Carbon Core Guard GA-2100-1A1DR Preto',
    slug: 'relogio-casio-g-shock-ga-2100',
    marca: 'Casio',
    categoria: 'moda-calcados',
    descricao: 'Conhecido mundialmente como "CasiOak", possui caixa octogonal reforçada com estrutura de carbono ultra-resistente e resistência a 200m de água.',
    imagem: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 820 },
    ofertas: [
      { id: 'cas-1', loja: 'Amazon', preco: 649.00, precoAnterior: 899.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'cas-2', loja: 'Mercado Livre', preco: 629.00, precoAnterior: 849.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'jaqueta-corta-vento-puma',
    nome: 'Jaqueta Corta-Vento Puma Essentials Solid Masculina Preta',
    slug: 'jaqueta-corta-vento-puma',
    marca: 'Puma',
    categoria: 'moda-calcados',
    descricao: 'Proteção leve contra chuva e vento com tecnologia windCELL para manter a temperatura corporal agradável durante a prática esportiva.',
    imagem: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 210 },
    ofertas: [
      { id: 'pum-1', loja: 'Amazon', preco: 199.90, precoAnterior: 299.90, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'pum-2', loja: 'Mercado Livre', preco: 189.90, precoAnterior: 289.90, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Beleza & Cuidados ---
  {
    id: 'barbeador-philips-series-5000',
    nome: 'Barbeador Elétrico Philips Series 5000 Wet & Dry S5588/17',
    slug: 'barbeador-philips-series-5000',
    marca: 'Philips',
    categoria: 'beleza-saude',
    descricao: 'Corte potente que atinge até 90.000 ações por minuto com lâminas SteelPrecision e sensor inteligente SkinIQ de densidade da barba.',
    imagem: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 490 },
    ofertas: [
      { id: 'bar-1', loja: 'Amazon', preco: 499.00, precoAnterior: 699.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'bar-2', loja: 'Magalu', preco: 519.00, precoAnterior: 699.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'escova-rotativa-conair',
    nome: 'Escova Rotativa Conair Air Brush Titanium Spin Air',
    slug: 'escova-rotativa-conair',
    marca: 'Conair',
    categoria: 'beleza-saude',
    descricao: 'Modelagem de salão em casa com rotação dupla em 360°, emissão de íons para eliminar o frizz e placas com revestimento de titânio.',
    imagem: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 310 },
    ofertas: [
      { id: 'esc-1', loja: 'Amazon', preco: 389.00, precoAnterior: 499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'esc-2', loja: 'Fast Shop', preco: 399.00, precoAnterior: 529.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
    ],
  },

  // --- Produtos Adicionais Diversificados (completando 40+ itens) ---
  {
    id: 'smart-tv-lg-oled-55-c3',
    nome: 'Smart TV 55" 4K OLED LG OLED55C3 120Hz Dolby Vision G-Sync',
    slug: 'smart-tv-lg-oled-55-c3',
    marca: 'LG',
    categoria: 'eletronicos',
    descricao: 'Píxeis que se autoiluminam para contraste infinito e preto puro, processador α9 AI 4K Gen6, 4 portas HDMI 2.1 para consoles de última geração.',
    imagem: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    destaque: true,
    avaliacao: { nota: 4.9, quantidade: 460 },
    ofertas: [
      { id: 'tv-1', loja: 'Fast Shop', preco: 5899.00, precoAnterior: 7499.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
      { id: 'tv-2', loja: 'Amazon', preco: 5999.00, precoAnterior: 7499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'tv-3', loja: 'Casas Bahia', preco: 6199.00, precoAnterior: 7699.00, link: 'https://www.casasbahia.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'smart-tv-samsung-neo-qled-65',
    nome: 'Smart TV 65" Neo QLED 4K Samsung 65QN85C Mini LED 120Hz',
    slug: 'smart-tv-samsung-neo-qled-65',
    marca: 'Samsung',
    categoria: 'eletronicos',
    descricao: 'Tecnologia de iluminação Quantum Mini LED, Gaming Hub para jogar via nuvem sem console e Som em Movimento Virtual.',
    imagem: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 280 },
    ofertas: [
      { id: 'tv2-1', loja: 'Amazon', preco: 6299.00, precoAnterior: 7999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'tv2-2', loja: 'Magalu', preco: 6499.00, precoAnterior: 8199.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'apple-watch-series-9-gps',
    nome: 'Apple Watch Series 9 (GPS 45mm) Caixa de Alumínio Meia-Noite',
    slug: 'apple-watch-series-9-gps',
    marca: 'Apple',
    categoria: 'eletronicos',
    descricao: 'Gesto de toque duplo mágico sem tocar na tela, tela mais brilhante de 2000 nits e chip S9 SiP absurdamente poderoso.',
    imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 520 },
    ofertas: [
      { id: 'aw-1', loja: 'Amazon', preco: 3199.00, precoAnterior: 3999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'aw-2', loja: 'Mercado Livre', preco: 3099.00, precoAnterior: 3899.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'kindle-paperwhite-16gb',
    nome: 'Amazon Kindle Paperwhite (16 GB) com Tela de 6,8" e Luz Cátida Ajustável',
    slug: 'amazon-kindle-paperwhite-16gb',
    marca: 'Amazon',
    categoria: 'eletronicos',
    descricao: 'Tela sem reflexos de 300 ppi, bateria que dura até 10 semanas, à prova d\'água (IPX8) e luz ajustável do branco ao âmbar.',
    imagem: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 3410 },
    ofertas: [
      { id: 'knd-1', loja: 'Amazon', preco: 719.10, precoAnterior: 799.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'knd-2', loja: 'Kabum', preco: 759.00, precoAnterior: 799.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'processador-amd-ryzen-7-7800x3d',
    nome: 'Processador AMD Ryzen 7 7800X3D (8-Cores, 16-Threads, 5.0GHz, Socket AM5)',
    slug: 'processador-amd-ryzen-7-7800x3d',
    marca: 'AMD',
    categoria: 'informatica',
    descricao: 'O melhor processador para jogos do mundo com a inovadora tecnologia AMD 3D V-Cache de 96MB de cache L3.',
    imagem: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 780 },
    ofertas: [
      { id: 'ryz-1', loja: 'Kabum', preco: 2699.00, precoAnterior: 3299.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'ryz-2', loja: 'Amazon', preco: 2799.00, precoAnterior: 3299.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'placa-de-video-rtx-4070-super',
    nome: 'Placa de Vídeo RTX 4070 Super 12GB GDDR6X DLSS 3',
    slug: 'placa-de-video-rtx-4070-super',
    marca: 'NVIDIA',
    categoria: 'informatica',
    descricao: 'Arquitetura NVIDIA Ada Lovelace, ray tracing ultra-rápido, geração de quadros por IA com DLSS 3 e baixo consumo energético.',
    imagem: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 390 },
    ofertas: [
      { id: 'rtx-1', loja: 'Kabum', preco: 4199.00, precoAnterior: 4999.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'rtx-2', loja: 'Amazon', preco: 4349.00, precoAnterior: 4999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'mouse-logitech-g-pro-x-superlight-2',
    nome: 'Mouse Gamer Sem Fio Logitech G PRO X SUPERLIGHT 2 Magenta',
    slug: 'mouse-logitech-g-pro-x-superlight-2',
    marca: 'Logitech',
    categoria: 'informatica',
    descricao: 'Peso pena de apenas 60 gramas, switches híbridos LIGHTFORCE de resposta óptica-mecânica e sensor HERO 2 de 32.000 DPI.',
    imagem: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 610 },
    ofertas: [
      { id: 'mou-1', loja: 'Kabum', preco: 849.00, precoAnterior: 1099.00, link: 'https://www.kabum.com.br', freteGratis: true, disponivel: true },
      { id: 'mou-2', loja: 'Amazon', preco: 869.00, precoAnterior: 1099.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'ar-condicionado-lg-dual-inverter-12000',
    nome: 'Ar Condicionado Split LG Dual Inverter Voice 12000 BTU Frio 220V',
    slug: 'ar-condicionado-lg-dual-inverter-12000',
    marca: 'LG',
    categoria: 'eletrodomesticos',
    descricao: 'Economia de até 70% de energia, refrigeração 40% mais rápida, super silencioso e compatível com comandos de voz por Google Assistant e Alexa.',
    imagem: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 890 },
    ofertas: [
      { id: 'ac-1', loja: 'Casas Bahia', preco: 2299.00, precoAnterior: 2899.00, link: 'https://www.casasbahia.com.br', freteGratis: true, disponivel: true },
      { id: 'ac-2', loja: 'Magalu', preco: 2349.00, precoAnterior: 2949.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
      { id: 'ac-3', loja: 'Amazon', preco: 2399.00, precoAnterior: 2999.00, link: 'https://www.amazon.com.br', freteGratis: false, disponivel: true },
    ],
  },
  {
    id: 'adega-climatizada-electrolux-12-garrafas',
    nome: 'Adega Climatizada Electrolux 12 Garrafas Painel Touch ACB12 220V',
    slug: 'adega-electrolux-12-garrafas',
    marca: 'Electrolux',
    categoria: 'casa-cozinha',
    descricao: 'Temperatura estável ajustável de 12°C a 18°C para vinhos tintos, brancos ou espumantes, iluminação interna em LED e porta de vidro duplo.',
    imagem: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.7, quantidade: 140 },
    ofertas: [
      { id: 'adg-1', loja: 'Magalu', preco: 799.00, precoAnterior: 1099.00, link: 'https://www.magazineluiza.com.br', freteGratis: true, disponivel: true },
      { id: 'adg-2', loja: 'Amazon', preco: 829.00, precoAnterior: 1099.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'politriz-estetica-automotiva-dewalt',
    nome: 'Politriz Angular DeWalt 7" 1250W DWP849X 220V',
    slug: 'politriz-dewalt-dwp849x',
    marca: 'DeWalt',
    categoria: 'casa-cozinha',
    descricao: 'Ferramenta profissional para polimento automotivo com controle de velocidade variável de 0 a 3500 rpm e partida suave.',
    imagem: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 210 },
    ofertas: [
      { id: 'pol-1', loja: 'Amazon', preco: 1149.00, precoAnterior: 1499.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'pol-2', loja: 'Mercado Livre', preco: 1099.00, precoAnterior: 1449.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'perfume-sauvage-dior-eau-de-parfum',
    nome: 'Perfume Dior Sauvage Eau de Parfum Masculino 100ml',
    slug: 'perfume-dior-sauvage-edp-100ml',
    marca: 'Dior',
    categoria: 'beleza-saude',
    descricao: 'Fragrância nobre e misteriosa com notas marcantes de Bergamota da Calábria, Pimenta de Szechuan e absoluto de Baunilha de Papua-Nova Guiné.',
    imagem: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 1650 },
    ofertas: [
      { id: 'sauv-1', loja: 'Amazon', preco: 849.00, precoAnterior: 999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'sauv-2', loja: 'Fast Shop', preco: 879.00, precoAnterior: 999.00, link: 'https://www.fastshop.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'relogio-apple-watch-ultra-2',
    nome: 'Apple Watch Ultra 2 (GPS + Cellular 49mm) Caixa de Titânio',
    slug: 'apple-watch-ultra-2',
    marca: 'Apple',
    categoria: 'eletronicos',
    descricao: 'O relógio de aventura e esportes mais potente da Apple. Tela de 3000 nits, GPS de precisão e dupla frequência e até 36 horas de bateria.',
    imagem: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 310 },
    ofertas: [
      { id: 'ult-1', loja: 'Amazon', preco: 7499.00, precoAnterior: 9699.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'ult-2', loja: 'Mercado Livre', preco: 7299.00, precoAnterior: 9499.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'oculos-vr-meta-quest-3-128gb',
    nome: 'Headset de Realidade Mista Meta Quest 3 128GB',
    slug: 'meta-quest-3-128gb',
    marca: 'Meta',
    categoria: 'games',
    descricao: 'Imersão revolucionária em realidade virtual e mista com telas 4K+ Infinite Display e controles Touch Plus sem anel.',
    imagem: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.8, quantidade: 480 },
    ofertas: [
      { id: 'mq3-1', loja: 'Amazon', preco: 4199.00, precoAnterior: 4999.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
      { id: 'mq3-2', loja: 'Mercado Livre', preco: 3999.00, precoAnterior: 4899.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
    ],
  },
  {
    id: 'steam-deck-oled-512gb',
    nome: 'Console Portátil Valve Steam Deck OLED 512GB',
    slug: 'steam-deck-oled-512gb',
    marca: 'Valve',
    categoria: 'games',
    descricao: 'Jogue seus títulos da biblioteca Steam em uma tela HDR OLED de 7.4" de 90Hz, bateria com maior duração e Wi-Fi 6E.',
    imagem: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
    avaliacao: { nota: 4.9, quantidade: 520 },
    ofertas: [
      { id: 'sd-1', loja: 'Mercado Livre', preco: 4699.00, precoAnterior: 5499.00, link: 'https://www.mercadolivre.com.br', freteGratis: true, disponivel: true },
      { id: 'sd-2', loja: 'Amazon', preco: 4899.00, precoAnterior: 5699.00, link: 'https://www.amazon.com.br', freteGratis: true, disponivel: true },
    ],
  },
];

// Processa produtos preenchendo menorPreco, maiorPreco e maiorDesconto
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
 * CAMADA ÚNICA DE DADOS - CAMADA DE ABSTRAÇÃO DE BUSCA
 * Hoje busca da memória mock. No futuro, pode consultar a API Lomadee
 * verificando se process.env.LOMADEE_TOKEN existe.
 */
export async function buscarProdutos(filtros: FiltrosBusca = {}): Promise<Produto[]> {
  const { termo, categoria, marca, loja, precoMin, precoMax, ordem } = filtros;

  // Se houver um LOMADEE_TOKEN no futuro, poderíamos chamar a API real aqui:
  // if (process.env.LOMADEE_TOKEN) { ... }

  let resultado = [...PRODUTOS];

  // 1. Filtro por termo de busca (Nome, Descrição ou Marca)
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

  // 2. Filtro por Categoria
  if (categoria && categoria !== 'todas') {
    const catLower = categoria.toLowerCase();
    resultado = resultado.filter(
      (p) => p.categoria.toLowerCase() === catLower || p.slug.toLowerCase().includes(catLower)
    );
  }

  // 3. Filtro por Marca
  if (marca && marca !== 'todas') {
    const marcaLower = marca.toLowerCase();
    resultado = resultado.filter((p) => p.marca.toLowerCase() === marcaLower);
  }

  // 4. Filtro por Loja
  if (loja && loja !== 'todas') {
    resultado = resultado.filter((p) =>
      p.ofertas.some((o) => o.loja.toLowerCase() === loja.toLowerCase() && o.disponivel)
    );
  }

  // 5. Filtro por Faixa de Preço
  if (precoMin !== undefined && !isNaN(precoMin)) {
    resultado = resultado.filter((p) => p.menorPreco >= precoMin);
  }
  if (precoMax !== undefined && !isNaN(precoMax)) {
    resultado = resultado.filter((p) => p.menorPreco <= precoMax);
  }

  // 6. Ordenação
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
        // Mantém a ordem original ou por nota de avaliação
        resultado.sort((a, b) => b.avaliacao.nota - a.avaliacao.nota);
        break;
    }
  }

  return resultado;
}

/**
 * Busca produto único por ID ou Slug
 */
export async function buscarProdutoPorId(idOuSlug: string): Promise<Produto | null> {
  const produto = PRODUTOS.find((p) => p.id === idOuSlug || p.slug === idOuSlug);
  return produto || null;
}

/**
 * Obter produtos em destaque para a Home
 */
export async function obterProdutosDestaque(limite: number = 8): Promise<Produto[]> {
  const destaques = PRODUTOS.filter((p) => p.destaque);
  if (destaques.length >= limite) {
    return destaques.slice(0, limite);
  }
  // Se não houver suficientes marcados como destaque, completa com os de maior avaliação
  const restantes = PRODUTOS.filter((p) => !p.destaque).sort(
    (a, b) => b.avaliacao.nota - a.avaliacao.nota
  );
  return [...destaques, ...restantes].slice(0, limite);
}

/**
 * Obter lista única de marcas e lojas disponíveis para filtros
 */
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
