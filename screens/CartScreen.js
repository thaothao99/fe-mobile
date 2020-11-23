import React, { useEffect, useContext, useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import sourceAnimation from '../assets/emptybox.json';
import AnimationViewComponent from '../components/AnimationViewComponent';
import ButtonComponent from '../components/ButtonComponent';
import CartItemScreen from '../components/CartItemComponent';
import LoadingComponent from '../components/LoadingComponent';
const CartScreen = props => {
  const {
    cart,
    loading,
    getCart,
    setLoading,
    setAppLoading,
    appLoading,
  } = useContext(UserContext);
  useEffect(() => {
    if (!cart) {
      setLoading();
      getCart();
    }
  }, [cart]);

  const renderTotal = () => {
    let total = 0;
    if (!cart || !cart.length) return;
    cart.forEach(item => {
      total += item.quantity * item.variant.product.price;
    });
    return total;
  };
  const renderComponent = () => {
    if (appLoading)
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoadingComponent />
        </View>
      );

    if (!cart || (cart && !cart.length)) {
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
              Opps! Your cart is empty
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
    const price = renderTotal();
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        {loading && <LoadingComponent />}
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              // justifyContent: 'space-between',
              // alignItems: 'center',
              flexGrow: 1,
              marginHorizontal: 15,
            }}
          >
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <View style={{ marginTop: 15 }}>
                <FlatList
                  data={cart}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <CartItemScreen
                      item={item}
                      activeOpacity={0.8}
                      handleOnPress={() => {
                        props.navigation.navigate('Product', {
                          productId: item.variant.product._id,
                        });
                      }}
                    />
                  )}
                />
              </View>

              <View>
                <View style={styles.totalContainer}>
                  <Text style={styles.total}>Total:</Text>
                  <Text style={styles.total}>{` $ ${price}`}</Text>
                </View>
                <ButtonComponent
                  activeOpacity={0.8}
                  containerStyle={{ flex: 1, marginTop: 30, marginBottom: 30 }}
                  title="Proceed to ordering"
                  handleOnPress={() => {
                    props.navigation.navigate('GetInfo', { price, cart });
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <NavigationEvents
        onWillFocus={() => {
          setAppLoading();
          getCart();
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
export default CartScreen;
