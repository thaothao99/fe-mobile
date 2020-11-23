import React, { useState } from "react";
import { Input } from "react-native-elements";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const InputComponent = ({
  handleOnChange,
  secureTextEntry,
  showIconPassword,
  rightIcon,
  labelStyle,
  containerStyle,
  refInput,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const renderRightIcon = showPassword => {
    if (secureTextEntry && showIconPassword) {
      return renderPasswordIcon(showPassword);
    }
    if (!rightIcon) return null;
    return rightIcon;
  };

  const renderPasswordIcon = showPassword => {
    if (showPassword) {
      return (
        <AntDesign
          name="eye"
          size={25}
          color="#32312f"
          onPress={() => setShowPassword(!showPassword)}
        />
      );
    }
    return (
      <AntDesign
        name="eyeo"
        size={20}
        color="#32312f"
        onPress={() => setShowPassword(!showPassword)}
      />
    );
  };

  return (
    <Input
      {...props}
      containerStyle={{ ...styles.inputContainer, ...containerStyle }}
      labelStyle={{ ...styles.label, ...labelStyle }}
      secureTextEntry={secureTextEntry ? !showPassword : false}
      onChangeText={handleOnChange}
      rightIcon={renderRightIcon(showPassword)}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  inputContainer: {
    marginVertical: 10,
  },
});

export default InputComponent;
