import { combineReducers } from "redux";
import { currentUser } from "./loginReducer";
import { user } from "./userReducer";
import { post } from "./postReducer";

/**
 * Combining all objects to redux store
 */
export default combineReducers({
  currentUser,
  user,
  post,
});
