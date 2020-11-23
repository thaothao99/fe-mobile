import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { Context as AuthContext } from '../context/AuthContext';
import trimData from '../utils/trimData';
import LoadingComponent from '../components/LoadingComponent';

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
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 15,
    padding: 15,
    // opacity: 0.5  //độ mờ
  },
  formContainer: {},
  linkContainer: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    paddingTop: 15,
  },
  error: {
    color: '#e74c3c',
  },
});

const ResetPasswordScreen = props => {
  const { error, loading, clearError, resetPassword, setLoading } = useContext(
    AuthContext
  );
  const [token, setToken] = useState('');
  const [inputData, setInputData] = useState({
    password: '',
    passwordConfirm: '',
  });
  console.log(token);

  useEffect(() => {
    setToken(props.navigation.getParam('token'));
  }, []);
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
    Keyboard.dismiss();

    // Cleare error on screen
    clearError();

    // Set lottie loading
    setLoading();

    // Handle reset password
    resetPassword({ ...cleanData, token });
  };

  const { password, passwordConfirm } = inputData;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 200 })}
        behavior="padding"
        style={styles.container}
      >
        {loading && <LoadingComponent />}
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
        <View style={styles.title}>
          <Text style={styles.title}>{``}</Text>
        </View>

        <InputComponent
          label="New password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry
          value={password}
          handleOnChange={handleOnChange('password')}
        />
        <InputComponent
          label="Confirm password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry
          value={passwordConfirm}
          handleOnChange={handleOnChange('passwordConfirm')}
        />
        <View>
          <Text style={styles.error}>{error !== '' && error}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{ flex: 1, marginTop: 30 }}
            title="Reset"
            handleOnPress={handleOnSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPasswordScreen;
