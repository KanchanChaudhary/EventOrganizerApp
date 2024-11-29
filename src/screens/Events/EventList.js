import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth

const EventList = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventQuery = query(
          collection(db, 'events'),
          where('createdBy', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(eventQuery);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleFavorite = async (eventId) => {
    const eventRef = doc(db, 'events', eventId);

    try {
      const eventDoc = await getDoc(eventRef);
      const eventData = eventDoc.data();
      const isFavorited = eventData.favorites?.includes(auth.currentUser.uid);

      if (isFavorited) {
        await updateDoc(eventRef, {
          favorites: arrayRemove(auth.currentUser.uid),
        });
        console.log('Event removed from favorites');
      } else {
        await updateDoc(eventRef, {
          favorites: arrayUnion(auth.currentUser.uid),
        });
        console.log('Event added to favorites');
      }
    } catch (error) {
      console.error('Error updating favorites:', error.message);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      // No need to navigate manually, as App.js will handle the navigation based on auth state
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderEvent = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Button title="View Details" onPress={() => handleEventPress(item)} />
      <Button
        title="Add to Favorites"
        onPress={() => handleFavorite(item.id)} // Call favorite function
      />
    </View>
  );

  return (
    <View>
      <Text>Event List</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />
      {/* Sign Out Button */}
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default EventList;
