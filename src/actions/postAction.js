import { ACTION_TYPES } from "./types";
import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const getPost = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.get(API_ENDPOINT.GET_POST, params, true);
      myLog(response, "---get post response----");
      if (response.code === 0) {
        myLog("success", "---get post response----");
        dispatch({
          type: ACTION_TYPES.SET_POST,
          payload: response.data,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--get post error--");
      callback(false);
    }
  };
};

export const getPostDetails = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(
        API_ENDPOINT.GET_POST_DETAILS,
        params,
        true
      );
      myLog(response, "---get post details response----");
      if (response.code === 0) {
        myLog("success", "---get post details response----");
        callback(response, true);
      } else {
        callback("", false);
      }
    } catch (error) {
      myLog(error, "--get post details error--");
      callback(error, false);
    }
  };
};

export const addPostComments = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(
        API_ENDPOINT.ADD_POST_COMMENT,
        params,
        true
      );
      myLog(response, "---get post comment response----");
      if (response.code === 0) {
        myLog("success", "---get post comment response----");
        callback(response, true);
      } else {
        callback("", false);
      }
    } catch (error) {
      myLog(error, "--get post comment error--");
      callback(error, false);
    }
  };
};
