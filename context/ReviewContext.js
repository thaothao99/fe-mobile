import contextFactory from './contextFactory';
import apiHelper from '../utils/apiHelper';
import { navigate } from '../utils/navigationRef';

const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: true };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'GET_REVIEWS':
      console.log('reducer');
      return {
        ...state,
        loading: false,
        setAppLoading: false,
        error: '',
        reviews: action.payload,
      };
    case 'CREATE_REVIEW':
      const reviews = state.reviews
        ? [action.payload, ...state.reviews]
        : [action.payload];
      return {
        ...state,
        loading: false,
        setAppLoading: false,
        error: '',
        reviews,
      };
    case 'CLEAR_REVIEWS':
      return {
        ...state,
        reviews: null,
        loading: false,
        appLoading: false,
        error: '',
      };
    case 'SET_REVIEW_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
        appLoading: false,
      };
    case 'CLEAR_REVIEW_ERROR':
      return { ...state, error: '', loading: false, appLoading: false };
    default:
      return state;
  }
};

const setAppLoading = dispatch => async () => {
  console.log('App loading');
  dispatch({ type: 'SET_APP_LOADING' });
};

const setLoading = dispatch => () => {
  console.log('loading');
  dispatch({ type: 'SET_LOADING' });
};

const clearError = dispatch => async () => {
  console.log('loading');
  dispatch({ type: 'CLEAR_REVIEW_ERROR' });
};

const clearReviews = dispatch => () => {
  console.log('Clear reviews!');

  dispatch({ type: 'CLEAR_REVIEWS' });
};

const getReview = dispatch => async productId => {
  try {
    // console.log(`/api/v1/products/${productId}/reviews`);

    const { data } = await apiHelper.get(
      `/api/v1/products/${productId}/reviews`
    );

    dispatch({
      type: 'GET_REVIEWS',
      payload: data.data.data,
    });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_REVIEW_ERROR', payload });
  }
};

const createReview = dispatch => async (productId, { rating, review }) => {
  try {
    console.log(`/api/v1/products/${productId}/reviews`);
    if (!rating || !review) {
      throw new Error('Please rate and comment!');
    }
    const { data } = await apiHelper.post(
      `/api/v1/products/${productId}/reviews`,
      { review, rating }
    );
    console.log('Created a review!');
    dispatch({
      type: 'CREATE_REVIEW',
      payload: data.data.data,
    });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;
    console.log(error, payload);
    dispatch({ type: 'SET_REVIEW_ERROR', payload });
  }
};

export const { Provider, Context } = contextFactory(
  reviewReducer,
  {
    setLoading,
    setAppLoading,
    getReview,
    createReview,
    clearError,
    clearReviews,
  },
  {
    reviews: null,
    error: '',
    loading: false,
    appLoading: false,
  }
);
