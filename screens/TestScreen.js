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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BigListItemComponent from '../components/BigListItemComponent';
import Test2Component from '../components/Test2Component';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import NewArriavalComponent from '../components/NewArriavalComponent';
import { Badge } from 'react-native-elements';

const dataX = [
  {
    id: 0,
    name: 'Adidas Ultra Boost',
    size: 'Size: 40',
    cost: 44.99,
    pic:
      'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ymmq6yswyxlxycdzquoi/epic-react-flyknit-2-running-shoe-B01C0P.jpg',
  },
  {
    id: 1,
    name: 'Adilette',
    size: 'Size: 40',
    cost: 25,
    pic: 'https://file.yes24.vn/Upload/ProductImage/anvietsh/1963437_L.jpg',
  },
  {
    id: 2,
    name: 'SuperStar',
    size: 'Size: 40',
    cost: 71,
    pic:
      'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ymmq6yswyxlxycdzquoi/epic-react-flyknit-2-running-shoe-B01C0P.jpg',
  },
  {
    id: 3,
    name: 'Stan Smith',
    size: 'Size: 40',
    cost: 100,
    pic:
      'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ymmq6yswyxlxycdzquoi/epic-react-flyknit-2-running-shoe-B01C0P.jpg',
  },
  {
    id: 4,
    name: 'Busenitz',
    size: 'Size: 40',
    cost: 21.4,
    pic:
      'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ymmq6yswyxlxycdzquoi/epic-react-flyknit-2-running-shoe-B01C0P.jpg',
  },
];

const TestScreen = props => {
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
    <ScrollView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View
        style={{
          height: Dimensions.get('window').height / 2,
        }}
      >
        <View style={{ position: 'absolute' }}>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 2,
            }}
            source={{
              uri:
                'https://i.pinimg.com/originals/cc/ab/5e/ccab5e910619394d2641a99a962c7517.jpg',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginTop: 40,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (!isSignIn) {
                props.navigation.navigate('Login');
                return;
              }
              props.navigation.navigate('WishList');
            }}
          >
            <View style={{ marginRight: 20 }}>
              <Ionicons name="ios-heart-empty" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isSignIn) {
                props.navigation.navigate('Login');
                return;
              }
              props.navigation.navigate('Cart');
            }}
          >
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>New Arrival</Text>
        <TouchableOpacity>
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
        <NewArriavalComponent />
      </View>

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
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Top Trends</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, color: '#2f3542' }}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <FlatList
          data={dataX}
          keyExtractor={data => data.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Test2Component item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default TestScreen;
