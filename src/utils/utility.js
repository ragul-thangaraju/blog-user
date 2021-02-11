import store from "store";

import { IS_DEVELOPMENT } from "../config/index";

export let userSessionTimer;
let sessionTime = 0;

export function myLog(...message) {
  if (IS_DEVELOPMENT) {
    console.log(...message);
  }
}

export const isLoggedIn = () => {
  if (typeof store.get("userSession") === "object") {
    if (!userSessionTimer) {
      scheduleTokenRenewal();
    }
    return true;
  }
  /**
   * if userSession object is not present return false
   **/
  return false;
};

export const logout = () => {
  store.clearAll();
  clearInterval(userSessionTimer);
  window.location.href = "/";
};

/**
 * logout user when user is not active for 20 mins
 **/
export const scheduleTokenRenewal = () => {
  sessionTime = 0;
  userSessionTimer = setInterval(() => {
    sessionTime++;
    if (sessionTime > 2400) {
      // alert("Session timeout");
      logout();
    }
  }, 1000);
};

const sessionTimeRenewal = () => {
  sessionTime = 0;
};

function keyDownTextField() {
  if (isLoggedIn()) {
    sessionTimeRenewal();
  }
}

function keyDownEvent() {
  if (isLoggedIn()) {
    sessionTimeRenewal();
  }
}

function mouseMoveEvent() {
  if (isLoggedIn()) {
    sessionTimeRenewal();
  }
}

// Listen to user keypress and reset timer
document.addEventListener("keypress", keyDownTextField, false);

// Listen to user keypress and reset timer
document.addEventListener("keydown", keyDownEvent, false);

// Listen to user keypress and reset timer
document.addEventListener("mousemove", mouseMoveEvent, false);

window.addEventListener("offline", () => {
  myLog("App is offline");
});

window.addEventListener("online", () => {
  myLog("App is online");
});
