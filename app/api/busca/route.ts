import { NextResponse } from 'next/server';
import { PRODUTOS } from '@/lib/produtos';

export async function GET() {
  return NextResponse.json({
    sucesso: true,
    total: PRODUTOS.length,
    produtos: PRODUTOS,
  });
}
