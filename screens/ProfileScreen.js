import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import ListButtonComponent from '../components/ListButtonComponent';
import ButtonComponent from '../components/ButtonComponent';
import AnimationViewComponent from '../components/AnimationViewComponent';
import animationSource from '../assets/personal.json';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    paddingTop: 15,
  },
  TextName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  Info: {
    padding: 5,
  },
});

const ProfileScreen = props => {
  const { isSignIn, signOut } = useContext(AuthContext);
  const { user, getMe, clearUser } = useContext(UserContext);
  useEffect(() => {
    const didBlurSubscription = props.navigation.addListener(
      'willFocus',
      () => {
        if (isSignIn) {
          getMe();
        }
      }
    );
    return () => {
      didBlurSubscription.remove();
    };
  }, [isSignIn]);

  const renderComponnet = () => {
    if (isSignIn) {
      return (
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.Image}
              source={{
                uri: 'https://cdn.stocksnap.io/img-thumbs/960w/X7BBEK50WK.jpg',
              }}
            />
          </View>
          {user && (
            <View style={{alignItems: "center"}}>
              <Text style={styles.TextName}>{user.name}</Text>
              <Text style={{ color: '#FFF' }}>{user.email}</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AnimationViewComponent
          source={animationSource}
          animationStyle={{ width: 90, height: 90 }}
          containerStyle={{
            borderRadius: 100,
            marginVertical: 15,
            backgroundColor: '#fff',
          }}
          autoPlay
        />
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{ paddingHorizontal: 80 }}
            title="Login"
            handleOnPress={() => {
              props.navigation.push('Login');
            }}
          />
        </View>
      </View>
    );
  };

  const navigateCheckLogin = (routeName, params) => () => {
    if (isSignIn) {
      props.navigation.navigate({ routeName, params });
      return;
    }
    props.navigation.navigate('Login');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.container}>
        <View
          style={{
            height: Dimensions.get('window').height / 2.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2,
              }}
              source={{
                uri: 'https://cdn.stocksnap.io/img-thumbs/960w/M5ERMO26E9.jpg',
              }}
            />
          </View>
          {renderComponnet()}
        </View>

        <View style={{ marginHorizontal: 15 }}>
          <View style={styles.Info}>
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Account"
              iconName="md-person"
              buttonStyle={{
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              handleOnPress={navigateCheckLogin('Account')}
            />
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Password"
              iconName="md-nutrition"
              buttonStyle={{
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              handleOnPress={navigateCheckLogin('Password')}
            />
          </View>

          <View style={styles.Info}>
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Order"
              iconName="md-reorder"
              buttonStyle={{
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              handleOnPress={navigateCheckLogin('Order')}
            />
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Cart"
              iconName="ios-cart"
              handleOnPress={() => {
                props.navigation.navigate('Cart');
              }}
            />
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Wish list"
              iconName="ios-heart-empty"
              handleOnPress={navigateCheckLogin('WishList')}
            />
            <ListButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1 }}
              title="Setting"
              iconName="ios-settings"
              buttonStyle={{
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              handleOnPress={() => {}}
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {isSignIn && (
              <ButtonComponent
                activeOpacity={0.8}
                containerStyle={{ flex: 1, marginTop: 30 }}
                title="Logout"
                handleOnPress={() => {
                  signOut();
                  clearUser();
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
