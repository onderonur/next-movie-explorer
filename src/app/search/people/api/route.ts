import { searchPeople } from '@/search/search-fetchers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));
  const query = searchParams.get('query') ?? '';

  const peoplePage = await searchPeople({
    page,
    query,
  });

  return NextResponse.json(peoplePage);
}