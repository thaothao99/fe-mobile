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
  Dimensions,
} from 'react-native';
import { Context as ProductContext } from '../context/ProductContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import WishListItemComponent from '../components/WishListItemComponent';
import SearchResultItemComponent from '../components/SearchResultItemComponent';
import FilterItemComponent from '../components/FilterItemComponent';
import ListButtonComponent from '../components/ListButtonComponent';
import { CheckBox } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import trimData from '../utils/trimData';

const styles = StyleSheet.create({
  titleName: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  price: {
    fontSize: 20,
    marginLeft: 5,
    flex: 1,
    // borderWidth: 0.3,
    borderBottomWidth: 2,
    // borderRadius: 15,
    padding: 3,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
});

const FilterScreen = props => {
  const initBrands = {
    nike: { name: 'Nike', checked: false },
    adidas: { name: 'Adidas', checked: false },
    reebok: { name: 'Reebok', checked: false },
    bitis: { name: "Biti's", checked: false },
    converse: { name: 'Converse', checked: false },
    vans: { name: 'Vans', checked: false },
    timberland: { name: 'Timberland', checked: false },
    underArmor: { name: 'Under Armor', checked: false },
  };
  const initInputData = {
    minPrice: '',
    maxPrice: '',
  };

  const [brands, setBrands] = useState(initBrands);
  const [rating, setRating] = useState(0);
  const [inputData, setInputData] = useState(initInputData);
  const [error, setError] = useState('');
  const {
    filterProducts,
    searchQuery,
    sortQuery,
    clearFilter,
    filter,
  } = useContext(ProductContext);

  useEffect(() => {
    if (filter) {
      setBrands(filter.brands);
      setInputData(filter.inputData);
      setRating(filter.rating);
    }
  }, []);

  const { minPrice, maxPrice } = inputData;

  const handleOnChange = name => text => {
    setInputData({ ...inputData, [name]: text });
  };

  const handleOnCheck = brand => {
    nextBrands = { ...brands };
    nextBrands[brand].checked = !nextBrands[brand].checked;
    setBrands(nextBrands);
  };

  const onClearFilter = () => {
    setBrands(initBrands);
    setRating(0);
    setInputData(initInputData);
    clearFilter(searchQuery, sortQuery);
  };
  const handleOnPress = () => {
    const { minPrice, maxPrice } = trimData(inputData);
    const regex = new RegExp(/^\d+$/);
    if (minPrice || maxPrice) {
      if (minPrice && maxPrice && minPrice > maxPrice) {
        setError('Min price must is low than max price');
        return;
      }
      if (
        (minPrice && !regex.test(minPrice)) ||
        (maxPrice && !regex.test(maxPrice))
      ) {
        setError('Price must is a number!');
        return;
      }
    }

    let filterQuery = '';

    if (minPrice) filterQuery = filterQuery + `&price[gte]=${minPrice}`;
    if (maxPrice) filterQuery = filterQuery + `&price[lte]=${maxPrice}`;
    if (rating > 0)
      filterQuery = filterQuery + `&ratingsAverage[gte]=${rating}`;
    Object.keys(brands).forEach(key => {
      if (brands[key].checked)
        filterQuery = filterQuery + `&brand=${brands[key].name}`;
    });
    console.log(`filterQuery: ${filterQuery}`);
    const newFilter = { brands, inputData, rating };
    filterProducts(searchQuery, filterQuery, sortQuery, newFilter);
  };

  const ratingCompleted = rated => {
    console.log('Rating is: ' + rated);
    setRating(rated);
  };
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        margin: 10,
        // alignItems: 'center',
      }}
    >
      {/* ========== Chose Price ============ */}
      <Text style={styles.titleName}>Price Range</Text>
      <View style={styles.priceContainer}>
        <View style={styles.price}>
          <Text style={{ fontSize: 15, paddingTop: 4, paddingLeft: 7 }}>$</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Lowest price"
            style={{ paddingLeft: 5 }}
            value={minPrice}
            onChangeText={handleOnChange('minPrice')}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> - </Text>
        <View style={styles.price}>
          <Text style={{ fontSize: 15, paddingTop: 4, paddingLeft: 7 }}>$</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Highest price"
            style={{ paddingLeft: 5 }}
            value={maxPrice}
            onChangeText={handleOnChange('maxPrice')}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}
      >
        {error !== '' && <Text style={{ color: '#e74c3c' }}>{error}</Text>}
      </View>

      {/* ========== Chose Size =============== */}
      <Text style={styles.titleName}>Rating from</Text>
      <View
        style={{
          width: Dimensions.get('window').width - 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <AirbnbRating
          count={5}
          defaultRating={rating}
          size={35}
          showRating={false}
          onFinishRating={ratingCompleted}
        />
      </View>
      {/* ============ Chose brand =========== */}
      <Text style={styles.titleName}>Brand</Text>
      <FlatList
        data={Object.keys(brands)}
        renderItem={({ item }) => {
          return (
            <CheckBox
              title={brands[item].name}
              checked={brands[item].checked}
              onPress={() => handleOnCheck(item)}
            />
          );
        }}
        keyExtractor={brands => brands}
      />
      {/* ============ Button ================== */}
      <View style={{ flexDirection: 'row' }}>
        <ButtonComponent
          activeOpacity={0.8}
          containerStyle={{
            flex: 1,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#1d1d1d',
            marginHorizontal: 2,
          }}
          title="Apply"
          handleOnPress={handleOnPress}
        />
        <ButtonComponent
          activeOpacity={0.8}
          containerStyle={{
            marginHorizontal: 2,
            flex: 1,
            marginTop: 10,
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#2d3436',
          }}
          title="Clear"
          textStyle={{ color: '#000' }}
          handleOnPress={onClearFilter}
        />

        {/* <ButtonComponent
          activeOpacity={0.8}
          containerStyle={{
            flex: 1,
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#2d3436',
          }}
          textStyle={{ color: '#000' }}
          title="Remove"
          handleOnPress={() => {}}
        /> */}
      </View>
    </View>
  );
};

export default FilterScreen;
