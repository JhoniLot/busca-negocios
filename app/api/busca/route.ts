import { NextResponse } from 'next/server';
import { buscarProdutos } from '@/lib/produtos';
import { FiltrosBusca } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || undefined;
    const categoria = searchParams.get('categoria') || undefined;
    const marca = searchParams.get('marca') || undefined;
    const loja = searchParams.get('loja') || undefined;
    const minPreco = searchParams.get('minPreco') ? Number(searchParams.get('minPreco')) : undefined;
    const maxPreco = searchParams.get('maxPreco') ? Number(searchParams.get('maxPreco')) : undefined;
    const ordem = (searchParams.get('ordem') as FiltrosBusca['ordem']) || undefined;

    // Se o token da Lomadee estiver configurado no servidor, podemos integrar chamadas de terceiros aqui:
    const lomadeeToken = process.env.LOMADEE_TOKEN;
    if (lomadeeToken && lomadeeToken !== 'seu_token_aqui_123456') {
      // Exemplo de integração futura com a API da Lomadee sem expor o token ao cliente:
      // const res = await fetch(`https://api.lomadee.com/v3/${lomadeeToken}/product/_search?keyword=${q}`);
      // ...
    }

    const filtros: FiltrosBusca = {
      termo: q,
      categoria,
      marca,
      loja,
      precoMin: minPreco,
      precoMax: maxPreco,
      ordem,
    };

    const produtos = await buscarProdutos(filtros);

    return NextResponse.json({
      sucesso: true,
      total: produtos.length,
      produtos,
    });
  } catch (error) {
    console.error('Erro na API de Busca:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao processar a busca' },
      { status: 500 }
    );
  }
}
