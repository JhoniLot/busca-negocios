import { OfertaLoja } from './types';

/**
 * Formata um número no padrão de moeda brasileiro (R$ 1.299,90)
 */
export function formatarMoeda(valor: number): string {
  if (isNaN(valor) || valor === null || valor === undefined) return 'R$ 0,00';
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Calcula a porcentagem de desconto entre o preço anterior e o preço atual
 */
export function calcularDesconto(precoAtual: number, precoAnterior?: number): number {
  if (!precoAnterior || precoAnterior <= precoAtual) return 0;
  const desconto = ((precoAnterior - precoAtual) / precoAnterior) * 100;
  return Math.round(desconto);
}

/**
 * Retorna a oferta com o menor preço disponível entre as lojas
 */
export function obterOfertaMaisBarata(ofertas: OfertaLoja[]): OfertaLoja | null {
  const disponiveis = ofertas.filter((o) => o.disponivel);
  if (disponiveis.length === 0) return null;
  return disponiveis.reduce((menor, atual) => (atual.preco < menor.preco ? atual : menor));
}

/**
 * Utilitário para classes css condicionais
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
