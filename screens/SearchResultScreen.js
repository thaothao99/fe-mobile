import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import { Picker } from "native-base";
import { Context as ProductContext } from '../context/ProductContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WishListItemComponent from '../components/WishListItemComponent';
import SearchResultItemComponent from '../components/SearchResultItemComponent';
import { Ionicons } from '@expo/vector-icons';

const SearchResultScreen = props => {
  const {
    products,
    searchQuery,
    filterQuery,
    sortQuery,
    setLoading,
    sortProducts,
    searchProducts,
  } = useContext(ProductContext);
  const [sort, setSort] = useState("none");

  useEffect(() => {
    if (sortQuery) {
      let sortData = sortQuery.split('=');
      if (sortData.length > 0) setSort(sortData[1]);
    }
  }, [products]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,
        paddingBottom: 20,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17 }}>Sort</Text>
            <Picker
              mode="dropdown"
              selectedValue={sort}
              style={{ height: 30, width: 100 }}
              onValueChange={(itemValue, itemIndex) => {
                setLoading();
                setSort(itemValue);
                console.log(itemValue);
                const sortQuery = `&sort=${itemValue}`;
                sortProducts(searchQuery, filterQuery, sortQuery);
              }}
            >
              <Picker.Item label="Newest" value="newest" />
              <Picker.Item label="Highest Rating" value="hight-ratting" />
              <Picker.Item label="Price: High-Low" value="hight-price" />
              <Picker.Item label="Price: Low-High" value="low-price" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Filter');
            }}
          >
            <View
              style={{ flexDirection: 'row', paddingRight: 5, paddingTop: 4 }}
            >
              <Text style={{ fontSize: 17, paddingRight: 10 }}>Filter</Text>
              <Ionicons name={'md-color-filter'} size={22} color="#3d3d3d" />
            </View>
          </TouchableOpacity>
        </View>
        {/* ============= List ============ */}
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={data => data.id}
            renderItem={({ item }) => (
              <SearchResultItemComponent
                item={item}
                activeOpacity={0.8}
                handleOnPress={() => {
                  props.navigation.navigate('Product', { productId: item._id });
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

SearchResultScreen.navigationOptions = props => ({
  title: props.navigation.getParam('title'),
});
export default SearchResultScreen;
