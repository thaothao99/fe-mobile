import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    // alignItems: "center",
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textStyle: {
    color: '#2f3542',
  },
  ButtonRight: {
    flexDirection: 'row-reverse',
    flex: 1,
    // textAlign: "right",
    marginRight: 20,
    alignSelf: 'center',
  },
});

const ListButtonComponent = ({
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  iconName,
  ...props
}) => {
  return (
    <TouchableOpacity
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onPress={handleOnPress || 0.9}
      style={{ ...styles.buttonContainer, ...containerStyle }}
    >
      <View style={{ ...buttonStyle, flexDirection: 'row' }}>
        <View style={{ padding: 3, width: 30, alignItems: 'center' }}>
          <Ionicons name={iconName} size={17} color="#3d3d3d" />
        </View>

        <View>
          <Text style={{ ...styles.textStyle }}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListButtonComponent.propTypes = {
  containerStyle: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
  handleOnPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  iconName: PropTypes.any,
};

ListButtonComponent.defaultProps = {
  containerStyle: {},
  buttonStyle: {},
  textStyle: {},
  handleOnPress: () => {},
  iconName: '',
};

export default ListButtonComponent;
