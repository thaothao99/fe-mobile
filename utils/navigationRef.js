import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

export const setNavigator = navigatorRef => {
  navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
export const navigateReplace = (routeName, params) => {
  navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    })
  );
};

// add other navigation functions that you need and export them

export const navigateCheckLogin = (routeName, state, params) => () => {
  if (state.isSignIn) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  } else {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
        params,
      })
    );
  }
};

export const navigatePop = (n = 1) => {
  navigator.dispatch(
    StackActions.pop({
      n,
    })
  );
};
