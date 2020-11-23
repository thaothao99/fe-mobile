import React, { useState, useEffect } from 'react';
import apiHelper from '../utils/apiHelper';
import { View, Text } from 'react-native';
import { Rating } from 'react-native-ratings';
import { material } from 'react-native-typography';
import { FlatList } from 'react-native-gesture-handler';
import RatingChartItem from './RatingChartItem';

const RatingChart = ({ productId, rating, nRating }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const { data } = await apiHelper.get(
      `/api/v1/reviews/analysisReview/${productId}`
    );
    setData(data.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <View>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text
              style={{ ...material.display1, color: 'black' }}
            >{`${rating} `}</Text>
            <Text style={material.caption}>OUT OF 5</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Rating
              startingValue={rating}
              readonly
              imageSize={20}
              style={{ marginVertical: 5 }}
            />
            <Text>{`${nRating} reviews`}</Text>
          </View>
        </View>
      </View>
      <View style={{ alignSelf: 'center' }}>
        {data &&
          Object.keys(data)
            .reverse()
            .map(item => {
              return (
                <RatingChartItem
                  key={item}
                  rating={item}
                  percent={data[item].percentage}
                />
              );
            })}
      </View>
    </View>
  );
};

export default RatingChart;
