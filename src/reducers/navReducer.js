import { AppNavigator } from "../Navigation";

const firstAction = AppNavigator.router.getActionForPathAndParams("Home");
const initialState = AppNavigator.router.getStateForAction(firstAction);

const navReducer = (state = initialState, action) => {
  return state;
};

export default navReducer;
