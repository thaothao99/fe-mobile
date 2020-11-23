import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SmallListItemComponent from '../components/SmallListItemComponent';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import NewArriavalComponent from '../components/NewArriavalComponent';
import { Badge } from 'react-native-elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import RatingChart from '../components/RatingChart';
import HighestRatedComponent from '../components/HighestRatedComponent';

const images = [
  'https://thesimplifiers.com/wp-content/uploads/2019/07/nicolas-cuestas-n1fm9ojsEu8-unsplash-1024x685.jpg',
  'https://megamobile.pk/wp-content/uploads/2019/09/photo-1549298916-f52d724204b4.jpg',
  'https://cdn.shopify.com/s/files/1/0247/0245/1796/products/air-jordan-design-footwear-1598505_1200x1200.jpg?v=1556428513',
  'http://netblogtips.com/wp-content/uploads/2019/07/photo-1552346154-21d32810aba3.jpg',
];

const TestScreen = props => {
  const navigateCheckLogin = (routeName, params) => () => {
    if (isSignIn) {
      props.navigation.navigate({ routeName, params });
      return;
    }
    props.navigation.navigate('Login');
  };

  const { isSignIn, tryLocalSignIn, setLoading: setAuthLoading } = useContext(
    AuthContext
  );
  const { cart, getMe, getCart, setLoading: setUserLoading } = useContext(
    UserContext
  );
  useEffect(() => {
    setAuthLoading();
    tryLocalSignIn();
    if (isSignIn) {
      setUserLoading();
      getMe();
      getCart();
    }
  }, [isSignIn]);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View
        style={{
          height: Dimensions.get('window').height / 2,
        }}
      >
        <View style={{ position: 'absolute' }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={0}
            showPagination
            paginationStyleItem={{ width: 10, height: 10 }}
          >
            {images.map(item => {
              return (
                <Image
                  key={item}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 2,
                  }}
                  source={{
                    uri: item,
                  }}
                />
              );
            })}
          </SwiperFlatList>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginTop: 50, // 40
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={navigateCheckLogin('WishList')}>
            <View style={{ marginRight: 20 }}>
              <Ionicons name="ios-heart-empty" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateCheckLogin('Cart')}>
            <View>
              <Ionicons name="ios-cart" size={25} color="white" />
              {(cart && cart.length) > 0 && (
                <Badge
                  value={cart.length}
                  status="success"
                  containerStyle={{ position: 'absolute', top: -8, right: -8 }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <NewArriavalComponent />
      <HighestRatedComponent />
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
});

export default TestScreen;
