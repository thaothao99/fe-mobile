import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

//=====================
const handleOnSubmit = () => {};
const ItemInOrderComponent = ({
  item,
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  iconName,
  ...props
}) => {
  const { variant } = item;
  const { product } = variant;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        {...props}
        onPress={handleOnPress}
        style={{
          ...styles.touchContainer,
          ...containerStyle,
          ...buttonStyle,
        }}
      >
        <View style={{ marginRight: 17 }}>
          <Image
            style={{
              width: 110,
              height: 110,
              borderRadius: 15,
            }}
            source={{
              uri: product.imageCover,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: 19, fontWeight: 'bold' }}
          >
            {product.name}
          </Text>
          <Text
            style={{ fontWeight: 'bold' }}
          >{`$  ${product.price} x ${item.quantity} Product`}</Text>
          <Text style={{}}>{`${variant.size} | ${variant.color} `}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    margin: 5,
    paddingBottom: 10,
  },
  touchContainer: {
    flex: 1,
    height: 110,
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-around',
  },
});

export default ItemInOrderComponent;
