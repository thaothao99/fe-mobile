import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import apiHelper from '../utils/apiHelper';
import BigListItemComponent from './BigListItemComponent';
import { navigate } from '../utils/navigationRef';

const NewArriavalComponent = props => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await apiHelper.get(`/product/new-arrival`);
    // console.log(data)
    setItems(data);
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
          margin: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>New Arrival</Text>
        <TouchableOpacity
          onPress={() =>
            navigate('CategoryResult', {
              search: '',
              title: 'New Arrival',
            })
          }
        >
          <Text style={{ fontSize: 15, color: '#2f3542' }}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 20 }}>
        {/* <FlatList
          data={dataX}
          keyExtractor={data => data.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <BigListItemComponent item={item} />;
          }}
        /> */}

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <BigListItemComponent item={item} isLoading={isLoading} />;
          }}
        />
      </View>
    </View>
  );
};

export default NewArriavalComponent;
