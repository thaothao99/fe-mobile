import { AsyncStorage, Linking } from 'react-native';
import contextFactory from './contextFactory';
import apiHelper from '../utils/apiHelper';
import { navigateReplace } from '../utils/navigationRef';
import * as WebBrowser from 'expo-web-browser';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        token: action.payload,
        error: '',
        isSignIn: true,
        loading: false,
      };
    case 'SET_AUTH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_AUTH_ERROR':
      return { ...state, error: '', loading: false };
    case 'TRY_LOGIN_FAIL':
      return { ...state, loading: false };
    case 'RESET_PASSWORD':
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        error: '',
        token: '',
        loading: false,
        isSignIn: false,
      };
    case 'LOG_OUT':
      return {
        ...state,
        error: '',
        token: '',
        isSignIn: false,
        loading: false,
      };
    default:
      return state;
  }
};

const singInGG = dispatch => {
  return async () => {
    try {
      const API_URL = 'http://sonnguy3n.info:4000'
      const endpointGG = 'auth/google'
      // const token = await Linking.openURL(`${API_URL}/${endpointGG}`)

      const redirectUrl = await Linking.getInitialURL()

      WebBrowser.openAuthSessionAsync(`${API_URL}/${endpointGG}`, redirectUrl).then(async (res) => {
        const { url } = res
        let tokenRes
        tokenRes = url && url.split('=')[1]
        if (tokenRes && tokenRes.slice(-1) === '#') {
          tokenRes = tokenRes.slice(0, -1)
        }
        if (tokenRes && tokenRes === 'false') {
          dispatch({ type: 'SET_AUTH_ERROR', payload: 'Email not found! Please signup!' });
        }
        else {
          await AsyncStorage.setItem('token', tokenRes);
          dispatch({ type: 'LOGIN_SUCCESS', payload: '' });
          // navigate("Main");
          navigateReplace('Main');

        }
        // console.log(url, tokenRes)

      })

    } catch (error) {
      const payload = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: 'SET_AUTH_ERROR', payload });
    }
  }
}
const signIn = dispatch => {
  return async ({ username, password }) => {
    // TODO: 10/07/19  Check email and password not empty string
    try {
      if (!username || !password) {
        throw new Error('Please enter username and password!');
      }
      const { data } = await apiHelper.post('/account/login', {
        username,
        password,
      });
      await AsyncStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      // navigate("Main");
      navigateReplace('Main');
    } catch (error) {
      const payload = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: 'SET_AUTH_ERROR', payload });
    }
  };
};

const signUp = dispatch => async ({
  username,
  email,
  password,
  passwordConfirm,
}) => {
  // TODO: 10/07/19  Check email and password not empty string
  try {
    if (!username || !email || !password) {
      throw new Error('Please enter name, email and password!');
    }
    if (password !== passwordConfirm) throw new Error('The password confirmation does not match!');
    const { data } = await apiHelper.post('account/create', {
      username,
      email,
      password,
    });
    await AsyncStorage.setItem('token', data.token);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: data });
    // navigate("Main");
    navigateReplace('Main');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_AUTH_ERROR', payload });
  }
};
const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    // navigateReplace("Main");
    return;
  }
  dispatch({ type: 'TRY_LOGIN_FAIL' });
};

const clearError = dispatch => () => {
  dispatch({ type: 'CLEAR_AUTH_ERROR' });
};

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'LOG_OUT' });
  navigateReplace('Main');
};
const forgotPassword = dispatch => async ({ email }) => {
  try {
    if (!email) {
      throw new Error('Please enter email !');
    }

    await apiHelper.post('/api/v1/users/forgotPassword', {
      email,
    });

    navigateReplace('Nofication');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_AUTH_ERROR', payload });
  }
};

const setLoading = dispatch => async () => {
  dispatch({ type: 'SET_LOADING' });
};

const resetPassword = dispatch => async ({
  password,
  passwordConfirm,
  token,
}) => {
  try {
    if (!password || !passwordConfirm) {
      throw new Error('Please enter new password and password confirm!');
    }
    console.log(`/api/v1/users/resetPassword/${token}`);
    await apiHelper.patch(`/api/v1/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
    dispatch({ type: 'RESET_PASSWORD' });

    navigateReplace('ResetPasswordSuccess');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_AUTH_ERROR', payload });
  }
};

const updatePassword = dispatch => async ({
  passwordCurrent,
  password,
  passwordConfirm,
}) => {
  try {
    if (!passwordCurrent || !password || !passwordConfirm) {
      throw new Error('Please enter password and and new password!');
    }
    if (passwordConfirm !== password) {
      throw new Error('The password confirmation does not match!')
    }
    if (passwordCurrent == password) {
      throw new Error("New password cannot be the same as the old password!")
    }

    await apiHelper.post(`/account/updatePass`, {
      passwordCurrent,
      password,
    });
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'UPDATE_PASSWORD' });

    navigateReplace('ResetPasswordSuccess');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_AUTH_ERROR', payload });
  }
};

export const { Provider, Context } = contextFactory(
  authReducer,
  {
    signIn,
    signUp,
    signOut,
    clearError,
    tryLocalSignIn,
    forgotPassword,
    setLoading,
    resetPassword,
    updatePassword,
    singInGG
  },
  { isSignIn: false, token: null, error: '', loading: false }
);
