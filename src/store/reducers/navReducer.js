import { AppNavigator } from '../../navigation/Navigation';
import { NavigationActions } from 'react-navigation';
import { NAVIGATE, NAVIGATE_BACK } from '../actions/actionTypes';

const firstAction = AppNavigator.router.getActionForPathAndParams('/');
const initialState = AppNavigator.router.getStateForAction(firstAction);

export const navReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case NAVIGATE_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case NAVIGATE:
      nextState = AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams(action.route),
        action.reset ? initialState : state
      );
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

