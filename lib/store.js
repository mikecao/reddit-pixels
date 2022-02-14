import create from 'zustand';
import produce from 'immer';
import { request } from './request';
import { hasMedia, isPromise, log, resolvePromises } from './utils';
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
  const { token: savedToken } = configStore.getState();

  setState({ loading: true });

  const { data, ok } = await request('/api/load', {
    method: 'POST',
    headers: { Authorization: `Bearer ${savedToken}` },
    body: JSON.stringify({ category, path, ...options }),
  });

  if (!ok) {
    setState({ loading: false });
    log('Failed to load from API');
    return;
  }

  const { token, payload } = data;

  if (payload.kind === 'Listing') {
    let items = (
      await resolvePromises(payload.data.children.map(({ data }) => parseItem(data)))
    ).filter(item => hasMedia(item));

    log({ items });

    setState(draft => {
      draft.token = token;
      draft.item = items[0];
      draft.items = draft.items.concat(items);
      draft.after = payload.data.after;
    });
  }

  setState({ loading: false });
}

export default configStore;
