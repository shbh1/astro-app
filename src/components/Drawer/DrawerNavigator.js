import {View, Text} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Astrologers from '../../screens/Astrologers';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={Astrologers} component={Astrologers} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
