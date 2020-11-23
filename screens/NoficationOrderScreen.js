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

const NoficationOrderScreen = props => {
  return (
    <View style={styles.container}>
      <AnimationViewComponent
        animationStyle={{ width: 200, height: 200 }}
        autoPlay
        source={sourceAnimation}
      />
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
        Confirm your order{' '}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <ButtonComponent
          activeOpacity={0.8}
          title="View your orders"
          handleOnPress={() => {
            props.navigation.replace('Order');
          }}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default NoficationOrderScreen;
