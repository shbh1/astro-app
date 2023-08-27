/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigator from './src/navigator/StackNavigator';
import {UserContext} from './src/UserContext';

function App() {
  return (
    <UserContext>
      <StackNavigator />
    </UserContext>
  );
}

export default App;
