import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ReviewComponent from '../components/ReviewComponent';
import { Context as ReviewContext } from '../context/ReviewContext';
import { Context as UserContext } from '../context/UserContext';
import { Context as AuthContext } from '../context/AuthContext';
import RatingChart from '../components/RatingChart';
import LoadingComponent from '../components/LoadingComponent';
import { NavigationEvents } from 'react-navigation';

const ReviewScreen = props => {
  const { getReview, reviews, loading, setLoading, clearReviews } = useContext(
    ReviewContext
  );
  const { user } = useContext(UserContext);
  const { isSignIn } = useContext(AuthContext);
  const [isClear, setIsClear] = useState(true);
  const product = props.navigation.getParam('product');
  useEffect(() => {
    // setLoading();
    getReview(product.id);
  }, []);

  // console.log(reviews);

  const isNotReviewed = () => {
    if (!reviews || !user) return true;
    const review = reviews.find(
      review => review.user._id.toString() === user._id.toString()
    );
    if (review) return false;
    return true;
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillBlur={() => {
          if (isClear) {
            clearReviews();
            return;
          }
          setIsClear(true);
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          marginVertical: 5,
          marginHorizontal: 20,
          marginBottom: isNotReviewed() ? 53 : 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        <RatingChart
          productId={product.id}
          rating={product.rating}
          nRating={product.nRating}
        />
        {/* <Text style={{ fontSize: 15, marginBottom: 0 }}>13 Reviews</Text> */}
        <FlatList
          data={reviews}
          keyExtractor={data => data._id.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return <ReviewComponent item={item} />;
          }}
        />
      </ScrollView>
      {isNotReviewed() && (
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            left: 5,
            zIndex: 2,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#1d1d1d',
              borderRadius: 10,
            }}
            onPress={() => {
              setIsClear(false);
              if (!isSignIn) {
                props.navigation.navigate('Login');
                return;
              }
              props.navigation.navigate('WriteReview', {
                product: product,
              });
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
                padding: 15,
              }}
            >
              Write Review
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReviewScreen;
