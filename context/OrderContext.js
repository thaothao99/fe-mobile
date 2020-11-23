import contextFactory from './contextFactory';
import apiHelper from '../utils/apiHelper';
import { navigate, navigateReplace } from '../utils/navigationRef';

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: true };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'GET_ORDERS':
      return {
        ...state,
        loading: false,
        setAppLoading: false,
        error: '',
        orders: action.payload,
      };
    case 'GET_ORDER':
      return {
        ...state,
        loading: false,
        setAppLoading: false,
        error: '',
        order: action.payload,
      };
    case 'SET_ORDER_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
        appLoading: false,
      };
    case 'CLEAR_DETAIL_ORDER':
      return {
        ...state,
        error: '',
        appLoading: '',
        loading: '',
        order: null,
      };
    case 'CREATE_ORDER':
      return {
        ...state,
        error: '',
        appLoading: '',
        loading: '',
      };
    case 'CLEAR_ORDER_ERROR':
      return { ...state, error: '', loading: false, appLoading: false };
    default:
      return state;
  }
};

const setAppLoading = dispatch => async () => {
  console.log('App loading');
  dispatch({ type: 'SET_APP_LOADING' });
};

const setLoading = dispatch => async () => {
  console.log('loading');
  dispatch({ type: 'SET_LOADING' });
};

const getOrders = dispatch => async () => {
  try {
    console.log(`/api/v1/users/order`);

    const { data } = await apiHelper.get(`/api/v1/users/order`);

    dispatch({
      type: 'GET_ORDERS',
      payload: data.data.data,
    });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_ORDER_ERROR', payload });
  }
};

const getOrder = dispatch => async orderId => {
  try {
    console.log(`/api/v1/orders/${orderId}`);

    const { data } = await apiHelper.get(`/api/v1/orders/${orderId}`);

    dispatch({
      type: 'GET_ORDER',
      payload: data.data.data,
    });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_ORDER_ERROR', payload });
  }
};
const createOrder = dispatch => async ({
  name,
  phone,
  address,
  variants,
  price,
}) => {
  try {
    if (!name || !phone || !address) {
      throw new Error('Please enter name, phone and address!');
    }
    console.log(`/api/v1/users/order`);
    // console.log({
    //   name,
    //   phone,
    //   address,
    //   variants,
    //   price,
    // });

    const { data } = await apiHelper.post('/api/v1/users/order', {
      name,
      phone,
      address,
      variants,
      price,
    });
    dispatch({
      type: 'CREATE_ORDER',
      payload: data.data.data,
    });
    navigateReplace('NoficationOrder');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_ORDER_ERROR', payload });
  }
};

const clearDetailOrder = dispatch => () => {
  dispatch({ type: 'CLEAR_DETAIL_ORDER' });
};
const clearError = dispatch => () => {
  dispatch({ type: 'CLEAR_ORDER_ERROR' });
};

export const { Provider, Context } = contextFactory(
  orderReducer,
  {
    createOrder,
    getOrder,
    getOrders,
    setLoading,
    setAppLoading,
    clearDetailOrder,
    clearError,
  },
  {
    orders: null,
    order: null,
    error: '',
    loading: false,
    appLoading: false,
  }
);
