// src/screens/Auth/SignIn.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

const SignIn = ({ navigation }) => {  // Added navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No need to navigate manually; App.js handles navigation based on auth state
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign In" onPress={handleSignIn} />

      {/* Add a button to navigate to Sign Up screen */}
      <Button 
        title="Don't have an account? Sign Up" 
        onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
      />
    </View>
  );
};

export default SignIn;
