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
const SearchResultItemComponent = ({
  item,
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  iconName,
  ...props
}) => {
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
              uri: item.imageCover,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: 19, fontWeight: 'bold' }}
          >
            {item.name}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>{'$' + item.price}</Text>
          <View style={{ justifyContent: 'flex-start' }}>
            <Rating
              imageSize={20}
              fractions={2}
              readonly
              showRating={false}
              startingValue={item.ratingsAverage}
              style={{
                paddingVertical: 0,
                margin: 0,
                width: 100,
              }}
            />
          </View>
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
    padding: 5,
  },
});

export default SearchResultItemComponent;
