import create from 'zustand';
import produce from 'immer';
import { request } from './web';

const initialState = {
  token: null,
  init: Date.now(),
  items: [],
  after: null,
};

const configStore = create(() => ({ ...initialState }));

export function reset() {
  configStore.setState(
    produce(configStore.getState(), draft => {
      draft.items = [];
    }),
  );
}

export async function load(type, id, options = {}) {
  const { token } = configStore.getState();

  const { data, ok } = await request('/api/load', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ type, id, ...options }),
  });

  if (!ok) {
    return;
  }

  configStore.setState(
    produce(configStore.getState(), draft => {
      const { token, payload } = data;

      if (payload.kind === 'Listing') {
        const items = payload.data.children.filter(
          ({ data: { is_gallery, is_self } }) => !(is_gallery || is_self),
        );

        draft.token = token;
        draft.items = draft.items.concat(items);
        draft.after = payload.data.after;
      }
    }),
  );
}

export default configStore;
