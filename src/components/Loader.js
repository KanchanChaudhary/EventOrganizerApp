import React from 'react';
import { ActivityIndicator, View } from 'react-native';
const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="blue" />
  </View>
);
export default Loader;
