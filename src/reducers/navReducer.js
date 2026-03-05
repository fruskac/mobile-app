import { NAVIGATE, NAVIGATE_BACK } from "../actions/actionTypes";

let routeCounter = 0;

function createRoute(routeName, params = {}) {
  routeCounter += 1;
  return {
    key: `${routeName}-${routeCounter}`,
    routeName,
    params
  };
}

function createHomeState() {
  return {
    index: 0,
    routes: [createRoute("Home")]
  };
}

function parseRoute(path) {
  if (typeof path !== "string") {
    return { routeName: "Home", params: {} };
  }

  const normalized = path.replace(/^\/+/, "");

  if (normalized === "" || normalized === "home") {
    return { routeName: "Home", params: {} };
  }

  if (normalized === "news") {
    return { routeName: "News", params: {} };
  }

  if (normalized.startsWith("news/")) {
    const id = normalized.slice("news/".length);
    return { routeName: "SingleNews", params: { id } };
  }

  if (normalized === "map") {
    return { routeName: "Map", params: {} };
  }

  if (normalized === "locations") {
    return { routeName: "Locations", params: {} };
  }

  if (normalized.startsWith("location-single/")) {
    const id = normalized.slice("location-single/".length);
    return { routeName: "LocationSingle", params: { id } };
  }

  if (normalized.startsWith("location/")) {
    const id = normalized.slice("location/".length);
    return { routeName: "LocationTypePlace", params: { id } };
  }

  if (normalized === "trails") {
    return { routeName: "Trails", params: {} };
  }

  if (normalized === "info") {
    return { routeName: "Info", params: {} };
  }

  if (normalized === "donate") {
    return { routeName: "Donate", params: {} };
  }

  return { routeName: "Home", params: {} };
}

const initialState = createHomeState();

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE_BACK: {
      if (!state.routes || state.routes.length <= 1) {
        return state;
      }
      const routes = state.routes.slice(0, -1);
      return {
        ...state,
        routes,
        index: routes.length - 1
      };
    }
    case NAVIGATE: {
      const target = parseRoute(action.route);

      if (action.reset) {
        if (target.routeName === "Home") {
          return createHomeState();
        }
        return {
          index: 1,
          routes: [createRoute("Home"), createRoute(target.routeName, target.params)]
        };
      }

      const routes = (state.routes || []).concat(
        createRoute(target.routeName, target.params)
      );
      return {
        ...state,
        routes,
        index: routes.length - 1
      };
    }
    default:
      return state;
  }
};

export default navReducer;
