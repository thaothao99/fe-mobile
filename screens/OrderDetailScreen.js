import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import LoadingComponent from '../components/LoadingComponent';
import trimData from '../utils/trimData';
import SearchResultItemComponent from '../components/SearchResultItemComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { Context as orderContext } from '../context/OrderContext';
import { NavigationEvents } from 'react-navigation';
import ItemInOrderComponent from '../components/ItemInOrderComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  textstyle: {
    fontSize: 18,
  },
});
data2 = [
  {
    id: 0,
    name: 'Giày loại X',
    size: 'Size: 40',
    cost: 200,
    pic:
      'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ymmq6yswyxlxycdzquoi/epic-react-flyknit-2-running-shoe-B01C0P.jpg',
  },
];
dataInfo = {
  id: '',
  date: '',
  stt: '',
  name: '',
  phone: '',
  address: '',
  cost: 200,
};
const OrderDetailScreen = props => {
  const orderId = props.navigation.getParam('orderId');
  const {
    getOrder,
    setLoading,
    setAppLoading,
    order,
    loading,
    clearDetailOrder,
  } = useContext(orderContext);
  if (order) {
    dataInfo.id = order._id.toString();
    dataInfo.date = new Date(order.createdAt).toDateString();
    dataInfo.stt = order.paid ? 'Purchased' : 'Not purchased';
    dataInfo.name = order.name;
    dataInfo.phone = order.phone;
    dataInfo.address = order.address;
    dataInfo.cost = order.price.toString();
  }
  const [isClear, setIsClear] = useState(true);
  useEffect(() => {
    const orderId = props.navigation.getParam('orderId');
    setLoading();
    getOrder(orderId);
  }, []);

  if (!order || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 15,
            borderColor: '#ecf0f1',
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          <NavigationEvents
            onWillBlur={() => {
              if (isClear) {
                clearDetailOrder();
              }
              setIsClear(true);
            }}
          />
          <Text
            style={{ fontSize: 18, fontWeight: 'bold' }}
          >{`ID: ${dataInfo.id}`}</Text>
          <Text style={styles.textstyle}>{`Order date: ${dataInfo.date}`}</Text>
          <Text style={styles.textstyle}>{`Status: ${dataInfo.stt}`}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 15,
            borderColor: '#ecf0f1',
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Receiver's information
          </Text>
          <Text style={styles.textstyle}>{`${dataInfo.name}`}</Text>
          <Text style={styles.textstyle}>{`${dataInfo.phone}`}</Text>
          <Text style={styles.textstyle}>{`${dataInfo.address}`}</Text>
        </View>
        <View style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Order 's information
          </Text>
          <View>
            <FlatList
              data={order.variants}
              keyExtractor={data => data._id.toString()}
              renderItem={({ item }) => (
                <ItemInOrderComponent
                  item={item}
                  activeOpacity={0.8}
                  handleOnPress={() => {
                    setIsClear(false);
                    props.navigation.navigate('Product', {
                      productId: item.variant.product._id.toString(),
                    });
                  }}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, textAlign: 'right', paddingTop: 20 }}>
              Total:
            </Text>
            <Text
              style={{ fontSize: 20, textAlign: 'right', paddingTop: 20 }}
            >{`$${dataInfo.cost}`}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default OrderDetailScreen;
