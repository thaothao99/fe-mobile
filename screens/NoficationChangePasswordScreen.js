import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sourceAnimation from '../assets/checked-done.json';
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

const NoficationScreen = props => {
  return (
    <View style={styles.container}>
      <AnimationViewComponent
        animationStyle={{ width: 200, height: 200 }}
        autoPlay
        source={sourceAnimation}
      />
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
        Your password has been reset successfully{' '}
      </Text>
      <Text style={{ textAlign: 'center' }}>Please login again</Text>
      <View style={{ flexDirection: 'row' }}>
        <ButtonComponent
          activeOpacity={0.8}
          title="Login"
          handleOnPress={() => {
            props.navigation.replace('Login');
          }}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default NoficationScreen;
