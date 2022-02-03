import create from 'zustand';
import produce from 'immer';
import { getItem, removeItem, request, setItem } from './web';
import { ACCESS_TOKEN } from './constants';

const initialState = {
  accessToken: getItem(ACCESS_TOKEN),
  init: Date.now(),
  items: [],
};

const configStore = create(() => ({ ...initialState }));

export async function init() {
  const token = await getAccessToken();

  setAccessToken(token);
}

export async function getAccessToken() {
  const response = await request('/api/init');

  return response.data.token;
}

export function setAccessToken(accessToken) {
  console.log(`Setting access token: ${accessToken}`);
  if (!accessToken) {
    return;
  }

  setItem(ACCESS_TOKEN, accessToken);

  configStore.setState(
    produce(configStore.getState(), draft => {
      draft.accessToken = accessToken;
    }),
  );
}

export async function reset() {
  configStore.setState(
    produce(configStore.getState(), draft => {
      draft.items = [];
    }),
  );
}

export async function load(type, id, options = {}) {
  const token = getItem(ACCESS_TOKEN);

  const { data, status } = await request('/api/load', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ type, id, ...options }),
  });

  if (status === 401) {
    removeItem(ACCESS_TOKEN);
    return;
  }

  configStore.setState(
    produce(configStore.getState(), draft => {
      if (data.kind === 'Listing') {
        const items = data.data.children.filter(
          ({ data: { is_gallery, is_self } }) => !(is_gallery || is_self),
        );
        draft.items = draft.items.concat(items);
        draft.after = data.data.after;
      }
    }),
  );
}

export default configStore;
