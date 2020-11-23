import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Context as ReviewContext } from '../context/ReviewContext';
import trimData from '../utils/trimData';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationEvents } from 'react-navigation';

const WriteReviewScreen = props => {
  const { setLoading, error, clearError, createReview } = useContext(
    ReviewContext
  );

  const [rating, setRating] = useState(0);

  const product = props.navigation.getParam('product');
  const { id, imageCover, name } = product;

  const ratingCompleted = rated => {
    console.log('Rating is: ' + rated);
    setRating(rated);
  };

  const [inputData, setInputData] = useState({
    review: '',
  });

  const { review } = inputData;
  const handleOnChange = name => text => {
    setInputData({ ...inputData, [name]: text });
  };
  const handleOnSubmit = () => {
    // Trim data to clear space
    const cleanData = trimData(inputData);

    // Update data input.
    // Don't send inputData to context beacause setInputData is async fuction
    setInputData(cleanData);

    // Dismiss keyboard
    // Keyboard.dismiss();

    // Cleare error on screen
    clearError();

    // Set lottie loading
    setLoading();
    createReview(id, { rating, review });
  };

  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'space-around',
      }}
    >
      <NavigationEvents
        onWillBlur={() => {
          clearError();
        }}
      />
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            height: Dimensions.get('window').width / 4,
            width: Dimensions.get('window').width / 4,
            marginRight: 10,
          }}
          source={{
            uri: imageCover,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={3}
            // ellipsizeMode="tail"
            style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5 }}
          >
            {name}
          </Text>
        </View>
      </View>

      <View>
        <AirbnbRating
          count={5}
          defaultRating={rating}
          size={25}
          // showRating={false}
          onFinishRating={ratingCompleted}
        />

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginVertical: 10,
            fontSize: 18,
          }}
          placeholder="Write review..."
          autoCapitalize="none"
          autoCorrect={false}
          value={review}
          onChangeText={handleOnChange('review')}
        />
        {review.length < 2000 ? (
          <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
            <Text style={{ fontSize: 13, color: 'black' }}>
              {review.length}/2000
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
            <Text style={{ fontSize: 13, color: 'red' }}>
              Character limit: 2000
            </Text>
          </View>
        )}

        {error !== '' && (
          <Text style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 15 }}>
        <ButtonComponent
          activeOpacity={0.8}
          containerStyle={{ flex: 1, marginTop: 30 }}
          title="Submit Review"
          handleOnPress={handleOnSubmit}
        />
      </View>
    </View>
  );
};

export default WriteReviewScreen;
