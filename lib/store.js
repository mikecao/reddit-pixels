import create from 'zustand';
import produce from 'immer';
import { getItem, removeItem, request, setItem } from './web';
import { ACCESS_TOKEN, API_URL } from './constants';

const initialState = {
  accessToken: getItem(ACCESS_TOKEN),
  init: Date.now(),
  items: [],
};

const configStore = create(() => ({ ...initialState }));

export async function init() {
  const accessToken = await getAccessToken();

  setAccessToken(accessToken);
}

export async function getAccessToken() {
  const { data } = await request('/api/init');

  return data.access_token;
}

export function setAccessToken(accessToken) {
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
  const { limit = 100, sort = 'hot', after, ...restOptions } = options;

  let url = `${type}/${id}`;
  const params = { sort, limit, after };

  if (type === 'u') {
    url = `/user/${id}/submitted`;
    params.sort = 'new';
  }

  const { data, status } = await request(
    `${API_URL}${url}?${new URLSearchParams(params).toString()}`,
    {
      ...restOptions,
      headers: { Authorization: `Bearer ${token}` },
    },
  );

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
