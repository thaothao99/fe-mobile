import React, { useContext, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import ButtonComponent from './ButtonComponent';
import { Context as UserContext } from '../context/UserContext';

const WishListItemComponent = ({
  item,
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  iconName,
  ...props
}) => {
  const { removeWishlistItem, setLoading } = useContext(UserContext);
  useEffect(() => console.log(item), [])
  const handleOnSubmit = id => {
    setLoading();
    removeWishlistItem(id);
  };
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
              uri: item.product.imageCover,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: 17, fontWeight: 'bold' }}
          >
            {item.product.name}
          </Text>
          <Text style={{}}>{item.size}</Text>
          <Text
            style={{ fontWeight: 'bold' }}
          >{`$ ${item.product.price}`}</Text>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{
              flex: 1,
              width: 130,
              backgroundColor: '#FFF',
              shadowColor: 'red',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              borderWidth: 1,
              borderColor: '#2d3436',
            }}
            textStyle={{ color: '#000', marginBottom: 5 }}
            title="Remove"
            handleOnPress={() => handleOnSubmit(item._id)}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          // flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      ></View>
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
    padding: 5,
  },
});

export default WishListItemComponent;
