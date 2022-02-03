import { encrypt, decrypt } from 'lib/crypto';

export default async (req, res) => {
  const enc = encrypt('hello');
  const dec = decrypt(enc);

  res.status(200).json({ enc, dec });
};
