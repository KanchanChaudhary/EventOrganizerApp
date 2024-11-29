// src/navigation/MainStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import EventList from '../screens/Events/EventList';
import EventDetail from '../screens/Events/EventDetail';
import CreateEvent from '../screens/Events/CreateEvent';
import FavoriteEvents from '../screens/Events/FavoriteEvents';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="EventList">
    {/* Event List Screen */}
    <Stack.Screen
      name="EventList"
      component={EventList}
      options={({ navigation }) => ({
        title: 'Events',
        headerShown: true,
        headerRight: () => (
          <>
            <Button 
              title="Favorites" 
              onPress={() => navigation.navigate('FavoriteEvents')} // Navigate to FavoriteEvents screen
            />
            <Button 
              title="Create Event" 
              onPress={() => navigation.navigate('CreateEvent')} // Navigate to CreateEvent screen
            />
          </>
        ),
      })}
    />
    
    {/* Event Detail Screen */}
    <Stack.Screen
      name="EventDetail"
      component={EventDetail}
      options={{ title: 'Event Details' }}
    />

    {/* Create Event Screen */}
    <Stack.Screen
      name="CreateEvent"
      component={CreateEvent}
      options={{
        title: 'Create Event', 
        headerShown: true,
      }}
    />

    {/* Favorite Events Screen */}
    <Stack.Screen
      name="FavoriteEvents"
      component={FavoriteEvents}
      options={{
        title: 'Favorites', 
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default MainStack;
