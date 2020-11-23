import React, { useState, useContext, useEffect } from 'react';
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
import { Context as AuthContext } from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WishListItemComponent from '../components/WishListItemComponent';
import ListOderComponent from '../components/ListOderComponent';
import { Context as orderContext } from '../context/OrderContext';
import LoadingComponent from '../components/LoadingComponent';
import AnimationViewComponent from '../components/AnimationViewComponent';
import sourceAnimation from '../assets/emptybox.json';

const data3 = [
  {
    id: '000001',
    date: '27/10/2019',
    status: 'Delivered',
    status: 'Delivered',
  },
];

const OrderScreen = props => {
  const { getOrders, setLoading, setAppLoading, orders, loading } = useContext(
    orderContext
  );
  useEffect(() => {
    setLoading();
    getOrders();
  }, []);
  if (orders) {
  }
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponent />
      </View>
    );
  if (!orders || (orders && !orders.length)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: 15,
          marginVertical: 80,
        }}
      >
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
            {`Opps! You don't have any order`}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {`Order something to make me happy :)`}
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,
        paddingBottom: 20,
      }}
    >
      <ScrollView>
        <View>
          <FlatList
            data={orders}
            keyExtractor={data => data._id.toString()}
            renderItem={({ item, index }) => (
              <ListOderComponent
                item={item}
                index={index}
                activeOpacity={0.5}
                handleOnPress={() => {
                  props.navigation.navigate('OrderDetail', {
                    orderId: item._id.toString(),
                  });
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;
