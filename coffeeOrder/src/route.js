const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

export const init = (routeChange) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, routeChange);
  window.addEventListener("popstate", routeChange);
};

export const changeRoute = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
