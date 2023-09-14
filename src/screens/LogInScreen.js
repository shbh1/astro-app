import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {UserType} from '../UserContext';

const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);

  console.log('1.', userId);

  // useEffect(() => {
  //   const checkLogInStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       if (token) {
  //         const storedUserId = await AsyncStorage.getItem('userId');
  //         console.log(userId);
  //         if (storedUserId) {
  //           // Set the userId from AsyncStorage
  //           setUserId(storedUserId);

  //           navigation.navigate('Astrologers');
  //         }
  //       } else {
  //         // Token not found, show the login screen
  //       }
  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   checkLogInStatus();
  // }, []); // Pass an empty dependency array to run this effect only once

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
        const role = res.data.role;
        const userId = res.data.userId;

        AsyncStorage.setItem('authToken', token);
        AsyncStorage.setItem('userId', userId);
        setUserId(userId); // Set the userId in your context

        if (role === 'client') {
          navigation.navigate('Main');
        } else if (role === 'astrologer') {
          navigation.navigate('AstroHome');
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
