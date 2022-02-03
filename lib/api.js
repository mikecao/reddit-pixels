import fetch from 'node-fetch';
import { AUTH_URL } from './constants';

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

export async function getAccessToken() {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const body = 'grant_type=client_credentials';

  const response = await fetch(AUTH_URL, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();

  data.expiration = Date.now() + data.expires_in;

  return data;
}
