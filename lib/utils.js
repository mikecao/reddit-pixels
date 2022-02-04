export function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log.apply(console.log, args);
  }
}
