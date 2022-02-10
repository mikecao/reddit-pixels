export function log(...args) {
  if (process.env.NODE_ENV !== 'production' || (window && window.localStorage.getItem('debug'))) {
    console.log.apply(console.log, args);
  }
}

export function getExtension(file) {
  if (typeof file !== 'string') {
    return '';
  }

  const match = file.match(/(\.(mp4|mov|webm|jpg|jpeg|gif|png|webp)+)$/);

  return match?.[0] || '';
}
