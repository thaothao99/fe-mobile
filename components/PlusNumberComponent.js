import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Context as UserContext } from '../context/UserContext';

const PlusNumberComponent = ({ quantity, id }) => {
  const initialNum = quantity > 0 ? quantity : 1;
  const [number, setNumber] = useState(initialNum);
  const { updateQuantityCartItem, setLoading } = useContext(UserContext);
  const handleOnPress = num => {
    if (number <= 1 && num < 0) return;
    const nextNumber = number + num;
    setNumber(nextNumber);
    setLoading();
    updateQuantityCartItem(id, nextNumber);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            handleOnPress(-1);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            width: 15,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: '#ecf0f1',
          }}
        >
          <Text style={{ fontSize: 15 }}>-</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 15,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#ecf0f1',
        }}
      >
        {number}
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleOnPress(1);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 15,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: '#ecf0f1',
          }}
        >
          <Text style={{ fontSize: 15 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlusNumberComponent;
