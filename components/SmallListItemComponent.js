import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { navigate } from '../utils/navigationRef';

const SmallListItemComponent = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('Product', { productId: item.id })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: Dimensions.get('window').width / 4.5,
            width: Dimensions.get('window').width / 4.5,
          }}
        >
          <Image
            style={{
              height: Dimensions.get('window').width / 4.5,
              width: Dimensions.get('window').width / 4.5,
            }}
            source={{ uri: item.imageCover }}
          />
        </View>
        <View
          style={{
            maxWidth: Dimensions.get('window').width / 3.5,
            marginRight: 25,
            marginLeft: 15,
          }}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 17 }}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14 }}>
            ${item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SmallListItemComponent;
