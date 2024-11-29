// src/screens/Events/CreateEvent.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const CreateEvent = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleCreateEvent = async () => {
    if (eventName && eventDescription) {
      try {
        const newEvent = {
          name: eventName,
          description: eventDescription,
          createdBy: auth.currentUser.uid,
        };
        await addDoc(collection(db, 'events'), newEvent);
        Alert.alert('Event Created!', 'Your event has been created successfully.');
        navigation.navigate('EventList'); // Navigate back to event list after creation
      } catch (error) {
        console.error('Error creating event:', error.message);
      }
    } else {
      Alert.alert('Error', 'Please provide event name and description.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

export default CreateEvent;
