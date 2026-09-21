import React from 'react';
import { Info } from 'lucide-react';
import Link from 'next/link';

interface AffiliateNoticeProps {
  className?: string;
}

export function AffiliateNotice({ className = '' }: AffiliateNoticeProps) {
  return (
    <div className={`bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-xs text-navy-800 flex items-start sm:items-center gap-2.5 ${className}`}>
      <Info className="w-4 h-4 text-navy shrink-0 mt-0.5 sm:mt-0" />
      <div className="flex-1">
        <span className="font-semibold text-navy">Transparência em primeiro lugar: </span>
        <span>
          Podemos receber uma comissão quando você compra pelos nossos links. Isso nunca aumenta o preço para você e nos ajuda a manter a plataforma 100% gratuita.{' '}
        </span>
        <Link href="/aviso-afiliados" className="underline font-medium hover:text-brand-green transition-colors">
          Saiba mais
        </Link>
      </div>
    </div>
  );
}
