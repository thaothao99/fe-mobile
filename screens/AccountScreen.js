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
} from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import LoadingComponent from '../components/LoadingComponent';
import trimData from '../utils/trimData';

const styles = StyleSheet.create({
  avatarContainer: {
    // justifyContent: "center",
    alignItems: 'center',
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  ButtonContainer: {
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  error: {
    color: '#e74c3c',
  },
});

const AccountScreen = props => {
  const [inputData, setInputData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const {
    user,
    error,
    loading,
    updateMe,
    getMe,
    clearError,
    setLoading,
  } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setLoading();
      getMe();
      setInputData({ ...inputData, user });
    } else {
      const { name = '', phone = '', address = '' } = user;
      setInputData({ ...inputData, name, phone, address });
    }
  }, [user]);

  const { name, phone, address } = inputData;

  const handleOnChange = key => text => {
    setInputData({ ...inputData, [key]: text });
  };
  const handleOnSubmit = () => {
    // Trim data to clear space

    const cleanData = trimData(inputData);

    // Update data input.
    // Don't send inputData to context beacause setInputData is async fuction
    setInputData(cleanData);

    // Dismiss keyboard
    Keyboard.dismiss();

    // Cleare error on screen
    clearError();

    // Set lottie loading
    setLoading();

    // Handle login
    updateMe(cleanData);
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 80 })}
        behavior="padding"
        style={styles.container}
      >
        {loading && <LoadingComponent />}

        <TouchableOpacity
          style={styles.avatarContainer}
          // onPress={{ ChangeAvatar }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://cdn.stocksnap.io/img-thumbs/960w/X7BBEK50WK.jpg',
            }}
          />
        </TouchableOpacity>

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
        <View>
          <Text style={styles.error}>{error !== '' && error}</Text>
        </View>

        <View style={styles.ButtonContainer}>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{ marginTop: 20, flex: 1 }}
            title="Save"
            handleOnPress={handleOnSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AccountScreen;
