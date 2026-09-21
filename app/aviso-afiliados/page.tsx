import React from 'react';
import { Info, CheckCircle2, DollarSign, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Aviso de Afiliados e Transparência | Busca Descontos',
  description: 'Entenda como o Busca Descontos é mantido gratuitamente através de links de afiliação.',
};

export default function AvisoAfiliadosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-navy mx-auto flex items-center justify-center">
          <Info className="w-6 h-6 text-brand-green" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
          Aviso de Afiliados & Transparência
        </h1>
        <p className="text-sm text-brand-muted max-w-xl mx-auto">
          Honestidade é a base da nossa relação com você. Veja exatamente como funcionam nossos links e como mantemos o site no ar.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-soft space-y-8 text-sm text-brand-muted leading-relaxed">
        {/* Banner principal */}
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-navy font-medium text-base space-y-2">
          <p className="font-bold text-emerald-900 text-lg">
            "Podemos receber comissão quando você compra pelos nossos links. Isso não aumenta o preço para você."
          </p>
          <p className="text-sm text-emerald-800">
            É assim que conseguimos oferecer um comparador de preços 100% gratuito e sem cobrança de mensalidades para os usuários.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy font-display flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brand-green" />
            Como o Busca Descontos ganha dinheiro?
          </h2>
          <p>
            Participamos de programas de afiliados com grandes e-commerces e plataformas de intermediação, incluindo <strong>Amazon, Mercado Livre, Lomadee, Magazine Luiza, Casas Bahia, Kabum e Fast Shop</strong>.
          </p>
          <p>
            Quando você pesquisa um produto no Busca Descontos e clica no botão "Ver na loja", é gerado um link seguro contendo uma identificação do nosso site. Se você concluir a compra nessa loja, a loja nos paga uma pequena porcentagem da venda como comissão de divulgação.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-navy font-display flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
            O preço do produto muda por causa da comissão?
          </h2>
          <p className="font-semibold text-navy">
            Não! Absolutamente nada muda no valor final do produto para você.
          </p>
          <p>
            O preço cobrado pela loja parceira é exatamente o mesmo, quer você acesse o site dela diretamente ou quer você clique pelo Busca Descontos. A comissão sai da margem de marketing da própria loja, nunca do bolso do consumidor.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-navy font-display flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-green" />
            Isso afeta a ordem dos produtos no comparador?
          </h2>
          <p>
            Não. A ordenação por <strong>"Menor Preço"</strong> é calculada de forma puramente matemática e automática. O produto ou loja que apresentar o menor preço em Reais (R$) sempre ocupará a posição de destaque, independente do valor da comissão que a loja nos pague.
          </p>
        </section>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-green hover:bg-brand-green-hover text-white font-bold rounded-2xl transition-colors shadow-sm"
        >
          <span>Voltar para as Ofertas</span>
        </Link>
      </div>
    </div>
  );
}
