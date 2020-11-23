import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PickProductComponent from '../components/PickProductComponent';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import { Context as ProductContext } from '../context/ProductContext';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import sourceAnimation from '../assets/notfound.json';
import LoadingComponent from '../components/LoadingComponent';
import AnimationViewComponent from '../components/AnimationViewComponent';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationEvents } from 'react-navigation';
import { Badge } from 'react-native-elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Rating } from 'react-native-ratings';
import { ToastAndroid } from 'react-native';

const styles = StyleSheet.create({
  TextStyle: {
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2f3542',
    fontSize: 17,
    padding: 10,
    marginRight: 8,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 80,
  },
});

let isClear = true;
let actionName = '';

const ProductScreen = props => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isSignIn } = useContext(AuthContext);

  const {
    cart,
    error,
    clearError,
    loading: userLoading,
    addWishlistItem,
    addCartItem,
    setLoading: setUserLoading,
  } = useContext(UserContext);
  const {
    getProduct,
    clearProduct,
    product,
    setAppLoading,
    appLoading,
  } = useContext(ProductContext);

  const navigateCheckLogin = (routeName, params) => () => {
    isClear = false;
    if (isSignIn) {
      props.navigation.navigate({ routeName, params });
      return;
    }
    props.navigation.navigate('Login');
  };

  const productId = props.navigation.getParam('productId');

  useEffect(() => {
    if (isLoading || !product) {
      setAppLoading();
      const productId = props.navigation.getParam('productId');
      getProduct(productId);
      setIsLoading(false);
    }
    props.navigation.setParams({ navigateCheckLogin, cart });

    if (error) {
      const errDisplay = error.startsWith('Duplicate')
        ? `Product already exists in your ${actionName}`
        : error;
      ToastAndroid.showWithGravityAndOffset(
        errDisplay,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        150
      );
      clearError();
    }
  }, [cart, error]);

  const handleOnAddToCart = () => {
    setIsLoading(false);
    actionName = 'Cart';
    if (!isSignIn) {
      props.navigation.navigate('Login');
      return;
    }
    setUserLoading();
    addCartItem(selectedProduct._id);
    console.log(error);
  };

  const handleAddToWishlist = () => {
    actionName = 'Wishlist';
    if (!isSignIn) {
      props.navigation.navigate('Login');
      return;
    }
    setUserLoading();
    addWishlistItem(productId);
  };

  const handleScroll = event => {
    if (
      event.nativeEvent.contentOffset.y >
      Dimensions.get('window').height / 2.5
    ) {
      props.navigation.setParams({ isScroll: true });
      return;
    }
    props.navigation.setParams({ isScroll: false });
  };

  if (appLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponent />
      </View>
    );

  if (!product) {
    return <View></View>;
  }

  if (error && !error.startsWith('Duplicate')) {
    const errResult =
      error.startsWith('Invalid _id') ||
      error.startsWith('No document found with that ID')
        ? `Your product you find is not found`
        : `Something is wrong`;
    return (
      <View style={styles.container}>
        <AnimationViewComponent
          animationStyle={{ width: 200, height: 200 }}
          autoPlay
          source={sourceAnimation}
        />
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 10,
            }}
          >
            {`Opps! ${errResult}!`}
          </Text>
          {/* <Text style={{ textAlign: 'center' }}>
            Add somthing to make me happy:)
          </Text> */}
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <ButtonComponent
            activeOpacity={0.8}
            title="Shopping now"
            handleOnPress={() => {
              props.navigation.pop();
            }}
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        // marginTop: 15,
        // marginHorizontal: 15,
        marginBottom: 20,
        justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <NavigationEvents
        onWillBlur={() => {
          if (isClear) {
            clearProduct();
            return;
          }
          isClear = true;
        }}
      />
      {userLoading && <LoadingComponent />}
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
        <View
          style={{
            height: Dimensions.get('window').height / 2,
          }}
        >
          <View style={{ position: 'absolute' }}>
            {/* <Image
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2,
              }}
              source={{
                uri: product.imageCover,
              }}
            /> */}
            <SwiperFlatList
              autoplay
              autoplayDelay={4}
              autoplayLoop
              index={0}
              showPagination
              paginationStyleItem={{ width: 10, height: 10 }}
            >
              {product.images.map(item => {
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

          {/* <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: 40,
              marginRight: 20,
            }}
          >
            <TouchableOpacity onPress={navigateCheckLogin('WishList')}>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-heart-empty" size={25} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateCheckLogin('Cart')}>
              <View>
                <Ionicons name="ios-cart" size={25} color="black" />
                {(cart && cart.length) > 0 && (
                  <Badge
                    value={cart.length}
                    status="success"
                    containerStyle={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </> */}
        </View>

        <View style={{ marginTop: 15, marginHorizontal: 20 }}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            {/* <Image
            style={{
              height: Dimensions.get('window').height / 2.75,
              width: Dimensions.get('window').width / 1.25,
            }}
            source={{ uri: item.pic }}
          /> */}

            {/* images */}

            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {product.name}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <FontAwesome name="star" color="#fee501" size={15} />
                <FontAwesome name="star" color="#fee501" size={15} />
                <FontAwesome name="star" color="#fee501" size={15} />
                <FontAwesome name="star" color="#fee501" size={15} />
                <FontAwesome name="star-half-full" color="#fee501" size={15} /> */}

                <Rating
                  startingValue={product.ratingsAverage}
                  readonly
                  imageSize={20}
                  style={{ paddingVertical: 10 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    isClear = false;
                    props.navigation.navigate('Review', {
                      product: {
                        id: product.id,
                        rating: product.ratingsAverage,
                        nRating: product.ratingsQuantity,
                        name: product.name,
                        imageCover: product.imageCover,
                      },
                    });
                  }}
                >
                  <Text
                    style={{ marginLeft: 5, color: '#005494', fontSize: 15 }}
                  >
                    {product.ratingsQuantity &&
                      `(See ${product.ratingsQuantity} Reviews)`}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                ${product.price}
              </Text>
            </View>
          </View>

          <PickProductComponent
            variants={product.variants}
            handleOnChange={setSelectedProduct}
          />

          <View
            style={{
              marginTop: 25,
              // marginBottom: Dimensions.get('window').height / 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Description
            </Text>
            <Text
              style={{
                // color: '#C0C0C0',
                fontSize: 18,
                // textAlign: 'justify',
                // marginHorizontal: 15,
                lineHeight: 30,
              }}
            >
              {product.description}
            </Text>
          </View>

          <View style={{ height: 60 }}></View>
        </View>
      </ScrollView>

      <View
        style={{
          paddingTop: 10,
          backgroundColor: '#FFF',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -5,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
          marginHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={handleAddToWishlist}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-heart" color="red" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleOnAddToCart}
          style={{
            flex: 4,
            backgroundColor: '#2f3542',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
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
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProductScreen.navigationOptions = ({ navigation }) => {
  const {
    isScroll,
    navigateCheckLogin = () => {},
    cart,
  } = navigation.state.params;

  return {
    headerTransparent: !isScroll,
    headerStyle: {
      color: 'white',
      backgroundColor: isScroll ? '#1d1d1d' : 'transparent',
      shadowColor: isScroll ? '#1d1d1d' : 'transparent',
    },

    headerTintColor: isScroll ? '#FFF' : '#000',
    headerRight: () => {
      return (
        <View
          style={{
            // justifyContent: 'flex-end',
            flexDirection: 'row',
            // marginTop: 40,
            marginRight: 40,
          }}
        >
          <TouchableOpacity onPress={navigateCheckLogin('WishList')}>
            <View style={{ marginRight: 20 }}>
              <Ionicons
                name="ios-heart-empty"
                size={25}
                color={isScroll ? '#FFF' : 'black'}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateCheckLogin('Cart')}>
            <View>
              <Ionicons
                name="ios-cart"
                size={25}
                color={isScroll ? '#FFF' : 'black'}
              />
              {(cart && cart.length) > 0 && (
                <Badge
                  value={cart.length}
                  status="success"
                  containerStyle={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    },
  };
};
export default ProductScreen;
