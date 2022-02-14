export function log(...args) {
  if (
    process.env.NODE_ENV !== 'production' ||
    (typeof window !== 'undefined' && window.localStorage.getItem('debug'))
  ) {
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

export function isPromise(v) {
  return v && typeof v === 'object' && typeof v.then === 'function';
}

export function hasMedia(item) {
  return item && item.type && item.src;
}

export async function resolvePromises(items) {
  const promises = items.filter(({ src }) => isPromise(src));

  if (promises.length) {
    const result = await Promise.all(promises.map(({ src }) => src));

    promises.forEach((item, i) => (item.src = result[i]));
  }

  return items;
}
