import { ACTION_TYPES } from "../actions/types";

const INITIAL_STATE = {
  userList: [],
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};
