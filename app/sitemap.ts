import { MetadataRoute } from 'next';
import { PRODUTOS, CATEGORIAS } from '@/lib/produtos';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buscadescontos.com.br';

  // Páginas estáticas
  const paginasEstaticas = ['', '/busca', '/como-funciona', '/sobre', '/privacidade', '/aviso-afiliados'].map(
    (rota) => ({
      url: `${baseUrl}${rota}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: rota === '' ? 1.0 : 0.8,
    })
  );

  // Páginas de produtos dinâmicas
  const paginasProdutos = PRODUTOS.map((p) => ({
    url: `${baseUrl}/produto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Páginas de categorias dinâmicas
  const paginasCategorias = CATEGORIAS.map((c) => ({
    url: `${baseUrl}/busca?categoria=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...paginasEstaticas, ...paginasProdutos, ...paginasCategorias];
}
