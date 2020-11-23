import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import LoadingComponent from '../components/LoadingComponent';
import { Context as AuthContext } from '../context/AuthContext';
import trimData from '../utils/trimData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    textAlign: 'center',
    // opacity: 0.5  //độ mờ
  },

  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
  },
  link: {
    marginVertical: 15,
  },
});

const SignUpScreen = props => {
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { loading, error, signUp, clearError, setLoading } = useContext(
    AuthContext
  );
  const { username, email, password, passwordConfirm } = inputData;
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
    signUp(cleanData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={Platform.select({ ios: 40, android: 100 })}
        behavior="padding"
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <NavigationEvents onWillBlur={clearError} />
          {loading && <LoadingComponent />}
          <Image style={styles.logo} source={require('../assets/Logo.png')} />

          <InputComponent
            label="Username"
            autoCorrect
            value={username}
            handleOnChange={handleOnChange('username')}
          />
          <InputComponent
            label="Email"
            autoCorrect
            autoCapitalize="none"
            value={email}
            handleOnChange={handleOnChange('email')}
          />
          <InputComponent
            label="Password"
            autoCorrect
            autoCapitalize="none"
            secureTextEntry // Password
            value={password}
            handleOnChange={handleOnChange('password')}
          />
          <InputComponent
            label="Confirm Password"
            autoCorrect
            autoCapitalize="none"
            secureTextEntry // Password
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
              title="Sign up"
              handleOnPress={handleOnSubmit}
            />
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                props.navigation.goBack(null);
                return true;
                props.navigation.navigate('Login');
              }}
            >
              <Text>Have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
