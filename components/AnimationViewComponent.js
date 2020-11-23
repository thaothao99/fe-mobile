import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

const AnimationViewComponent = ({ containerStyle, animationStyle, source, loop, autoPlay }) => {
  return (
    <View style={containerStyle}>
      <LottieView style={animationStyle} source={source} loop={loop} autoPlay={autoPlay} />
    </View>
  );
};

AnimationViewComponent.propTypes = {
  containerStyle: PropTypes.shape({}),
  animationStyle: PropTypes.shape({}),
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  source: PropTypes.any.isRequired,
};

AnimationViewComponent.defaultProps = {
  containerStyle: {},
  animationStyle: {},
  autoPlay: false,
  loop: false,
};

export default AnimationViewComponent;
