export const request = (url, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  return fetch(url, {
    method,
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  }).then(res => {
    if (res.ok) {
      return res.json().then(data => ({ ok: res.ok, status: res.status, data }));
    }

    return res.text().then(data => ({ ok: res.ok, status: res.status, res: res, data }));
  });
};

export const setItem = (key, data, session) => {
  if (typeof window !== 'undefined') {
    (session ? sessionStorage : localStorage).setItem(key, JSON.stringify(data));
  }
};

export const getItem = (key, session) =>
  typeof window !== 'undefined'
    ? JSON.parse((session ? sessionStorage : localStorage).getItem(key))
    : null;

export const removeItem = (key, session) => {
  if (typeof window !== 'undefined') {
    (session ? sessionStorage : localStorage).removeItem(key);
  }
};
