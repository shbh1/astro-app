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
import ChatList from '../components/ChatScreens/ChatList';
import ChatScreen from '../components/ChatScreens/ChatScreen';
import AstroHome from '../components/HomeScreen/AstroHome';
import ChatMessages from '../components/ChatScreens/ChatMessages';
import Entypo from 'react-native-vector-icons/Entypo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Parent from '../components/Drawer/Parent';
import LiveStream from '../components/LiveStream/LiveStream';
import Splash from '../screens/Splash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallList from '../components/CallScreen/CallList';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();
  const BottomNavigator = () => {
    return (
      <Tab.Navigator initialRouteName="Astrologers">
        <Tab.Screen
          name="Astrologers"
          component={Astrologers}
          options={{
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
            title: () => <Text style={{color: '#000000'}}>Home</Text>,
            tabBarIcon: () => (
              <Ionicons name="home-outline" size={24} color={'#000000'} />
            ),
          }}
        />
        <Tab.Screen
          name="LiveStream"
          component={LiveStream}
          options={{
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
            headerTitle: () => (
              <Text style={{color: '#000000', fontSize: 24, fontWeight: '500'}}>
                Live
              </Text>
            ),
            tabBarIcon: () => (
              <MaterialIcons
                name="play-box-outline"
                size={24}
                color={'#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
            title: () => <Text style={{color: '#000000'}}>Chat</Text>,
            tabBarIcon: () => (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={'#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CallList"
          component={CallList}
          options={{
            headerTitle: 'Call',
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
            title: () => <Text style={{color: '#000000'}}>Call</Text>,
            tabBarIcon: () => (
              <Ionicons name="call-outline" size={24} color={'#000000'} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
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
          name="Main"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            //headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
          }}
        />
        <Stack.Screen
          name="ChatMessages"
          component={ChatMessages}
          options={{
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
          }}
        />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen
          name="AstroHome"
          component={AstroHome}
          options={{
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#FBE300',
            },
          }}
        />
        {/* <Stack.Screen
          name="Astrologers"
          component={Astrologers}
          options={{
            headerBackVisible: false, // Set headerLeft to null to hide the back button
            headerStyle: {
              backgroundColor: '#FBE300',
            },
          }}
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
    */}
        <Stack.Screen
          name="Client"
          component={Client}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
