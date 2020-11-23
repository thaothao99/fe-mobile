import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import trimData from '../utils/trimData';
import LoadingComponent from '../components/LoadingComponent';

const item = {
  pic: 'https://cdn.stocksnap.io/img-thumbs/960w/X7BBEK50WK.jpg',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
  },
});

const PasswordScreen = () => {
  const [inputData, setInputData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const { loading, error, updatePassword, clearError, setLoading } = useContext(
    AuthContext
  );
  const { passwordCurrent, password, passwordConfirm } = inputData;
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
    updatePassword(cleanData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 220 })}
        behavior="padding"
        style={styles.container}
      >
        {loading && <LoadingComponent />}
        <Image
          style={styles.logo}
          source={{
            uri: item.pic,
          }}
        />

        <InputComponent
          label="Password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry // Password
          value={passwordCurrent}
          handleOnChange={handleOnChange('passwordCurrent')}
        />
        <InputComponent
          label="New password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry // Password
          // showIconPassword
          value={password}
          handleOnChange={handleOnChange('password')}
        />
        <InputComponent
          label="Confirm new password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry // Password
          // showIconPassword
          password={passwordConfirm}
          handleOnChange={handleOnChange('passwordConfirm')}
        />
        <View>
          <Text style={styles.error}>{error !== '' && error}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{ flex: 1, marginTop: 30 }}
            title="Change password"
            handleOnPress={handleOnSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PasswordScreen;
