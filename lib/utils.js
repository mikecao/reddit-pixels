export function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log.apply(console.log, args);
  }
}

export function getExtension(file = '') {
  const match = file.match(/(\.[mp4|mov|webm|jpg|jpeg|gif|png|webp]+)$/);

  return match?.[0] || '';
}
