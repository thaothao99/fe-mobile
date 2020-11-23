import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import sourceAnimation from '../assets/emptybox.json';
import WishListItemComponent from '../components/WishListItemComponent';
import { NavigationEvents } from 'react-navigation';
import AnimationViewComponent from '../components/AnimationViewComponent';
import LoadingComponent from '../components/LoadingComponent';

const ScreenForTest = props => {
  const {
    wishlist,
    loading,
    getWishList,
    setLoading,
    setAppLoading,
    appLoading,
  } = useContext(UserContext);
  useEffect(() => {
    if (!wishlist) {
      setLoading();
      getWishList();
    }
  }, [wishlist]);

  const renderComponent = () => {
    if (appLoading)
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoadingComponent />
        </View>
      );

    if (!wishlist || (wishlist && !wishlist.length)) {
      return (
        <View style={styles.container}>
          <AnimationViewComponent
            animationStyle={{ width: 200, height: 200 }}
            autoPlay
            source={sourceAnimation}
          />
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            >
              Opps! Your wish list is empty
            </Text>
            <Text style={{ textAlign: 'center' }}>
              {`Add something to make me happy :)`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15 }}>
            <ButtonComponent
              activeOpacity={0.8}
              title="Shopping now"
              handleOnPress={() => {
                props.navigation.pop();
              }}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          // alignItems: 'center',
          flexGrow: 1,
          marginHorizontal: 15,
        }}
      >
        {loading && <LoadingComponent />}
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View style={{ marginTop: 15 }}>
            <FlatList
              data={wishlist}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <WishListItemComponent
                  item={item}
                  activeOpacity={0.8}
                  handleOnPress={() => {
                    props.navigation.navigate('Product', {
                      productId: item.product._id,
                    });
                  }}
                />
              )}
            />
          </View>

          <View>
            <ButtonComponent
              activeOpacity={0.8}
              containerStyle={{ flex: 1, marginTop: 30, marginBottom: 30 }}
              title="Continue shopping"
              handleOnPress={() => {
                props.navigation.pop();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <NavigationEvents
        onWillFocus={() => {
          setAppLoading();
          getWishList();
        }}
      />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 80,
  },
  totalContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
  },
  total: {
    fontSize: 20,
    textAlign: 'right',
    paddingTop: 20,
  },
});
export default ScreenForTest;
