import { NextResponse } from 'next/server';
import { decrypt, encrypt } from 'lib/crypto';
import { API_URL } from 'lib/constants';
import { getAccessToken } from 'lib/api';
import { log } from 'lib/utils';

export const runtime = 'nodejs';

function isValidToken(token) {
  return token && token.expiration && Date.now() < token.expiration;
}

function parseToken(data) {
  if (!data || data === 'null') {
    return null;
  }

  try {
    return JSON.parse(decrypt(data));
  } catch {
    return null;
  }
}

export async function POST(request) {
  let bearerToken = request.headers.get('authorization')?.split(' ')[1];

  if (!bearerToken) {
    return new NextResponse('401 Unauthorized', { status: 401 });
  }

  let token = parseToken(bearerToken);

  if (!isValidToken(token)) {
    token = await getAccessToken();
    bearerToken = encrypt(JSON.stringify(token));
  }

  if (!token) {
    return new NextResponse('401 Unauthorized', { status: 401 });
  }

  const { category = 'r', path = 'all', limit = 100, after } = await request.json();

  let url = `/${category}/${path}`;
  const params = new URLSearchParams({ limit: String(limit) });

  if (category === 'u') {
    url = `/user/${path}/submitted`;
    params.set('sort', 'new');
  }

  if (after) {
    params.set('after', after);
  }

  const api = `${API_URL}${url}?${params.toString()}`;

  log({ url: api, token: token.access_token });

  const response = await fetch(api, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (!response.ok) {
    return new NextResponse(response.statusText, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json({ token: bearerToken, payload: data });
}
