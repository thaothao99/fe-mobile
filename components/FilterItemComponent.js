import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
// chose Size here
const FilterItemComponent = ({ textStyle, handleOnPress, title, ...props }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onPress={handleOnPress}
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, paddingTop: 10 }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterItemComponent;
