import contextFactory from './contextFactory';
import apiHelper from '../utils/apiHelper';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: true };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'GET_ME':
      return {
        ...state,
        user: action.payload,
        loading: false,
        appLoading: false,
        error: '',
      };
    case 'UPDATE_ME':
      return { ...state, users: action.payload, loading: false };
    case 'GET_CART_ITEMS':
      return {
        ...state,
        cart: action.payload,
        loading: false,
        appLoading: false,
      };
    case 'ADD_CART_ITEM':
      let cart = [...state.cart, action.payload];
      return { ...state, cart: cart, loading: false };
    case 'UPDATE_CART_ITEM':
      cart = state.cart.map(item => {
        if (item._id !== action.payload.id) return item;
        item.quantity = action.payload.quantity;
        return item;
      });
      return { ...state, cart: cart, loading: false };
    case 'REMOVE_CART_ITEM':
      cart = state.cart.filter(item => item._id !== action.payload);
      return { ...state, cart: cart, loading: false };
    case 'GET_WISHLIST_ITEMS':
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
        appLoading: false,
      };
    case 'REMOVE_WISHLIST_ITEMS':
      let wishlist = state.wishlist.filter(item => item._id !== action.payload);
      return { ...state, wishlist: wishlist, loading: false };
    case 'ADD_WISHLIST_ITEM':
      wishlist = state.wishlist
        ? [...state.wishlist, action.payload]
        : [action.payload];
      return { ...state, wishlist: wishlist, loading: false };
    case 'SET_USER_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
        appLoading: false,
      };
    case 'CLEAR_USER_ERROR':
      return { ...state, error: '', loading: false, appLoading: false };
    case 'CLEAR_USER':
      return {
        ...state,
        error: '',
        loading: false,
        appLoading: false,
        user: null,
        cart: null,
        wishlist: null,
      };
    default:
      return state;
  }
};

const getMe = dispatch => async () => {
  try {
    const { data } = await apiHelper.get(`/api/v1/users/me`);
    console.log('Get me!');

    dispatch({ type: 'GET_ME', payload: data.data.data });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const updateMe = dispatch => async ({ name, phone, address }) => {
  try {
    if (!name || !phone || !address) {
      throw new Error('Please tell us your infomation');
    }
    const { data } = await apiHelper.patch(`/api/v1/users/updateMe`, {
      name,
      phone,
      address,
    });
    console.log(data.data.user);

    dispatch({ type: 'UPDATE_ME', payload: data.data.user });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const clearError = dispatch => () => {
  dispatch({ type: 'CLEAR_USER_ERROR' });
};

const setLoading = dispatch => async () => {
  console.log('loading');

  dispatch({ type: 'SET_LOADING' });
};

const clearUser = dispatch => async () => {
  dispatch({ type: 'CLEAR_USER' });
};

const setAppLoading = dispatch => async () => {
  console.log('App loading');

  dispatch({ type: 'SET_APP_LOADING' });
};

const getCart = dispatch => async () => {
  try {
    const { data } = await apiHelper.get(`/api/v1/users/cart`);
    console.log('Get cart!', data.data.data.length);

    dispatch({ type: 'GET_CART_ITEMS', payload: data.data.data });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const addCartItem = dispatch => async variantId => {
  try {
    const { data } = await apiHelper.post(`/api/v1/users/cart`, {
      variant: variantId,
      quantity: 1,
    });
    console.log('Add to cart!');

    dispatch({ type: 'ADD_CART_ITEM', payload: data.data.data });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const removeCartItems = dispatch => async id => {
  try {
    await apiHelper.delete(`/api/v1/users/cart/${id}`);

    dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const updateQuantityCartItem = dispatch => async (id, quantity) => {
  console.log(id, quantity);

  try {
    await apiHelper.patch(`/api/v1/users/cart/${id}`, { quantity });

    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: { id, quantity },
    });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const getWishList = dispatch => async () => {
  try {
    const { data } = await apiHelper.get(`/api/v1/users/wishlist`);
    console.log('Get wishlist!', data.data.data.length);

    dispatch({ type: 'GET_WISHLIST_ITEMS', payload: data.data.data });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const addWishlistItem = dispatch => async productId => {
  try {
    const { data } = await apiHelper.post(`/api/v1/users/wishlist`, {
      product: productId,
    });
    console.log('Add wishlist!');

    dispatch({ type: 'ADD_WISHLIST_ITEM', payload: data.data.data });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const removeWishlistItem = dispatch => async id => {
  try {
    await apiHelper.delete(`/api/v1/users/wishlist/${id}`);

    dispatch({ type: 'REMOVE_WISHLIST_ITEMS', payload: id });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

export const { Provider, Context } = contextFactory(
  userReducer,
  {
    getMe,
    updateMe,
    clearError,
    setLoading,
    getCart,
    addCartItem,
    removeCartItems,
    setAppLoading,
    updateQuantityCartItem,
    getWishList,
    addWishlistItem,
    removeWishlistItem,
    clearUser,
  },
  {
    cart: null,
    user: null,
    wishlist: null,
    error: '',
    loading: false,
    appLoading: false,
  }
);
