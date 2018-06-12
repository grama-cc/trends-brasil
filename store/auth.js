import { getStore } from './store';

const SET_TOKENS = 'AUTH/SET_TOKENS';
const DELETE_TOKENS = 'AUTH/DELETE_TOKENS';

export function setTokens(accessToken, refreshToken) {
  getStore().dispatch({ type: SET_TOKENS, accessToken, refreshToken });
}

export function deleteTokens() {
  getStore().dispatch({ type: DELETE_TOKENS });
}

export function getAccessToken() {
  return getStore().getState().auth.accessToken;
}

export function getRefreshToken() {
  return getStore().getState().auth.refreshToken;
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKENS: {
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      });
    }
    case DELETE_TOKENS: {
      return {};
    }
    default:
      return state;
  }
}
