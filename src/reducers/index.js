import { combineReducers } from "redux";
import { currentUser } from "./loginReducer";
import { post } from "./postReducer";

/**
 * Combining all objects to redux store
 */
export default combineReducers({
  currentUser,
  post,
});
