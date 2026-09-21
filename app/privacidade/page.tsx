import React from 'react';
import { Lock, EyeOff, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidade | Busca Descontos',
  description: 'Conheça nossa política de privacidade e como respeitamos seus dados de navegação no Busca Descontos.',
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
          Política de Privacidade
        </h1>
        <p className="text-sm text-brand-muted">Última atualização: Setembro de 2026</p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-soft space-y-6 text-sm text-brand-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy font-display flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-green" />
            1. Respeito Absoluto à sua Privacidade
          </h2>
          <p>
            No <strong>Busca Descontos</strong>, a sua privacidade é uma prioridade fundamental. Não exigimos cadastro prévio, dados de cartão de crédito ou informações pessoais sensíveis para que você possa comparar preços de produtos no nosso site.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-navy font-display flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-brand-green" />
            2. Coleta de Dados e Cookies
          </h2>
          <p>
            Utilizamos apenas cookies essenciais e dados agregados de navegação (como termos pesquisados e páginas mais acessadas) para melhorar a velocidade e a precisão dos resultados. Não vendemos e nunca venderemos seus dados a terceiros.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-navy font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-green" />
            3. Links para Sites Externos
          </h2>
          <p>
            Nosso site contém links de redirecionamento para lojas virtuais parceiras (como Amazon, Mercado Livre, Magalu, etc.). Ao clicar nesses links e sair do Busca Descontos, você estará sujeito à política de privacidade e aos termos de uso de cada loja de destino.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-navy font-display">4. Contato e Dúvidas</h2>
          <p>
            Se você tiver qualquer dúvida sobre como tratamos a sua navegação, entre em contato através dos nossos canais de atendimento oficial.
          </p>
        </section>
      </div>
    </div>
  );
}
