import fetch from 'node-fetch';
import { useCors } from 'lib/middleware';
import {decrypt, encrypt} from 'lib/crypto';
import { API_URL } from 'lib/constants';
import { getAccessToken } from 'lib/api';
import { ok, unauthorized } from "lib/response";

function isValidToken(token) {
  return token && token.expiration && Date.now() > token.expiration;
}

function parseToken(data) {
  if (!data || data === 'null') {
    return null;
  }

  try {
    return  JSON.parse(decrypt(data));
  } catch (e) {
    return null;
  }
}

export default async (req, res) => {
  await useCors(req, res);

  let bearerToken = req.headers?.authorization?.split(' ')[1];

  if (!bearerToken) {
    return unauthorized(res);
  }

  let token = parseToken(bearerToken);

  if (!isValidToken(token)) {
    token = await getAccessToken();
    bearerToken = encrypt(JSON.stringify(token));
  }

  if (!token) {
    return unauthorized(res);
  }

  const { type = 'r', id = 'all', limit = 100, sort = 'hot', after } = req.body;

  let url = `${type}/${id}`;
  const params = new URLSearchParams({ sort, limit });

  if (type === 'u') {
    url = `/user/${id}/submitted`;
    params.set('sort', 'new');
  }

  if (after) {
    params.set('after', after);
  }

  const api = `${API_URL}${url}?${params.toString()}`;

  const response = await fetch(api, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (!response.ok) {
    return res.status(response.status).end(response.statusText);
  }

  const data = await response.json();

  return ok(res, { token: bearerToken, payload: data });
};
