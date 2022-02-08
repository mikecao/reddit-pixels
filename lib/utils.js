export function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log.apply(console.log, args);
  }
}

export function getExtension(file = '') {
  const parts = file.split('.');

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }

  return parts[0];
}
