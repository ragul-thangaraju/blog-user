import { ACTION_TYPES } from "../actions/types";

const INITIAL_STATE = {
  postList: [],
};

export const post = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_POST:
      return {
        ...state,
        postList: action.payload,
      };
    default:
      return state;
  }
};
