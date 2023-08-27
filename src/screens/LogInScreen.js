import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {VoxImaplant} from 'react-native-voximplant';

// Login Screen
const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // useEffect(() => {
  //   const checkLogInStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       if (token) {
  //         navigation.navigate('Astrologers');
  //       } else {
  //         // token not found, show the login screen
  //       }
  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   checkLogInStatus();
  // });

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    axios
      .post('http://10.0.2.2:2020/login', user)
      .then(res => {
        const token = res.data.token;
        const role = res.data.role; // Access the role directly from the response
        console.log(role);
        AsyncStorage.setItem('authToken', token);
        if (role === 'client') {
          navigation.navigate('Astrologers');
        } else if (role === 'astrologer') {
          navigation.navigate('Client');
        } else {
          // Handle other roles if needed
        }
      })
      .catch(error => {
        Alert.alert('Login error', 'Invalid email or password');
        console.log('Login error', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{marginTop: 15, color: '#000'}}>
        <Text>Don't have account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
