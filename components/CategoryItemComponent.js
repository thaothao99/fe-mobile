import React, { useState, useContext } from 'react';
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
  TextInput,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import WishListItemComponent from '../components/WishListItemComponent';
import ListOderComponent from '../components/ListOderComponent';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const item = {
  name: 'Running',
  img:
    'https://image-us.eva.vn/upload/4-2019/images/2019-10-15/vo-tu-thu-son-tai-han-quoc-ngoc-trinh-bi-dan-tinh-nem-da-khong-thuong-tiec-fni1552807902-1571123246-312-width600height900.jpg',
};

const styles = StyleSheet.create({
  container: {
    //width: Dimensions.get('window').width / 2.5,
    // backgroundColor: 'red',
    margin: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    height: 150,
    borderRadius: 15,
  },
  NameType: {
    fontSize: 17,
    fontWeight: '200',
    paddingTop: 5,
  },
});

const CategoryItemComponent = ({ title, img, handleOnpress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        onPress={handleOnpress}
      >
        <Image
          source={{
            uri: img,
          }}
          style={styles.image}
        />
        <Text style={styles.NameType}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CategoryItemComponent;
