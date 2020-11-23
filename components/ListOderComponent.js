import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    margin: 5,
    paddingBottom: 10,
  },
  touchContainer: {
    flex: 1,
    // height: 110,
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    padding: 5,
  },
});

const ListOrderComponent = ({
  item,
  containerStyle,
  buttonStyle,
  textStyle,
  handleOnPress,
  title,
  index,

  ...props
}) => {
  const date = new Date(item.createdAt).toUTCString();
  const isPaid = item.paid ? 'Purchased' : 'Not purchased';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onPress={handleOnPress}
        style={{
          ...styles.touchContainer,
          ...containerStyle,
          ...buttonStyle,
        }}
      >
        <View style={styles.info}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            {'Order: ' + `#${index + 1}`}
          </Text>
          <Text style={{}}>{`Date: ${date}`}</Text>
          <Text style={{ fontWeight: 'bold' }}>{`Status: ${isPaid}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListOrderComponent;
