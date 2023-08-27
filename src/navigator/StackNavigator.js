import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import Astrologers from '../screens/Astrologers';
import Client from '../screens/Client';
import CallingScreen from '../components/Callingscreen/CallingScreen';
import IncomingCallScreen from '../components/Callingscreen/IncomingCallScreen';
import CallScreen from '../components/CallScreen/CallScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Astrologers"
          component={Astrologers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Client"
          component={Client}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallingScreen"
          component={CallingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IncomingScreen"
          component={IncomingCallScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
