import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,

} from 'react-native';
import { Button } from 'react-native-paper'

import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import LoadingComponent from '../components/LoadingComponent';
import trimData from '../utils/trimData';

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
    height: 200,
  },
  title: {
    textAlign: 'center',
    // opacity: 0.5  //độ mờ
  },
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

const LoginScreen = props => {
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
  });
  const { loading, error, signIn, clearError, setLoading, singInGG } = useContext(
    AuthContext
  );
  // const [textErr, setTextErr] = useState('')
  // const [errVisible, setErrVisible] = useState(false)

  const { username, password } = inputData;
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

    // Handle login
    signIn(cleanData);
  };
  // const loginGGSuccess = async (token) => {
  //   await AsyncStorage.setItem('token', token)

  // }
  // const onPressLoginGG = async () => {
  //   try {
  //     // callApi('get', 'auth/google', null)
  //     const API_URL = 'http://localhost:4000'
  //     const endpointGG = 'auth/google'
  //     // const token = await Linking.openURL(`${API_URL}/${endpointGG}`)

  //     const redirectUrl = await Linking.getInitialURL()

  //     WebBrowser.openAuthSessionAsync(`${API_URL}/${endpointGG}`, redirectUrl).then((res) => {
  //       const { url } = res
  //       const tokenRes = url && url.split('=')[1]
  //       if (tokenRes && tokenRes === 'false') {
  //         setErrVisible(true)
  //         setTextErr('Email not found. Please sign up!')
  //       }
  //       else {
  //         console.log(tokenRes)
  //         loginGGSuccess(tokenRes)
  //         props.navigation.navigate("Main")

  //       }
  //     })
  //     // const { url } = res
  //     // const tokenRes = url && url.split('=')[1]
  //     // // console.log(token)
  //     // if (tokenRes === 'false') {
  //     //     setErrVisible(true)
  //     //     setTextErr('Email not found. Please sign up!')
  //     // }
  //     // else {
  //     //     // handleLogin()
  //     //     // handleTokenUseReducer()
  //     //     console.log(token, tokenRes)
  //     //     // navigation.navigate('Account')
  //     //     // AsyncStorage.setItem('token', token).then(() => navigation.navigate('Account'))
  //     //     // console.log(await AsyncStorage.getItem('token'))
  //     //     // dispatch(userAction.login(token))
  //     // }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        // keyboardVerticalOffset={Platform.select({ ios: 80, android: 200 })}
        behavior="padding"
        style={styles.container}
      >
        {loading && <LoadingComponent />}
        <NavigationEvents onWillBlur={clearError} />

        <Image style={styles.logo} source={require('../assets/Logo.png')} />

        <InputComponent
          label="Username"
          autoCorrect
          autoCapitalize="none"
          value={username}
          handleOnChange={handleOnChange('username')}
        />
        <InputComponent
          label="Password"
          autoCorrect
          autoCapitalize="none"
          secureTextEntry // Password
          showIconPassword
          value={password}
          handleOnChange={handleOnChange('password')}
        />
        <View>
          <Text style={styles.error}>{error !== '' && error}</Text>
        </View>
        {/* <View>
          <HelperText type="error" visible={errVisible}>{textErr}</HelperText>
        </View> */}
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            activeOpacity={0.8}
            containerStyle={{ flex: 1, marginTop: 30 }}
            title="LOGIN"
            handleOnPress={handleOnSubmit}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            mode='contained'
            style={{ backgroundColor: '#1d1d1d', marginTop: 20, width: '100%', borderRadius: 25, paddingVertical: 5, elevation: 14, }}
            icon='google'
            onPress={() => singInGG()} >
            Login by Google
            </Button>
        </View>
        <View style={styles.linkContainer}>
          {/* <TouchableOpacity
            style={styles.link}
            onPress={() => {
              props.navigation.navigate('Forgot');
            }}
          >
            <Text>Forgot password?</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
          >
            <Text>Don't have an account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginScreen;
