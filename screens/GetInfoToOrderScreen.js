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
  ToastAndroid,
} from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import LoadingComponent from '../components/LoadingComponent';
import trimData from '../utils/trimData';
import { Context as orderContext } from '../context/OrderContext';

const GetInfoToOrderScreen = props => {
  const [inputData, setInputData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const {
    user,

    loading,
    updateMe,
    getMe,

    setLoading,
  } = useContext(UserContext);
  const { createOrder, error, clearError } = useContext(orderContext);

  const price = props.navigation.getParam('price');
  let variants = props.navigation.getParam('cart');
  variants = variants.map(item => {
    return {
      variant: item.variant._id.toString(),
      quantity: item.quantity,
    };
  });

  useEffect(() => {
    if (!user) {
      setLoading();
      getMe();
      setInputData({ ...inputData, user });
    } else {
      const { name = '', phone = '', address = '' } = user;
      setInputData({ ...inputData, name, phone, address });
    }
    if (error) {
      ToastAndroid.showWithGravityAndOffset(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        150
      );
      clearError();
    }
  }, [user, error]);
  const { name, phone, address } = inputData;
  const handleOnChange = key => text => {
    setInputData({ ...inputData, [key]: text });
  };
  // =========

  const handleOnSubmit = () => {
    // Trim data to clear space
    const cleanData = trimData(inputData);

    // Update data input.
    // Don't send inputData to context beacause setInputData is async fuction
    setInputData(cleanData);

    // Dismiss keyboard
    // Keyboard.dismiss();

    // Cleare error on screen
    // clearError();

    // Set lottie loading
    setLoading();

    // Handle login
    createOrder({ name, phone, address, price, variants });
  };
  // ==========
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'space-around', padding: 15 }}>
        <View>
          <InputComponent
            label="Name"
            autoCorrect
            autoCapitalize="none"
            value={name}
            handleOnChange={handleOnChange('name')}
          />
          <InputComponent
            label="Phone number"
            autoCorrect
            autoCapitalize="none"
            value={phone}
            handleOnChange={handleOnChange('phone')}
          />
          <InputComponent
            label="Address"
            autoCorrect
            autoCapitalize="none"
            value={address}
            handleOnChange={handleOnChange('address')}
          />
        </View>
        <ButtonComponent
          activeOpacity={0.8}
          containerStyle={{ marginTop: 20 }}
          title="Confirm order"
          handleOnPress={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default GetInfoToOrderScreen;
