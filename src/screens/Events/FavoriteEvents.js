// src/screens/Events/FavoriteEvents.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const FavoriteEvents = () => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const q = query(
          collection(db, 'events'),
          where('favorites', 'array-contains', auth.currentUser.uid) // Filter events by user favorites
        );
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavoriteEvents(events);
      } catch (error) {
        console.error('Error fetching favorite events:', error.message);
      }
    };

    fetchFavoriteEvents();
  }, []);

  return (
    <View>
      <Text>Favorite Events</Text>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteEvents;
