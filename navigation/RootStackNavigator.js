import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainBottomNavigator from './MainBottomNavigator';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreeen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AccountScreen from '../screens/AccountScreen';
import PasswordScreen from '../screens/PasswordScreen';
import WishListScreen from '../screens/WishListScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import SearchScreen from '../screens/SearchScreen';
import NoficationScreen from '../screens/NoficationScreen';
import NoficationChangePasswordScreen from '../screens/NoficationChangePasswordScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import FilterScreen from '../screens/FilterScreen';
import ProductScreen from '../screens/ProductScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CategoryResultScreen from '../screens/CategoryResultScreen';
import GetInfoToOrderScreen from '../screens/GetInfoToOrderScreen';
import NoficationOrderScreen from '../screens/NoficationOrderScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';

const RootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainBottomNavigator,
      navigationOptions: () => ({
        header: null,
      }),
      // path: '',
    },
    Login: {
      screen: LoginScreeen,
      navigationOptions: () => ({
        // header: null,
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: 'Create an account',
      }),
    },
    Forgot: {
      screen: ForgotPasswordScreen,
      navigationOptions: () => ({
        title: 'Forgot Password',
      }),
    },
    Reset: {
      screen: ResetPasswordScreen,
      navigationOptions: () => ({
        header: null,
      }),
      path: 'users/resetPassword/:token',
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        title: 'ABC',
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: () => ({
        title: 'Account',
      }),
    },
    Password: {
      screen: PasswordScreen,
      navigationOptions: () => ({
        title: 'Change password',
      }),
    },
    WishList: {
      screen: WishListScreen,
      navigationOptions: () => ({
        title: 'Wish list',
      }),
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: () => ({
        title: 'Cart',
      }),
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: () => ({
        title: 'Order',
      }),
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SearchResult: {
      screen: SearchResultScreen,
      navigationOptions: () => ({
        title: 'Search Result',
      }),
    },
    Filter: {
      screen: FilterScreen,
      navigationOptions: () => ({
        title: 'Filter',
      }),
    },
    Product: {
      screen: ProductScreen,
    },
    Category: {
      screen: CategoryScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    CategoryResult: {
      screen: CategoryResultScreen,
      navigationOptions: () => ({
        // title: 'Result',
      }),
    },
    Nofication: {
      screen: NoficationScreen,
    },
    ResetPasswordSuccess: {
      screen: NoficationChangePasswordScreen,
    },
    GetInfo: {
      screen: GetInfoToOrderScreen,
      navigationOptions: () => ({
        title: 'Receiver infomation',
      }),
    },
    NoficationOrder: {
      screen: NoficationOrderScreen,
      navigationOptions: () => ({
        // header: null,
      }),
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: () => ({
        title: 'Detail',
      }),
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: () => ({
        title: 'Review',
      }),
    },
    WriteReview: {
      screen: WriteReviewScreen,
      navigationOptions: () => ({
        title: 'Write Review',
      }),
    },
  },
  {
    // initialRouteName: 'Order',
  }
);

export default createAppContainer(RootStackNavigator);
