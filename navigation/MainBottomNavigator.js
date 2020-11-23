import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import CategoryScreen from '../screens/CategoryScreen';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-home" size={30} />,
    },
  },
  Catagory: {
    screen: CategoryScreen,
    navigationOptions: {
      tabBarLabel: 'Category',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-color-filter" size={30} />
      ),
    },
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-search" size={30} />,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={30} />,
    },
  },
});

export default TabNavigator;
