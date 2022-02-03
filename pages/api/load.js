import fetch from 'node-fetch';
import { useCors } from 'lib/middleware';
import { decrypt } from 'lib/crypto';
import { API_URL } from 'lib/constants';

export default async (req, res) => {
  await useCors(req, res);

  let token = null;

  try {
    token = JSON.parse(decrypt(req.headers.authorization.split(' ')[1]));
  } catch (e) {
    console.error(e);
  }

  if (!token) {
    return res.status(401).end();
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

  return res.status(200).json(data);
};
