import crypto from 'crypto';
const algorithm = 'aes-256-gcm';
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;

const secret = crypto.createHash('sha512').update(String(process.env.SECRET)).digest('hex');

function getKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
}

export function encrypt(value) {
  const iv = crypto.randomBytes(ivLength);
  const salt = crypto.randomBytes(saltLength);
  const key = getKey(secret, salt);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

export function decrypt(value) {
  const str = Buffer.from(String(value), 'base64');
  const salt = str.slice(0, saltLength);
  const iv = str.slice(saltLength, tagPosition);
  const tag = str.slice(tagPosition, encryptedPosition);
  const encrypted = str.slice(encryptedPosition);

  const key = getKey(secret, salt);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final('utf8');
}
