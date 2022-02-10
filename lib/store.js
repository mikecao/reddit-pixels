import create from 'zustand';
import produce from 'immer';
import { request } from './request';
import { log } from './utils';
import { parseItem } from './parse';

const initialState = {
  token: null,
  init: Date.now(),
  item: null,
  items: [],
  after: null,
  loading: true,
};

const configStore = create(() => ({ ...initialState }));

export function setState(data) {
  function handler(draft) {
    return { ...draft, ...data };
  }

  configStore.setState(
    produce(configStore.getState(), typeof data === 'function' ? data : handler),
  );
}

export function reset() {
  setState({ items: [], item: null });
}

export async function load(category, path, options = {}) {
  const { token } = configStore.getState();

  setState({ loading: true });

  const { data, ok } = await request('/api/load', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ category, path, ...options }),
  });

  setState({ loading: false });

  if (!ok) {
    log('Failed to load from API');
    return;
  }

  setState(draft => {
    const { token, payload } = data;

    if (payload.kind === 'Listing') {
      const items = payload.data.children
        .map(({ data }) => parseItem(data))
        .filter(({ hasMedia }) => hasMedia);

      log({ items });

      draft.token = token;
      draft.item = items[0];
      draft.items = draft.items.concat(items);
      draft.after = payload.data.after;
    }
  });
}

export default configStore;
