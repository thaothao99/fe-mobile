import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

const ReviewComponent = ({ item }) => {
  const date = new Date(item.createdAt).toDateString();
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 5,
      }}
    >
      <View>
        <Image
          style={{
            height: Dimensions.get('window').width / 10,
            width: Dimensions.get('window').width / 10,
            borderRadius: 50,
            marginRight: 10,
          }}
          source={{
            uri: 'https://cdn.stocksnap.io/img-thumbs/960w/M5ERMO26E9.jpg',
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ flex: 1, fontSize: 17, fontWeight: 'bold' }}>
            {item.user.name}
          </Text>
          <Text style={{ fontSize: 13 }}>{date}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating
            startingValue={item.rating}
            readonly
            imageSize={15}
            style={{ paddingVertical: 10 }}
          />
          <Text style={{ marginLeft: 5, fontSize: 15, color: '#27ae60' }}>
            {item.bought ? 'Purchased' : 'Not purchased yet'}
          </Text>
        </View>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>{item.review}</Text>
      </View>
    </View>
  );
};

export default ReviewComponent;
