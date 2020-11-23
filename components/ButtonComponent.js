import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    backgroundColor: '#1d1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,
    // elevation: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  textStyle: {
    color: '#fff',
  },
});

const ButtonComponent = ({
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  ...props
}) => {
  return (
    <TouchableOpacity
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onPress={handleOnPress}
      style={{ ...styles.buttonContainer, ...containerStyle }}
    >
      <Text style={{ ...styles.textStyle, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
