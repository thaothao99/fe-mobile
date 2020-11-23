import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { withTheme } from 'react-native-elements';

const SelectItemComponent = ({ att, active, type, handlePress }) => {
  const minWidth = type === 'color' ? 65 : 45;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? '2f3542' : '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {/* <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: active ? 3 : 0,
          backgroundColor,
        }}
      > */}
      <Text
        style={{
          // backgroundColor: 'white',
          textAlign: 'center',
          backgroundColor: active ? '#2f3542' : '#FFF',
          color: active ? '#FFF' : '#000',
          padding: 8,
          borderWidth: 1,
          borderRadius: 7,
          borderColor: '#2f3542',
          fontSize: 17,
          marginRight: 8,
          marginVertical: 5,
          minWidth,
        }}
      >
        {type === 'color' ? att.charAt(0).toUpperCase() + att.slice(1) : att}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectItemComponent;
