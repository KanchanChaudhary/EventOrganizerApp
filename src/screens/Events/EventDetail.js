// src/screens/Events/EventDetail.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const EventDetail = ({ route, navigation }) => {
  const { event } = route.params; // Assuming event details are passed as a route param

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{event.name}</Text>
      <Text>{event.description}</Text>
      <Button title="Back to Events" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default EventDetail;
