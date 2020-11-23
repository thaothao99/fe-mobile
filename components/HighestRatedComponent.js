import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import SmallListItemComponent from './SmallListItemComponent';
import apiHelper from '../utils/apiHelper';

import { navigate } from '../utils/navigationRef';

const HighestRatedComponent = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await apiHelper.get(
      `/api/v1/products?sort=-ratingsAverage&limit=5`
    );
    setItems(data.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginBottom: 20,
          marginTop: 50,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Highest Rated</Text>
        <TouchableOpacity
          onPress={() =>
            navigate('CategoryResult', {
              search: '&sort=-ratingsAverage',
              title: 'Highest Rated',
            })
          }
        >
          <Text style={{ fontSize: 15, color: '#2f3542' }}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <FlatList
          data={items}
          keyExtractor={data => data.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <SmallListItemComponent item={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default HighestRatedComponent;
