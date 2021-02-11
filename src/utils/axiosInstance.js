import axios from "axios";
import store from "store";

import { API_BASE_URL } from "../config/index";
import { myLog } from "./utility";

export const axiosPrivateInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosCommonInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default class Client {
  static httpHeader(isAccessToken) {
    let date = new Date();
    let headers = {};
    headers = {
      "Content-Type": "application/json",
      offset: date.getTimezoneOffset(),
    };
    if (isAccessToken) {
      headers = {
        "Content-Type": "application/json",
        offset: date.getTimezoneOffset(),
        Authorization:
          typeof store.get("userSession") === "object"
            ? `Bearer ${store.get("userSession").token}`
            : "",
      };
    }
    return headers;
  }

  static callAPI = (config, success, failed, isPrivate) => {
    const instance = isPrivate ? axiosPrivateInstance : axiosCommonInstance;
    instance(config)
      .then((response) => {
        myLog("GET ::::::: response", response);
        success(response.data);
      })
      .catch((err) => {
        myLog("GET ::::::: err", err);
        failed(err.data);
      });
  };

  static get(url, params, isAccessToken) {
    return new Promise(function (success, failed) {
      const config = {
        method: "GET",
        url,
        params,
        headers: Client.httpHeader(isAccessToken),
      };
      myLog("GET ::::::: INPUT", config);
      Client.callAPI(config, success, failed, false);
    });
  }

  static post(url, data, isAccessToken) {
    return new Promise(function (success, failed) {
      const config = {
        method: "POST",
        url,
        data,
        headers: Client.httpHeader(isAccessToken),
      };
      myLog("POST ::::: Input", config);
      Client.callAPI(config, success, failed, false);
    });
  }

  static put(url, data, isAccessToken) {
    return new Promise(function (success, failed) {
      const config = {
        method: "PUT",
        url,
        data,
        headers: Client.httpHeader(isAccessToken),
      };
      myLog("PUT ::::::: INPUT", config);
      Client.callAPI(config, success, failed, false);
    });
  }

  static delete(url, params, isAccessToken) {
    return new Promise(function (success, failed) {
      const config = {
        method: "DELETE",
        url,
        params,
        headers: Client.httpHeader(isAccessToken),
      };
      myLog("DELETE ::::::: INPUT", config);
      Client.callAPI(config, success, failed, false);
    });
  }

  static patch(url, params, isAccessToken) {
    return new Promise(function (success, failed) {
      const config = {
        method: "PATCH",
        url,
        params,
        headers: Client.httpHeader(isAccessToken),
      };
      myLog("PATCH ::::::: INPUT", config);
      Client.callAPI(config, success, failed, false);
    });
  }
}
