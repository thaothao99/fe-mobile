import React from 'react';
import { StyleSheet } from 'react-native';
import animation from '../assets/loading02.json';
import AnimationViewComponent from './AnimationViewComponent';

const styles = StyleSheet.create({
  containerStyle: {
    // backgroundColor: '#1d1d1d', // rgba(30, 30, 30, 0.05)
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },
  animationStyle: {
    backgroundColor: 'transparent',
    height: 80,
    width: 80,
  },
});

const LoadingComponent = () => {
  return (
    <AnimationViewComponent
      containerStyle={styles.containerStyle}
      animationStyle={styles.animationStyle}
      autoPlay
      loop
      source={animation}
    />
  );
};

export default LoadingComponent;
