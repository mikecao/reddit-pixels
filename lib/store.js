import create from 'zustand';
import produce from 'immer';
import { request } from './request';
import { log } from './utils';

const initialState = {
  token: null,
  init: Date.now(),
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
  setState({ items: [], index: 0 });
}

export async function load(type, id, options = {}) {
  const { token } = configStore.getState();

  setState({ loading: true });

  const { data, ok } = await request('/api/load', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ type, id, ...options }),
  });

  setState({ loading: false });

  if (!ok) {
    log('Failed to load from API');
    return;
  }

  setState(draft => {
    const { token, payload } = data;

    if (payload.kind === 'Listing') {
      const items = payload.data.children.filter(
        ({ data: { is_gallery, is_self } }) => !(is_gallery || is_self),
      );

      log({ items });

      draft.token = token;
      draft.items = draft.items.concat(items);
      draft.after = payload.data.after;
    }
  });
}

export default configStore;
