import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export function Logo({ variant = 'dark', className = '', showText = true }: LogoProps) {
  const isDarkBg = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Ícone SVG: Lupa integrada com etiqueta de desconto / seta descendente */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-800 text-white shadow-soft">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
        >
          {/* Círculo da Lupa */}
          <circle
            cx="17"
            cy="17"
            r="9"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Cabo da Lupa transformado em Tag de Desconto */}
          <path
            d="M24 24L31 31"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Seta verde de desconto/economia dentro do círculo */}
          <path
            d="M17 12V22M17 22L13.5 18.5M17 22L20.5 18.5"
            stroke="#12B76A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ponto de destaque Laranja */}
          <circle cx="28" cy="12" r="2.5" fill="#FF7A1A" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center text-xl font-extrabold tracking-tight font-display leading-none">
            <span className={isDarkBg ? 'text-white' : 'text-navy'}>Busca</span>
            <span className="text-brand-green ml-1">Descontos</span>
          </div>
          <span className={`text-[10px] font-medium tracking-wide uppercase mt-0.5 ${isDarkBg ? 'text-gray-300' : 'text-brand-muted'}`}>
            Compare e pague menos
          </span>
        </div>
      )}
    </div>
  );
}
