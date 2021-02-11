import store from "store";

import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const authenticate = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(API_ENDPOINT.LOGIN, params);
      myLog(response, "---login response----");
      if (response.code === 0) {
        myLog("success", "---login response----");
        store.set("userSession", response.data);
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--Login error--");
      callback(false);
    }
  };
};

export const register = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(API_ENDPOINT.REGISTER, params);
      myLog(response, "---register response----");
      if (response.code === 0) {
        myLog("success", "---register response----");
        store.set("userSession", response.data);
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--register error--");
      callback(false, error);
    }
  };
};
