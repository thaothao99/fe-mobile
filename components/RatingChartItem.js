import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const RatingChartItem = ({ rating, percent }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      }}
    >
      <Text style={{ fontSize: 17 }}>{rating}</Text>
      <View style={{ marginLeft: 10 }}>
        <FontAwesome name="star" size={17} color="#f1c40f" />
      </View>
      <View style={{ justifyContent: 'center', marginHorizontal: 14 }}>
        <Progress.Bar
          progress={percent}
          width={Dimensions.get('window').width - 150}
          height={6}
          borderColor={'transparent'}
          color={'#1d1d1d'}
          unfilledColor={'#dfe6e9'}
        />
      </View>
      <Text style={{ fontSize: 17 }}>{`${percent * 100}%`}</Text>
    </View>
  );
};

export default RatingChartItem;
