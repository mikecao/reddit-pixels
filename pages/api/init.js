import { getToken } from 'lib/api';
import { useCors } from 'lib/middleware';
import { encrypt } from 'lib/crypto';

let bearerToken = null;

export default async (req, res) => {
  await useCors(req, res);

  if (!bearerToken) {
    bearerToken = await getToken();
  }

  res.status(200).json({ token: encrypt(JSON.stringify(bearerToken)) });
};
