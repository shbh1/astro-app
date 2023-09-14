import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../ChatScreens/ChatList';
import LiveStream from '../LiveStream/LiveStream';
import Astrologers from '../../screens/Astrologers';

const BottomNavigator = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="ChatList" component={ChatList} />
      <Bottom.Screen name="LiveStream" component={LiveStream} />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
