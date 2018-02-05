import { AppNavigator } from "../navigators/Navigation";
import { NavigationActions } from "react-navigation";
import { NAVIGATE, NAVIGATE_BACK } from "../store/types";

const firstAction = AppNavigator.router.getActionForPathAndParams("/");
const initialState = AppNavigator.router.getStateForAction(firstAction);

const navReducer = (state = initialState, action) => {
  let nextState;
  // console.log("nav red", action);

  switch (action.type) {
    case NAVIGATE_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case NAVIGATE:
      nextState = AppNavigator.router.getStateForAction(
        // NavigationActions.navigate({ routeName: action.route }),
        AppNavigator.router.getActionForPathAndParams(action.route),
        state
      );
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
