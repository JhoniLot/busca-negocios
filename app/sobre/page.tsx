import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ShieldCheck, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'Sobre Nós | Poupaí',
  description: 'Conheça a história e o propósito por trás do Poupaí (poupai.store), seu parceiro de economia inteligente no Brasil.',
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <Logo variant="dark" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
          Sobre o Poupaí
        </h1>
        <p className="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Nossa missão é devolver o poder de escolha ao consumidor brasileiro através da transparência e da comparação inteligente de preços.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-soft space-y-8 leading-relaxed text-sm text-brand-muted">
        <div>
          <h2 className="text-xl font-bold text-navy font-display mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-green" />
            Nossa Proposta de Valor
          </h2>
          <p>
            O <strong>Poupaí</strong> (uma junção divertida da ideia de "Poupar" + "Aí") nasceu da percepção de que comprar online no Brasil se tornou um desafio. Com tantas lojas, cupons e variações diárias de preços, o consumidor muitas vezes paga mais caro por falta de informação.
          </p>
          <p className="mt-3">
            Criamos uma plataforma rápida, limpa e extremamente focada na utilidade: reunimos as maiores lojas do e-commerce brasileiro em uma única tela para que você veja quem vende mais barato em segundos.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-navy font-display mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-green" />
            Compromisso com a Verdade
          </h2>
          <p>
            Não aceitamos pagamentos para alterar a ordem natural do menor preço. Se a loja A vende por R$ 1.000 e a loja B vende por R$ 1.200, a loja A sempre aparecerá em destaque como a opção de menor valor.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-navy font-display mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-green" />
            Para Brasileiros, Feito por Brasileiros
          </h2>
          <p>
            Conhecemos a realidade do comércio eletrônico no Brasil. Por isso, todos os preços são exibidos em Reais (R$), considerando opções de parcelamento sem juros e frete.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/busca"
          className="inline-flex items-center gap-2 px-8 py-4 bg-navy hover:bg-navy-800 text-white font-bold rounded-2xl transition-all duration-200 shadow-md"
        >
          <span>Conheça nossas ofertas no Poupaí</span>
        </Link>
      </div>
    </div>
  );
}
