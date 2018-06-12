import { getStore } from './store';

const SET_USER = 'USER/SET_USER';
const DELETE_USER = 'USER/DELETE_USER';

export function setUser(user) {
  getStore().dispatch({ type: SET_USER, user });
}

export function deleteUser() {
  getStore().dispatch({ type: DELETE_USER });
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_USER: {
      return Object.assign({}, state, action.user);
    }
    case DELETE_USER: {
      return {};
    }
    default:
      return state;
  }
}
