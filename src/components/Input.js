import React from 'react';
import { TextInput } from 'react-native';
const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
  />
);
export default Input;
