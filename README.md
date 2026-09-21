# 🛒 Busca Descontos - Comparador de Preços para o Brasil

> **Compare preços e pague menos.** Plataforma completa de comparação de ofertas em tempo real para o mercado brasileiro, desenvolvida com **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**.

---

## ✨ Principais Funcionalidades do Site

- 🔍 **Barra de Busca Inteligente com Autocomplete**: Sugestões instantâneas de produtos e categorias enquanto o usuário digita.
- 🏪 **Tabela Comparativa por Loja**: Compare ofertas da Amazon, Mercado Livre, Magalu, Casas Bahia, Kabum e Fast Shop lado a lado com menor preço em destaque.
- 🏷️ **Selos de Economia**: Indicador visual de **Menor Preço** e porcentagem de **% de Desconto**.
- 🎛️ **Filtros e Ordenação Avançada**: Filtre por faixa de preço (R$), loja, marca ou ordene por menor preço e maior desconto.
- 📱 **Mobile First**: Layout responsivo, limpo e adaptado para smartphones, tablets e desktop.
- 🔒 **Camada de Dados & API Oculta**: Camada isolada em `lib/produtos.ts` e Server Route em `app/api/busca/route.ts` protegendo tokens de parceiros (Lomadee).
- 🚀 **SEO de Alta Performance**: Metadata por página, Open Graph, Sitemap dinâmico (`sitemap.xml`) e `robots.txt`.

---

## 📁 Estrutura de Arquivos do Projeto

```text
busca-negocios/
├── app/
│   ├── page.tsx                  # Home (Hero de Busca, Categorias, 3 Passos, Destaques)
│   ├── busca/
│   │   ├── page.tsx              # Página de Resultados da Busca
│   │   └── BuscaConteudo.tsx     # Filtros, Ordenação, Grid de Produtos e Estado Vazio
│   ├── produto/[id]/
│   │   └── page.tsx              # Detalhes do Produto & Tabela Comparativa por Loja
│   ├── como-funciona/page.tsx    # Página institucional Como Funciona
│   ├── sobre/page.tsx            # Página institucional Sobre Nós
│   ├── privacidade/page.tsx       # Política de Privacidade (LGPD)
│   ├── aviso-afiliados/page.tsx  # Transparência & Aviso de Afiliados
│   ├── api/busca/route.ts        # Servidor de Busca (Proteção de Token)
│   ├── sitemap.ts                # Sitemap dinâmico para indexação
│   └── robots.txt                # Configuração para buscadores
├── components/
│   ├── Header.tsx                # Cabeçalho responsivo com logo SVG
│   ├── Footer.tsx                # Rodapé institucional completo
│   ├── SearchBar.tsx             # Barra de busca com autocomplete em tempo real
│   ├── ProductCard.tsx           # Cartão de produto com selo e link patrocinado
│   ├── OfferTable.tsx            # Tabela de preços por loja parceira
│   ├── CategoryGrid.tsx          # Grade de categorias com ícones Lucide
│   ├── FilterSidebar.tsx         # Sidebar e gaveta mobile de filtros
│   ├── AffiliateNotice.tsx       # Banner transparente de afiliados
│   └── SkeletonCard.tsx          # Skeletons para carregamento suave
├── lib/
│   ├── produtos.ts               # Camada única de dados (40+ produtos e abstração Lomadee)
│   ├── types.ts                  # Tipagens TypeScript (Produto, OfertaLoja, FiltrosBusca)
│   └── utils.ts                  # Formatador de moeda BRL (R$) e cálculo de desconto
├── public/                       # Favicon e ativos estáticos
├── .env.example                  # Exemplo de variável de ambiente (LOMADEE_TOKEN)
└── README.md                     # Este arquivo de documentação
```

---

## 🚀 Como Executar o Projeto Localmente

1. Certifique-se de ter o **Node.js** instalado (versão 18+).
2. Clone este repositório e instale as dependências:
   ```bash
   git clone https://github.com/JhoniLot/busca-negocios.git
   cd busca-negocios
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o navegador em: **`http://localhost:3000`**

---

## 🌐 Como Publicar na Vercel

1. Acesse [Vercel.com](https://vercel.com) e conecte sua conta do GitHub.
2. Clique em **Import Project** e selecione o repositório `JhoniLot/busca-negocios`.
3. (Opcional) Em *Environment Variables*, adicione `LOMADEE_TOKEN` com sua chave.
4. Clique em **Deploy**. Seu site estará no ar em poucos segundos!
