import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';

const SmallPictureComponent = ({ item, ...props }) => {
  return (
    <View style={{ height: 70, width: 90, padding: 10 }}>
      <TouchableOpacity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // onPress={handleOnPress}
        style={{
          flex: 1,
          borderRadius: 100,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 70,
              height: 50,
              borderRadius: 10,
            }}
            source={{
              uri: item,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SmallPictureComponent;
