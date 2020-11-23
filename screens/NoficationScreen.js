import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sourceAnimation from '../assets/email.json';
import ButtonComponent from '../components/ButtonComponent';
import AnimationViewComponent from '../components/AnimationViewComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 80,
  },
});

const NoficationScreen = () => {
  return (
    <View style={styles.container}>
      <AnimationViewComponent
        animationStyle={{ width: 200, height: 200 }}
        autoPlay
        source={sourceAnimation}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Your password reset email has been sent
      </Text>
      <Text style={{ textAlign: 'center' }}>
        Please follow the instructions in the email to reset the password for
        your account
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <ButtonComponent
          activeOpacity={0.8}
          title="Login"
          handleOnPress={() => {}}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default NoficationScreen;
